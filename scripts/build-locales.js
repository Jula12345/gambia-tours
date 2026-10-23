/* Publish complete HTML per language. No crawler or visitor needs client-side translation. */
const fs=require('node:fs'),path=require('node:path'),c=require('cheerio');
const l=require('../lib/site-localization');
const {root,origin,languages,normalize,files,route,textAttributes,schemaTextKeys}=l;
const version='20261023-i18n-v4';
const escape=s=>String(s).replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
const readDict=lang=>lang==='en'?{}:JSON.parse(fs.readFileSync(path.join(root,'content',lang==='pl'?'subpage-pl.json':'locale-'+lang+'.json'),'utf8'));
const exempt=s=>!/[\p{L}]/u.test(s)||/^(https?:|mailto:|tel:|assets\/|\/assets\/)/.test(s)||/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
function build(){
 const dictionaries=Object.fromEntries(Object.keys(languages).map(lang=>[lang,readDict(lang)]));
 const home=l.homeTranslations();
 const missing=[];
 function translate(value,lang){const key=normalize(value);if(lang==='en'||exempt(key))return value;const translated=dictionaries[lang][key];if(translated===undefined){missing.push({lang,text:key});return value;}return String(value).match(/^\s*/)[0]+translated+String(value).match(/\s*$/)[0];}
 // Validate source coverage before writing any localized page.
 for(const lang of ['pl','nl','de'])for(const s of l.strings())translate(s,lang);
 if(missing.length){const unique=[...new Map(missing.map(m=>[m.lang+'|'+m.text,m])).values()];fs.writeFileSync(path.join(root,'output','missing-locales.json'),JSON.stringify(unique,null,2));throw Error(unique.length+' untranslated strings; see output/missing-locales.json');}
 fs.mkdirSync(path.join(root,'assets/locales'),{recursive:true});
 const englishTour=s=>({'Polish-speaking guide available':'English-speaking local guide','English or Polish-speaking guide':'Local guide and personal support'})[s]||s;
 function copyValue(value,lang){if(Array.isArray(value))return value.map(v=>copyValue(v,lang));if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,copyValue(v,lang)]));return typeof value==='string'?translate(englishTour(value),lang):value;}
 const runtimeKeys=['Choose language','Open navigation','Close navigation','Choose your preferred tour date.','Preferred tour date','Tour period','Choose a start date to calculate the full {days}-day period.','days','day','nights','night','Your request has been received','Sending your request...','Thank you. Your request has been received.','Your request could not be sent. Please try again or email info@gambiantour.com. Your form details have been kept.','Reference {id}. We will contact you shortly.','Press play in the video controls to start the tour.','The video could not be loaded. Please try again or contact us for the property tour.'];
 for(const lang of Object.keys(languages)){
  const ui=lang==='pl'?home.pl:Object.fromEntries(Object.entries(home.en).map(([k,v])=>[k,translate(v,lang)]));
  const tours=Object.fromEntries(require('../tours').map(t=>[t.id,lang==='pl'?t.pl:copyValue(t.en,lang)]));
  const data={language:lang,locale:languages[lang].locale,ui,tours,text:Object.fromEntries(runtimeKeys.map(s=>[s,translate(s,lang)]))};
  fs.writeFileSync(path.join(root,'assets/locales',lang+'.js'),'window.GambianTourLocale='+JSON.stringify(data).replace(/</g,'\\u003c')+';\n');
 }
 function localLink(raw,file,lang){if(!raw||/^(#|data:|mailto:|tel:|javascript:)/.test(raw))return raw;
  const u=new URL(raw,origin+'/'+file);if(u.origin!==origin)return raw;
  let p=u.pathname.replace(/^\/(pl|nl|de)\//,'/');
  let target=p==='/'?'index.html':p.slice(1);
  if(files().includes(target))return route(target,lang)+u.search+u.hash;
  return p+u.search+u.hash;
 }
 function schema(value,file,lang,key=''){
  if(Array.isArray(value))return value.map(v=>schema(v,file,lang,key));
  if(value&&typeof value==='object'){
   const out={};for(const [k,v]of Object.entries(value)){
    if(k==='inLanguage'){out[k]=value['@type']==='WebSite'?Object.keys(languages):lang;continue;}
    if(['url','@id','item','mainEntityOfPage'].includes(k)&&typeof v==='string'&&v.startsWith(origin)&&!/#(business|website)$/.test(v)&&!['TravelAgency','WebSite','Person'].includes(value['@type']))out[k]=origin+localLink(v,file,lang);
    else out[k]=schema(v,file,lang,k);
   }return out;
  }
  return typeof value==='string'&&schemaTextKeys.has(key)&&!exempt(value)?translate(value,lang):value;
 }
 const written=[];
 for(const file of files()){
  const original=fs.readFileSync(path.join(root,file),'utf8');
  for(const lang of Object.keys(languages)){
   const $=c.load(original);const url=origin+route(file,lang);
   $('html').attr('lang',lang);$('body').attr('data-site-language',lang).attr('data-source-page',file);
   $('.language-toggle,.language-picker').remove();
   const options=Object.entries(languages).map(([code,info])=>`<a href="${route(file,code)}" hreflang="${code}" lang="${code}" data-language-link="${code}"${code===lang?' aria-current="page"':''}>${info.name}</a>`).join('');
   $('.header-actions').prepend(`<details class="language-picker"><summary aria-label="${escape(translate('Choose language',lang))}: ${languages[lang].name}"><span class="language-name" lang="${lang}">${languages[lang].name}</span><span class="language-code" aria-hidden="true">${lang.toUpperCase()}</span><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 7.5 5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg></summary><nav class="language-options" aria-label="${escape(translate('Choose language',lang))}">${options}</nav></details>`);
   $('option').each((_,n)=>{if(n.attribs.value===undefined)$(n).attr('value',$(n).text());});
   if(lang!=='pl')$('.polish-site-invite').remove();
   if(lang==='pl'&&!$('.polish-site-invite').length)$('.footer-links').append('<a class="polish-site-invite" href="https://mojaafryka.pl/" lang="pl" target="_blank" rel="noopener">Podróżujesz z Polski? Odwiedź mojaafryka.pl — naszą stronę dla polskich turystów.</a>');
   if(lang==='pl')$('[data-guides-link]').attr('href','polish-speaking-guide.html');
   $('body *').contents().each((_,n)=>{if(n.type==='text'&&!$(n).parents('script,style,svg,noscript,.language-picker,.polish-site-invite').length)n.data=translate(n.data,lang);});
   $('body *').each((_,n)=>{if($(n).closest('.language-picker,.polish-site-invite').length)return;for(const a of textAttributes)if($(n).attr(a))$(n).attr(a,translate($(n).attr(a),lang));});
   $('title').text(translate($('title').text(),lang));
   $('meta[name=description],meta[name=keywords],meta[property="og:title"],meta[property="og:description"],meta[name="twitter:title"],meta[name="twitter:description"]').each((_,n)=>$(n).attr('content',translate($(n).attr('content'),lang)));
   $('link[rel=canonical],link[rel=alternate][hreflang],meta[property="og:locale:alternate"]').remove();
   $('head').append(`<link rel="canonical" href="${url}">`);
   for(const code of Object.keys(languages))$('head').append(`<link rel="alternate" hreflang="${code}" href="${origin+route(file,code)}">`);
   $('head').append(`<link rel="alternate" hreflang="x-default" href="${origin+route(file)}">`);
   $('meta[property="og:url"]').attr('content',url);$('meta[property="og:locale"]').attr('content',languages[lang].og);
   for(const [code,info]of Object.entries(languages))if(code!==lang)$('head').append(`<meta property="og:locale:alternate" content="${info.og}">`);
   $('[href],[src],[poster],[action]').each((_,n)=>{for(const a of ['href','src','poster','action'])if($(n).attr(a)&&!$(n).is('[data-language-link],link[hreflang],link[rel=canonical]')&&!$(n).hasClass('polish-site-invite'))$(n).attr(a,localLink($(n).attr(a),file,lang));});
   $('[srcset]').each((_,n)=>$(n).attr('srcset',$(n).attr('srcset').split(',').map(s=>s.trim().replace(/^assets\//,'/assets/')).join(', ')));
   $('script[type="application/ld+json"]').each((_,n)=>$(n).text(JSON.stringify(schema(JSON.parse($(n).text()),file,lang)).replace(/</g,'\\u003c')));
   $('script[src*="site-language"],script[src*="/assets/locales/"]').remove();
   const scripts=`<script src="/assets/locales/${lang}.js?v=${version}"></script><script src="/site-language.js?v=${version}"></script>`;
   const first=$('body script[src]').first();if(first.length)first.before(scripts);else $('body').append(scripts);
   $('script[src],link[rel=stylesheet]').each((_,n)=>{const a=n.tagName==='script'?'src':'href';const v=$(n).attr(a);if(v?.startsWith('/')&&!v.startsWith('//'))$(n).attr(a,v.split('?')[0]+'?v='+version);});
   const assetSeen=new Set();$('script[src],link[rel=stylesheet]').each((_,n)=>{const attr=n.tagName==='script'?'src':'href';const key=n.tagName+'|'+$(n).attr(attr).split('?')[0];if(assetSeen.has(key))$(n).remove();else assetSeen.add(key);});
   // The unchanged booking form values identify the same products in every language.
   const dest=path.join(root,lang==='en'?'':lang,file);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,$.html().replace(/[ \t]+$/gm,'').trimEnd()+'\n');written.push({file,lang,url});
  }
 }
 if(missing.length)throw Error('A new untranslated string appeared during the build');
 fs.writeFileSync(path.join(root,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+written.map(p=>`  <url><loc>${p.url}</loc><lastmod>2026-10-23</lastmod></url>`).join('\n')+'\n</urlset>\n');
 const config=JSON.parse(fs.readFileSync(path.join(root,'vercel.json')));config.redirects=(config.redirects||[]).filter(r=>!/^\/(pl|nl|de)(\/index\.html)?$/.test(r.source));for(const lang of ['pl','nl','de'])config.redirects.push({source:'/'+lang,destination:'/'+lang+'/',permanent:true},{source:'/'+lang+'/index.html',destination:'/'+lang+'/',permanent:true});fs.writeFileSync(path.join(root,'vercel.json'),JSON.stringify(config,null,2)+'\n');
 console.log('Built '+written.length+' fully translated pages with reciprocal language links.');
}
module.exports=build;if(require.main===module)build();
