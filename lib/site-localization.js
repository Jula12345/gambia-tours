const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const cheerio=require('cheerio');
const root=path.resolve(__dirname,'..');
const origin='https://www.gambiantour.com';
const languages={en:{name:'English',locale:'en-GB',og:'en_GB'},pl:{name:'Polski',locale:'pl-PL',og:'pl_PL'},nl:{name:'Nederlands',locale:'nl-NL',og:'nl_NL'},de:{name:'Deutsch',locale:'de-DE',og:'de_DE'}};
const normalize=s=>String(s).trim().replace(/\s+/g,' ');
const files=()=>fs.readdirSync(root).filter(f=>f.endsWith('.html')&&f!=='admin.html');
const route=(file,lang='en')=>(lang==='en'?'/':'/'+lang+'/')+(file==='index.html'?'':file);
function homeTranslations(){const source=fs.readFileSync(path.join(root,'app.js'),'utf8');const match=source.match(/const translations = ([\s\S]*?\n});/);if(!match)throw Error('Homepage translations not found');return vm.runInNewContext('('+match[1]+')');}
const textAttributes=['alt','aria-label','placeholder','data-caption','title'];
const schemaTextKeys=new Set(['name','headline','description','text','caption','articleBody','keywords']);
function schemaStrings(value,visit,key=''){if(Array.isArray(value)){value.forEach(v=>schemaStrings(v,visit,key));return;}if(value&&typeof value==='object'){for(const [k,v]of Object.entries(value))schemaStrings(v,visit,k);return;}if(typeof value==='string'&&schemaTextKeys.has(key)&&!value.startsWith('http'))visit(value);}
function strings(){const set=new Set();const add=s=>{s=normalize(s);if(s&&/[\p{L}]/u.test(s))set.add(s);};
 for(const file of files()){
  const $=cheerio.load(fs.readFileSync(path.join(root,file),'utf8'));
  $('body *').contents().each((_,n)=>{if(n.type==='text'&&!$(n).parents('script,style,svg,noscript,.polish-site-invite,.language-toggle,.language-picker').length)add(n.data);});
  $('body *').each((_,n)=>{if($(n).closest('.language-toggle,.language-picker,.polish-site-invite').length)return;for(const a of textAttributes)if($(n).attr(a))add($(n).attr(a));});
  add($('title').text());$('meta[name=description],meta[name=keywords],meta[property="og:title"],meta[property="og:description"],meta[name="twitter:title"],meta[name="twitter:description"]').each((_,n)=>add($(n).attr('content')));
  $('script[type="application/ld+json"]').each((_,n)=>schemaStrings(JSON.parse($(n).text()),add));
 }
 const ui=homeTranslations().en;Object.values(ui).forEach(add);
 for(const tour of require('../tours')){for(const v of Object.values(tour.en))if(Array.isArray(v))v.forEach(add);else add(v);}
 for(const s of ['English-speaking local guide','Local guide and personal support','Choose language','Close navigation','Choose your preferred tour date.','Preferred tour date','Tour period','Choose a start date to calculate the full {days}-day period.','days','day','nights','night','Your request has been received','Sending your request...','Thank you. Your request has been received.','Your request could not be sent. Please try again or email info@gambiantour.com. Your form details have been kept.','Reference {id}. We will contact you shortly.','Press play in the video controls to start the tour.','The video could not be loaded. Please try again or contact us for the property tour.'])add(s);
 return [...set];}
module.exports={root,origin,languages,normalize,files,route,homeTranslations,textAttributes,schemaTextKeys,schemaStrings,strings};
