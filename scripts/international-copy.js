/* Keep international marketing focused on local guides; Polish pages retain their specific offer. */
const fs=require('node:fs'),path=require('node:path'),c=require('cheerio');
const {root,files,homeTranslations,normalize}=require('../lib/site-localization');
module.exports=function(){
 const appPath=path.join(root,'app.js');let app=fs.readFileSync(appPath,'utf8');const copy=homeTranslations();
 const changes={navPolish:'Our guides',metaDescription:'Book Gambia day trips, Senegal safaris, river cruises and multi-day tours for 2026–2027 with local guides. Message Lamin for a personal plan.',staysNoteCopy:'Choose a recommended stay and ask our local team about airport transfers and private excursions. Your dates, accommodation and final rate are confirmed personally before booking.',introCopy:'Choose a ready-made day trip or build a private itinerary around your hotel, pace and interests. Our local guides arrange tours from Kololi, Kotu, Senegambia, Bijilo, Cape Point and Banjul.',trustThree:'Local guides',trustThreeCopy:'personal travel support',featureCheck2:'English-speaking local guides and personal support',polishKicker:'Meet your local guides',polishTitle:'Local knowledge. A warm welcome.',polishCopy:'Discover The Gambia with English-speaking local guides who help you feel at home. Polish-language guiding is also available by prior arrangement.',polishButton:'Meet Lamin and the team',faq2Q:'Which languages do your guides speak?',faq2A:'Our tours are led in English. Polish-speaking guides are also available by prior arrangement. Please confirm your preferred guiding language when you enquire.'};
 const start=app.indexOf('  en: {'),end=app.indexOf('  pl: {');let block=app.slice(start,end);
 const polish=JSON.parse(fs.readFileSync(path.join(root,'content/subpage-pl.json')));
 for(const [key,value]of Object.entries(changes)){polish[value]=copy.pl[key]||polish[copy.en[key]]||value;block=block.replace(new RegExp('^    '+key+': .*$', 'm'),'    '+key+': '+JSON.stringify(value)+',');}
 app=app.slice(0,start)+block+app.slice(end);fs.writeFileSync(appPath,app);
 const substitutions=new Map([
 ['Plan this journey with Lamin and the GambianTour team. Choose English or Polish guiding by arrangement and a route that fits your holiday.','Plan this journey with Lamin and the GambianTour team. Your local guide and a route that fits your holiday are arranged before you book.'],
 ['GambianTour.com welcomes travelers from around the world with a personal approach, English-speaking guides and Polish guiding available by arrangement.','GambianTour.com welcomes travelers from around the world with English-speaking local guides and a personal approach. Polish guiding is also available by prior arrangement.'],
 ['English or Polish guide','Local guide'],['English / Polish on request','English; Polish by arrangement'],
 ['English-speaking guide as standard, Polish-speaking guide on request.','English-speaking local guide; confirm any other guiding preference in advance.'],
 ['English-speaking guide as standard, with Polish-speaking guide available by request.','English-speaking local guide, with arrangements confirmed personally.'],
 ['English-speaking guide as standard, with Polish-speaking guide available when arranged in advance.','English-speaking local guide, with arrangements confirmed personally.'],
 ['Polish guides','Our guides'],['Polish-speaking guide available','English-speaking local guide'],['English or Polish-speaking guide','Local guide and personal support']
 ]);
 for(const [en,replacement]of substitutions)if(polish[en])polish[replacement]=polish[en];
 for(const file of files()){
  const $=c.load(fs.readFileSync(path.join(root,file),'utf8'));
  $('body *').contents().each((_,n)=>{if(n.type!=='text'||$(n).parents('script,style,svg').length)return;const key=normalize(n.data);if(substitutions.has(key))n.data=n.data.match(/^\s*/)[0]+substitutions.get(key)+n.data.match(/\s*$/)[0];});
  $('[data-nav] a[href="polish-speaking-guide.html"]').attr('href','about-lamin-conteh.html').attr('data-guides-link','');
  if(file==='index.html'){
   for(const [key,value]of Object.entries(changes))$('[data-i18n="'+key+'"]').text(value);
   $('#polish-guides a').attr('href','about-lamin-conteh.html').attr('data-guides-link','');
   $('meta[name=description],meta[property="og:description"],meta[name="twitter:description"]').attr('content',changes.metaDescription);
  }
  // Keep FAQ structured answers identical to the visible international copy.
  $('script[type="application/ld+json"]').each((_,n)=>{const data=JSON.parse($(n).text());function walk(x){if(!x||typeof x!=='object')return;if(x['@type']==='FAQPage'){const list=$('.faq-grid article').toArray();x.mainEntity=list.map(el=>({'@type':'Question',name:$(el).find('h3').text(),acceptedAnswer:{'@type':'Answer',text:$(el).find('p').text()}}));}Object.values(x).forEach(walk);}walk(data);$(n).text(JSON.stringify(data));});
  fs.writeFileSync(path.join(root,file),$.html()+'\n');
 }
 fs.writeFileSync(path.join(root,'content/subpage-pl.json'),JSON.stringify(polish,null,2)+'\n');
};
if(require.main===module)module.exports();
