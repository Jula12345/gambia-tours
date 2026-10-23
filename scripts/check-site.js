const fs=require('node:fs'),path=require('node:path'),c=require('cheerio');
const {root,origin,languages,files,route}=require('../lib/site-localization');
function audit(){
 const errors=[],warnings=[],pages=new Map();let links=0,assets=0;
 for(const file of files())for(const lang of Object.keys(languages)){const rel=(lang==='en'?'':lang+'/')+file;pages.set(rel,c.load(fs.readFileSync(path.join(root,rel),'utf8')));}
 const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
 for(const [file,$]of pages){const lang=file.includes('/')?file.split('/')[0]:'en',base=path.basename(file),expected=origin+route(base,lang);
  if($('h1').length!==1)errors.push(file+': expected one H1');
  if($('html').attr('lang')!==lang)errors.push(file+': wrong language');
  if($('link[rel=canonical]').attr('href')!==expected)errors.push(file+': wrong canonical');
  if(!sitemap.includes('<loc>'+expected+'</loc>'))errors.push(file+': not in sitemap');
  if(!$('meta[name=description]').attr('content'))errors.push(file+': no description');
  if($('link[hreflang]').length!==5)errors.push(file+': expected four languages and x-default');
  for(const code of Object.keys(languages))if($('link[hreflang="'+code+'"]').attr('href')!==origin+route(base,code))errors.push(file+': wrong '+code+' alternate');
  if($('[data-language-link]').length!==4)errors.push(file+': incomplete language navigation');
  $('script[type="application/ld+json"]').each((_,n)=>{try{JSON.parse($(n).text());}catch{errors.push(file+': invalid schema');}});
  $('a[href],link[rel=stylesheet],script[src],img[src],source[src],video[poster]').each((_,n)=>{const tag=$(n),raw=tag.attr('href')||tag.attr('src')||tag.attr('poster');if(!raw||/^(mailto:|tel:|data:|javascript:)/.test(raw))return;const u=new URL(raw,expected);if(u.origin!==origin)return;let dest=decodeURIComponent(u.pathname.slice(1));if(!dest||dest.endsWith('/'))dest+='index.html';if(!fs.existsSync(path.join(root,dest)))errors.push(file+': missing '+raw);if(n.tagName==='a'){links++;if(u.hash&&pages.has(dest)&&!pages.get(dest)('[id="'+decodeURIComponent(u.hash.slice(1))+'"]').length)errors.push(file+': missing anchor '+raw);}else assets++;});
  $('img').each((_,n)=>{if(!$(n).attr('alt')&&!$(n).is('[aria-hidden=true],[data-full-photo]')&&!$(n).closest('[aria-hidden=true]').length)warnings.push(file+': empty image description');});
 }
 return {pages:pages.size,localLinks:links,localAssets:assets,errors,warnings};
}
module.exports=audit;if(require.main===module){const result=audit();console.log(JSON.stringify(result,null,2));if(result.errors.length)process.exitCode=1;}
