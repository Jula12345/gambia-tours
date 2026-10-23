/* Shared public branding and bilingual subpage controls. Called after content builds. */
const fs = require('node:fs');
const path = require('node:path');
const cheerio = require('cheerio');
module.exports = function refresh() {
 const root=path.resolve(__dirname,'..');
 const version='20261023-i18n-v4';
 for(const file of fs.readdirSync(root).filter(f=>f.endsWith('.html')&&f!=='admin.html')){
  const $=cheerio.load(fs.readFileSync(path.join(root,file),'utf8'));
  const home=file==='index.html';
  if(file==='polish-speaking-guide.html'){
   const reverse=Object.fromEntries(Object.entries(JSON.parse(fs.readFileSync(path.join(root,'content/subpage-pl.json')))).map(([en,pl])=>[pl,en]));
   const english={...reverse,...require('../content/polish-guide-en.json')};
   $('body *').contents().each((_,n)=>{if(n.type==='text'&&!$(n).parents('script,style,svg,.polish-site-invite').length){const key=n.data.trim().replace(/\s+/g,' ');if(english[key])n.data=n.data.match(/^\s*/)[0]+english[key]+n.data.match(/\s*$/)[0];}});
   $('html').attr('lang','en');
   $('title').text('Polish-speaking Gambia Guide & Private Tours | GambianTour.com');
   $('meta[property="og:locale"]').attr('content','en_GB');
   $('meta[name="description"],meta[property="og:description"],meta[name="twitter:description"]').attr('content','Explore The Gambia with a Polish-speaking local guide. Private routes from Kololi, Kotu, Senegambia and Banjul, with river trips, markets, beaches and local culture.');
   $('meta[property="og:title"],meta[name="twitter:title"]').attr('content','Polish-speaking Gambia Guide & Private Tours | GambianTour.com');
   $('[data-menu-toggle]').attr('aria-label','Open navigation');
  }
  $('body').toggleClass('subpage',!home).attr('data-page-language',home?'home':'subpage');
  $('body *').contents().each((_,n)=>{if(n.type==='text'&&!$(n).parents('script,style,svg').length)n.data=n.data.replace(/Moja Afryka/gi,'GambianTour');});
  $('meta[content]').each((_,n)=>$(n).attr('content',$(n).attr('content').replace(/Moja Afryka/gi,'GambianTour')));
  $('.footer-brand > span').text('Gambia & Senegal tours with local guides. Personal journeys, lasting memories.');
  $('.source-tour-intro p').filter((_,n)=>$(n).text().includes('The route is also part')).text('Plan this journey with Lamin and the GambianTour team. Choose English or Polish guiding by arrangement and a route that fits your holiday.');
  $('.source-tour-intro figcaption').text('A moment from our GambianTour journeys.');
  if(file==='about-lamin-conteh.html'){
   $('.about-lamin h2').text('Local knowledge. A personal welcome.');
   $('.about-lamin p').filter((_,n)=>$(n).text().includes('sister website')).text('GambianTour.com welcomes travelers from around the world with a personal approach, English-speaking guides and Polish guiding available by arrangement.');
   $('meta[name="description"]').attr('content','Meet Lamin Conteh, a Gambian guide with over 16 years of tour experience. Explore The Gambia and Senegal in English or Polish with GambianTour.');
   $('meta[property="og:description"],meta[name="twitter:description"]').attr('content',$('meta[name=description]').attr('content'));
  }
  $('#testimonials [data-i18n=reviewCopy]').text('Stories from our GambianTour guests, translated from Polish.');
  $('#testimonials figcaption a').each((_,n)=>$(n).replaceWith('<span class="review-guest" data-i18n="reviewSource">GambianTour guest</span>'));
  $('#testimonials > a').remove();
  $('.site-footer a[href*="mojaafryka.pl"]').remove();
  $('.footer-links a').filter((_,n)=>/^(Moja Afryka|GambianTour) · Polski$/.test($(n).text().trim())).remove();
  $('a[href*="mojaafryka.pl"]').attr('href','tours.html');
  $('.footer-links').append('<a class="polish-site-invite" href="https://mojaafryka.pl/" lang="pl" target="_blank" rel="noopener">Podróżujesz z Polski? Odwiedź mojaafryka.pl — naszą stronę dla polskich turystów.</a>');
  const footerSeen=new Set();$('.footer-links a').each((_,n)=>{const u=new URL($(n).attr('href'),'https://www.gambiantour.com/');const key=u.href;if(footerSeen.has(key))$(n).remove();else footerSeen.add(key);});
  $('script[type="application/ld+json"]').each((_,n)=>{
   let data=JSON.parse($(n).text());
   function clean(x){if(!x||typeof x!=='object')return;if(file==='polish-speaking-guide.html'&&x['@type']==='Service')x.name='Polish-speaking Gambia guide';for(const key of Object.keys(x)){
    if(['sameAs','subjectOf'].includes(key)&&JSON.stringify(x[key]).includes('mojaafryka')){delete x[key];continue;}
    if(typeof x[key]==='string'&&!/^(https?:|assets\/)/.test(x[key]))x[key]=x[key].replace(/Moja Afryka/gi,'GambianTour');else clean(x[key]);
   }}clean(data);$(n).text(JSON.stringify(data).replace(/</g,'\\u003c'));
  });
  if(!home&&!$('.language-toggle').length)$('.header-actions').prepend('<div class="language-toggle" role="group" aria-label="Language selector"><button type="button" class="active" data-language="en" aria-pressed="true" aria-label="English">EN</button><button type="button" data-language="pl" aria-pressed="false" aria-label="Polski">PL</button></div>');
  if(home)$('[data-language]').each((_,n)=>$(n).attr('aria-label',$(n).attr('data-language')==='pl'?'Polski':'English'));
  $('.story-card > img').wrap('<div class="story-card-media"></div>');
  $('option').each((_,n)=>{if(n.attribs.value===undefined)$(n).attr('value',$(n).text());});
  $('link[href^="season.css"]').attr('href','season.css?v='+version);
  $('script[src^="site-language"]').remove();
  $('body').append('<script src="site-language.js?v='+version+'"></script>');
  for(const name of ['app.js','tour-page.js','hotel-page.js','gallery.js','form-client.js'])$(`script[src^="${name}"]`).attr('src',name+'?v='+version);
  fs.writeFileSync(path.join(root,file),$.html().replace(/[ \t]+$/gm,'').trimEnd()+'\n');
 }
 let app=fs.readFileSync(path.join(root,'app.js'),'utf8');
 app=app.replace(/Moja Afryka/g,'GambianTour')
 .replace('Reviews from our GambianTour guests, shared here with their original names. English translations from Polish.','Stories from our GambianTour guests, translated from Polish.')
 .replace('Opinie naszych gości z GambianTour, opublikowane z oryginalnymi podpisami. W wersji angielskiej zostały przetłumaczone z polskiego.','Opinie gości GambianTour. Wersja angielska jest tłumaczeniem z języka polskiego.');
 const footerCopies=['Gambia & Senegal tours with local guides. Personal journeys, lasting memories.','Gambia i Senegal z lokalnymi przewodnikami. Twoja podróż, niezapomniane wspomnienia.'];
 let footerIndex=0;app=app.replace(/^    footerCopy: .*$/gm,()=> '    footerCopy: '+JSON.stringify(footerCopies[footerIndex++])+',');
 fs.writeFileSync(path.join(root,'app.js'),app);
 require('./international-copy')();
 if(['locale-nl.json','locale-de.json'].every(f=>fs.existsSync(path.join(root,'content',f)))) require('./build-locales')();
};
if(require.main===module)module.exports();
