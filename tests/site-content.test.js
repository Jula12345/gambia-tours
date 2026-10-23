const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const cheerio=require('cheerio');
const tours=require('../tours');
const source=require('../content/source-tours.json');
const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');

test('each curated source route is bookable, uses EUR correctly, and has matching structured data',()=>{
 for(const item of source){
  const tour=tours.find(t=>t.id===item.id);
  assert.ok(tour,item.id);assert.equal(tour.currency,'EUR');assert.equal(tour.price,item.price);
  const $=cheerio.load(read(tour.detailsUrl));
  assert.equal($('.trip-form [name=tour]').val(),item.title);
  assert.equal(Number($('[data-trip-start-date]').attr('data-range-days')),item.days);
  const data=JSON.parse($('script[type="application/ld+json"]').first().text());
  const trip=data['@graph'].find(x=>x['@type']==='TouristTrip');
  if(item.price===null)assert.equal(trip.offers,undefined);else {assert.equal(trip.offers.priceCurrency,'EUR');assert.equal(trip.offers.price,item.price);}
 }
});

test('public pages have consistent canonical URLs, one H1, valid metadata and sitemap coverage',()=>{
 const files=fs.readdirSync(root).filter(f=>f.endsWith('.html')&&f!=='admin.html');
 const sitemap=read('sitemap.xml');const titles=new Set();
 for(const file of files){
  const $=cheerio.load(read(file));const url='https://www.gambiantour.com'+(file==='index.html'?'/':'/'+file);
  assert.equal($('h1').length,1,file);assert.equal($('link[rel=canonical]').length,1,file);
  assert.equal($('link[rel=canonical]').attr('href'),url,file);assert.ok(sitemap.includes(`<loc>${url}</loc>`),file);
  const title=$('title').text();assert.ok(!titles.has(title),`Duplicate title: ${file}`);titles.add(title);
  assert.ok($('meta[name=description]').attr('content'),file);assert.ok($('meta[property="og:image"]').attr('content'),file);
  assert.equal($('[data-whatsapp-contact]').length,1,file);assert.ok($('[data-whatsapp-contact]').attr('href').startsWith('https://wa.me/48504224794?'));
  $('script[type="application/ld+json"]').each((_,s)=>JSON.parse($(s).text()));
 }
 assert.match(read('admin.html'),/noindex/);
});

test('catalogue links are present without JavaScript and real reviews replace all sample text',()=>{
 const $=cheerio.load(read('index.html'));const list=cheerio.load(read('tours.html'));
 assert.equal($('[data-tour-grid] .tour-card').length,tours.length);
 assert.equal(list('.tour-card').length,tours.length);
 for(const r of require('../content/customer-reviews.json'))assert.ok($('#testimonials').text().includes(r.name));
 assert.doesNotMatch($('#testimonials').text(),/sample|illustrative/i);
 assert.equal($('#testimonials a[href="https://mojaafryka.pl/"]').length,0);
 assert.doesNotMatch($('#testimonials').text(),/Moja Afryka|mojaafryka/i);
 assert.equal($('#testimonials .review-guest').length,3);
});

test('the booking selector preserves EUR and USD instead of relabeling every price as dollars',()=>{
 const code=read('app.js').match(/function money\(value, currency = "USD"\) \{[\s\S]*?\n\}/)[0];
 const context={currentLang:'en',Intl};vm.createContext(context);vm.runInContext(code,context);
 assert.match(context.money(60,'EUR'),/€/);assert.match(context.money(85),/\$/);
 assert.ok(read('app.js').includes('money(tour.price, tour.currency || "USD")'));
});

test('all language versions have crawlable links, complete translations and stable booking values',()=>{
 const l=require('../lib/site-localization');
 for(const file of l.files())for(const lang of Object.keys(l.languages)){
  const $=cheerio.load(read((lang==='en'?'':lang+'/')+file));
  assert.equal($('[data-language-link]').length,4,file+' '+lang);
  assert.equal($('[data-language-link][aria-current=page]').attr('hreflang'),lang);
  assert.equal($('script[src^="/site-language.js"]').length,1);
  assert.equal($('body script[src^="/site-language.js"]').length,1,file+': DOM must exist before menu handlers bind');
  assert.equal($('script[src^="/assets/locales/'+lang+'.js"]').length,1);
  $('option').each((_,n)=>assert.ok(n.attribs.value!==undefined,file+': stable option value'));
  const assets=$('script[src],link[rel=stylesheet]').toArray().map(n=>($(n).attr('src')||$(n).attr('href')).split('?')[0]);
  assert.equal(new Set(assets).size,assets.length,file+': duplicate script or stylesheet');
 }
 const audit=require('../scripts/audit-language')();assert.equal(audit.pages,152);assert.deepEqual(audit.missing,[]);
 const stay=cheerio.load(read('de/lalas-complex-brufut.html'));assert.equal(stay('select[name=apartment] option').first().attr('value'),'');
});

