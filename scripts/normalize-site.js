const fs = require('node:fs');
const path = require('node:path');
const cheerio = require('cheerio');
module.exports = function normalize() {
 const root=path.resolve(__dirname,'..'),origin='https://www.gambiantour.com';
 const business={'@type':'TravelAgency','@id':origin+'/#business',name:'GambianTour.com',url:origin+'/',description:'Gambia and Senegal tours with local guides, private itineraries and small-group departures.',logo:origin+'/assets/brand/gambiantour-logo.svg',image:origin+'/assets/trips/baobab-guests-1600.webp',email:'info@gambiantour.com',telephone:'+48504224794',address:{'@type':'PostalAddress',streetAddress:'PMB 381 Senegambia Road',addressLocality:'Kololi, Serrekunda',addressCountry:'GM'},areaServed:['The Gambia','Senegal'],knowsLanguage:['English','Polish'],sameAs:['https://mojaafryka.pl/','https://www.facebook.com/mojaafryka'],contactPoint:{'@type':'ContactPoint',telephone:'+48504224794',email:'info@gambiantour.com',contactType:'tour enquiries',availableLanguage:['English','Polish']}};
 const whatsapp=`<a class="whatsapp-float" data-whatsapp-contact href="https://wa.me/48504224794?text=Hello%20Lamin%2C%20I%27d%20like%20to%20plan%20a%20Gambia%20or%20Senegal%20tour." target="_blank" rel="noopener noreferrer" aria-label="Chat with Lamin on WhatsApp"><svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 .9A15.1 15.1 0 0 0 3 23.7L.9 31l7.6-2A15.1 15.1 0 1 0 16 .9Zm0 27.4a12.2 12.2 0 0 1-6.2-1.7l-.4-.2-4.5 1.2 1.2-4.4-.3-.5A12.3 12.3 0 1 1 16 28.3Zm6.7-9.2c-.4-.2-2.2-1.1-2.5-1.2-.3-.1-.6-.2-.8.2l-1.2 1.4c-.2.2-.4.3-.8.1a10 10 0 0 1-3-1.8 11.3 11.3 0 0 1-2.1-2.6c-.2-.4 0-.6.1-.7l.6-.7.4-.6c.1-.2 0-.5 0-.7l-1.1-2.6c-.3-.6-.6-.6-.8-.6h-.7c-.3 0-.7.1-1 .5a4.1 4.1 0 0 0-1.3 3c0 1.7 1.3 3.4 1.5 3.6.2.2 2.6 4 6.3 5.5l2.1.8a5 5 0 0 0 2.3.1c.7-.1 2.2-.9 2.5-1.7.3-.9.3-1.6.2-1.7-.1-.2-.4-.3-.7-.5Z"/></svg><span>Chat with Lamin</span></a>`;
 const files=fs.readdirSync(root).filter(f=>f.endsWith('.html')&&f!=='admin.html');
 for(const file of files) {
  let html=fs.readFileSync(path.join(root,file),'utf8').replaceAll('https://gambiantour.com','https://www.gambiantour.com');
  const $=cheerio.load(html),pl=$('html').attr('lang')==='pl';
  const url=origin+(file==='index.html'?'/':'/'+file);
  function meta(key,value,property=false){const attr=property?'property':'name';let tag=$(`meta[${attr}="${key}"]`);if(!tag.length){$('head').append(`<meta ${attr}="${key}"/>`);tag=$(`meta[${attr}="${key}"]`);}tag.attr('content',value);}
  $('link[rel=canonical]').remove();$('head').append(`<link rel="canonical" href="${url}"/>`);
  meta('og:url',url,true);meta('og:locale',pl?'pl_PL':'en_GB',true);meta('og:site_name','GambianTour.com',true);meta('twitter:card','summary_large_image');meta('theme-color','#0a463c');
  if(!$('meta[property="og:image"]').length)meta('og:image',origin+'/assets/trips/baobab-guests-1600.webp',true);
  if(!$('meta[property="og:description"]').length)meta('og:description',$('meta[name=description]').attr('content')||$('title').text(),true);
  if(!$('meta[property="og:title"]').length)meta('og:title',$('title').text(),true);
  $('meta[property="og:image"]').attr('content',function(_,v){return v?.startsWith('https://upload.wikimedia.org')||v?.startsWith('https://commons.wikimedia.org')?origin+'/assets/trips/coastal-sunset-1600.webp':v;});
  meta('twitter:title',$('meta[property="og:title"]').attr('content'));meta('twitter:description',$('meta[property="og:description"]').attr('content'));meta('twitter:image',$('meta[property="og:image"]').attr('content'));
  $('link[rel=stylesheet]').each((_,el)=>{const href=$(el).attr('href');if(/^(styles|hotels|travel-updates)\.css/.test(href))$(el).attr('href',href.split('?')[0]+'?v=20261022-season');});
  if(!$('link[href^="season.css"]').length)$('head').append('<link rel="stylesheet" href="season.css?v=20261022-season-final"/>');
  $('link[href^="season.css"]').attr('href','season.css?v=20261022-season-final');
  $('link[rel=icon]').attr('href','assets/favicon.png?v=20261022-season');
  $('link[rel=apple-touch-icon]').attr('href','assets/apple-touch-icon.png?v=20261022-season');
  $('header .brand').html('<img src="assets/brand/gambiantour-logo.svg" width="250" height="50" alt="GambianTour.com — Gambia and Senegal local guides"/>');
  $('.footer-logo').replaceWith('<a href="index.html" aria-label="GambianTour.com home"><img class="footer-logo-image" src="assets/brand/gambiantour-logo.svg" width="250" height="50" alt="GambianTour.com" loading="lazy"/></a>');
  $('img[src="assets/brand/gambiantour-logo.svg"]').attr('src','assets/brand/gambiantour-logo.svg?v=20261022-season');
  $('[data-menu-toggle]').attr('aria-expanded','false').attr('aria-controls','site-navigation');$('[data-nav]').attr('id','site-navigation');
  $('[data-nav] a[href="stories.html"]').attr('href','blog.html').text(pl?'Poradnik':'Travel guide');
  $('[data-nav] a[href="index.html#tours"]').attr('href','tours.html');
  if(file==='index.html'){ $('[data-nav] a[href="#tours"]').attr('href','tours.html');$('[data-nav] a[data-i18n=navWhy]').attr('href','#testimonials').text('Reviews'); }
  $('.footer-links').each((_,el)=>{for(const [href,label] of [['tours.html',pl?'Wszystkie wycieczki':'All tours'],['about-lamin-conteh.html',pl?'O Laminie':'About Lamin'],['blog.html',pl?'Poradnik':'Travel guide']])if(!$(el).find(`a[href="${href}"]`).length)$(el).append(`<a href="${href}">${label}</a>`);});
  $('script[src="tour-page.js"]').attr('src','tour-page.js?v=20261022-season');$('script[src^="form-client.js"]').attr('src','form-client.js?v=20261022-season');
  $('img[src*="Little_Bee-eater"]').attr('src','assets/trips/egret-mangroves-1600.webp').attr('alt','White egret among the mangroves').attr('width','1200').attr('height','1600');
  $('img').each((_,el)=>{const im=$(el);if(!im.attr('decoding'))im.attr('decoding','async');});
  $('script[type="application/ld+json"]').each((_,el)=>{
   const data=JSON.parse($(el).text());
   function clean(x){if(Array.isArray(x)){x.forEach(clean);return;}if(!x||typeof x!=='object')return;if(x.availability==='https://schema.org/InStock')delete x.availability;if(x['@type']==='TravelAgency'&&x.name==='GambianTour.com'){Object.assign(x,business);}for(const key of Object.keys(x))if(typeof x[key]==='string'&&x[key].includes('Little_Bee-eater'))x[key]=origin+'/assets/trips/egret-mangroves-1600.webp';for(const v of Object.values(x))clean(v);}
   clean(data);$(el).text(JSON.stringify(data).replace(/</g,'\\u003c'));
  });
  if(file==='index.html'){
   $('title').text('Gambia & Senegal Tours 2026–2027 | GambianTour.com');meta('description','Book Gambia day trips, Senegal safaris, river cruises and multi-day tours for 2026–2027. Local English and Polish guides. Plan your trip with Lamin.');meta('og:title','Gambia & Senegal Tours 2026–2027 | GambianTour.com',true);meta('og:description',$('meta[name=description]').attr('content'),true);meta('twitter:title',$('title').text());meta('twitter:description',$('meta[name=description]').attr('content'));
   $('[data-i18n=heroEyebrow]').text('Gambia & Senegal tours · private journeys and small groups');$('[data-i18n=heroCopy]').text('Explore Banjul, the River Gambia, mangroves and Senegal’s wildlife with local guides. Choose a day out or a longer journey for the 2026–2027 season.');
  }
  $('[data-whatsapp-contact]').remove();$('body').append(whatsapp);
  if(!$('.site-footer a[href="https://mojaafryka.pl/"]').length)$('.footer-links').append('<a href="https://mojaafryka.pl/" target="_blank" rel="noopener">Moja Afryka · Polski</a>');
  if(!$('.site-footer a[href="tel:+48504224794"]').length)$('.footer-links').append('<a href="tel:+48504224794">+48 504 224 794</a>');
  fs.writeFileSync(path.join(root,file),$.html().replace(/[ \t]+$/gm,'').trimEnd()+'\n');
 }
 const urls=files.map(f=>origin+(f==='index.html'?'/':'/'+f));
 fs.writeFileSync(path.join(root,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+urls.map(u=>`  <url><loc>${u}</loc><lastmod>2026-10-22</lastmod></url>`).join('\n')+'\n</urlset>\n');
 fs.writeFileSync(path.join(root,'robots.txt'),`User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /data/\n\nSitemap: ${origin}/sitemap.xml\n`);
 const config=JSON.parse(fs.readFileSync(path.join(root,'vercel.json')));
 config.redirects=[...(config.redirects||[]).filter(r=>r.source!=='/index.html'),{source:'/index.html',destination:'/',permanent:true}];
 config.headers=[...(config.headers||[]).filter(h=>!['/admin','/admin.html','/api/:path*'].includes(h.source)),...['/admin','/admin.html','/api/:path*'].map(source=>({source,headers:[{key:'X-Robots-Tag',value:'noindex, nofollow, noarchive'}]}))];
 fs.writeFileSync(path.join(root,'vercel.json'),JSON.stringify(config,null,2)+'\n');
};
if(require.main===module)module.exports();
