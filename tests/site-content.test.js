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

test('all public subpages offer persistent EN/PL controls with complete Polish content coverage',()=>{
 const files=fs.readdirSync(root).filter(f=>f.endsWith('.html')&&!['index.html','admin.html'].includes(f));
 for(const file of files){
  const $=cheerio.load(read(file));
  assert.equal($('[data-language=en]').length,1,file);assert.equal($('[data-language=pl]').length,1,file);
  assert.equal($('script[src^="site-language.js"]').length,1,file);assert.equal($('script[src^="site-language-data.js"]').length,1,file);
  $('option').each((_,n)=>assert.ok($(n).attr('value')!==undefined,`${file}: stable booking option values`));
 }
 const stay=cheerio.load(read('lalas-complex-brufut.html'));
 assert.equal(stay('select[name=apartment] option').first().attr('value'),'','Apartment prompt must not count as a selected room');
 const audit=JSON.parse(require('node:child_process').execFileSync(process.execPath,['scripts/audit-language.js'],{cwd:root,encoding:'utf8'}));
 assert.equal(audit.pages,37);assert.deepEqual(audit.missing,[]);
});

test('public branding uses GambianTour and only the Polish invitation links to the Polish website',()=>{
 for(const file of fs.readdirSync(root).filter(f=>f.endsWith('.html')&&f!=='admin.html')){
  const $=cheerio.load(read(file));const invitation=$('.polish-site-invite');
  assert.equal(invitation.length,1,file);assert.equal(invitation.attr('lang'),'pl');
  assert.equal($('a[href*="mojaafryka"]').length,1,file);
  invitation.remove();$('script,style,svg').remove();
  assert.doesNotMatch($('body').text(),/Moja Afryka|mojaafryka/i,file);
 }
});