test('only Polish pages invite visitors to the Polish website, and public branding remains GambianTour',()=>{
 const l=require('../lib/site-localization');
 for(const file of l.files())for(const lang of Object.keys(l.languages)){
  const $=cheerio.load(read((lang==='en'?'':lang+'/')+file));const invitation=$('.polish-site-invite');
  assert.equal(invitation.length,lang==='pl'?1:0,file+' '+lang);
  assert.equal($('a[href*="mojaafryka"]').length,lang==='pl'?1:0);
  invitation.remove();$('script,style,svg').remove();assert.doesNotMatch($('body').text(),/Moja Afryka|mojaafryka/i,file);
 }
});

test('localized pages have self-canonicals, reciprocal hreflang links, translated metadata and sitemap coverage',()=>{
 const result=require('../scripts/check-site')();assert.equal(result.pages,152);assert.deepEqual(result.errors,[]);
 const l=require('../lib/site-localization');
 for(const lang of ['pl','nl','de']){
  const $=cheerio.load(read(lang+'/index.html'));
  assert.notEqual($('h1').text(),cheerio.load(read('index.html'))('h1').text());
  assert.notEqual($('meta[name=description]').attr('content'),cheerio.load(read('index.html'))('meta[name=description]').attr('content'));
  for(const item of source){
   const page=cheerio.load(read(lang+'/'+item.detailsUrl));assert.equal(page('[name=tour]').val(),item.title);
   const graph=JSON.parse(page('script[type="application/ld+json"]').first().text())['@graph'];const trip=graph.find(x=>x['@type']==='TouristTrip');
   if(item.price!==null){assert.equal(trip.offers.price,item.price);assert.equal(trip.offers.priceCurrency,item.currency);}
  }
 }
});

test('language routing respects explicit URLs and does not claim German or Dutch guiding',()=>{
 assert.doesNotMatch(read('site-language.js'),/localStorage\.getItem/);
 assert.match(read('app.js'),/currentLang = document.documentElement.lang/);
 for(const lang of ['en','pl','nl','de']){
  const $=cheerio.load(read((lang==='en'?'':lang+'/')+'kunta-kinteh-island-tour.html'));
  assert.deepEqual($('[name=guideLanguage] option').toArray().map(n=>$(n).attr('value')),['English','Polish']);
 }
});

test('German and Dutch booking vocabulary describes travel enquiries rather than quotations or books',()=>{
 const de=require('../content/locale-de.json'),nl=require('../content/locale-nl.json');
 assert.equal(de.Book,'Buchen');assert.equal(nl.Book,'Boeken');
 for(const key of ['custom quote','private quote','Individually quoted']){
  assert.doesNotMatch(de[key],/Zitat|zitiert/);assert.doesNotMatch(nl[key],/citaat|geciteerd/);
 }
 for(const tour of tours){assert.ok(de[tour.en.title]);assert.ok(nl[tour.en.title]);}
});


test('the sitemap contains exactly one canonical address for every language page',()=>{
 const {auditSitemap}=require('../scripts/check-site'),l=require('../lib/site-localization');
 const expected=l.files().flatMap(file=>Object.keys(l.languages).map(lang=>l.origin+l.route(file,lang)));
 const xml=read('sitemap.xml');assert.deepEqual(auditSitemap(xml,expected).errors,[]);
 const duplicate=xml.replace('</urlset>','<url><loc>'+expected[0]+'</loc></url></urlset>');
 assert.ok(auditSitemap(duplicate,expected).errors.includes('sitemap: duplicate URLs'));
 const oldURL=xml.replace(expected[0],l.origin+'/nl/index.html');
 assert.ok(auditSitemap(oldURL,expected).errors.some(e=>e.includes('unexpected URL')));
 assert.ok(auditSitemap(oldURL,expected).errors.some(e=>e.includes('missing URL')));
});


test('legacy editorial and ten-day pages use shared translated navigation and dates',()=>{
 for(const lang of ['en','pl','nl','de'])for(const file of ['stories.html','polish-speaking-guide.html','senegal-gambia-10-day-tour.html']){
  const $=cheerio.load(read((lang==='en'?'':lang+'/')+file));
  assert.equal($('script[src^="/tour-page.js"]').length,1);
  assert.doesNotMatch($('script:not([src]):not([type])').text(),/const menuToggle/);
  if(file==='senegal-gambia-10-day-tour.html'){
   assert.equal($('[data-trip-start-date]').attr('data-range-days'),'10');
   assert.equal($('[data-trip-start-date]').attr('data-range-nights'),'9');
  }
 }
});
