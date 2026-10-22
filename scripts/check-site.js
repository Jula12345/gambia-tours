const fs=require('node:fs');
const path=require('node:path');
const c=require('cheerio');
const root=path.resolve(__dirname,'..'),origin='https://www.gambiantour.com';
const errors=[],warnings=[];const pages=new Map();
for(const file of fs.readdirSync(root).filter(f=>f.endsWith('.html')&&f!=='admin.html'))pages.set(file,c.load(fs.readFileSync(path.join(root,file),'utf8')));
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');let links=0,assets=0;
for(const [file,$] of pages){
 const expected=origin+(file==='index.html'?'/':'/'+file);
 if($('h1').length!==1)errors.push(`${file}: expected one H1`);
 if($('link[rel=canonical]').attr('href')!==expected)errors.push(`${file}: wrong canonical`);
 if(!sitemap.includes(`<loc>${expected}</loc>`))errors.push(`${file}: missing from sitemap`);
 if(!$('meta[name=description]').attr('content'))errors.push(`${file}: missing description`);
 $('script[type="application/ld+json"]').each((_,el)=>{try{JSON.parse($(el).text())}catch{errors.push(`${file}: invalid JSON-LD`)}});
 $('a[href],link[rel=stylesheet],script[src],img[src],source[src]').each((_,el)=>{
  const tag=$(el),raw=tag.attr('href')||tag.attr('src');if(!raw||/^(mailto:|tel:|data:|javascript:)/.test(raw))return;
  const url=new URL(raw,origin+'/'+file);if(url.origin!==origin)return;
  const target=url.pathname==='/'?'index.html':decodeURIComponent(url.pathname.slice(1));
  if(!fs.existsSync(path.join(root,target)))errors.push(`${file}: missing local target ${raw}`);
  if(el.tagName==='a'){
   links++;
   if(url.hash&&pages.has(target)&&!pages.get(target)(`[id="${decodeURIComponent(url.hash.slice(1))}"]`).length)errors.push(`${file}: missing anchor ${raw}`);
  }else assets++;
 });
 $('img').each((_,img)=>{if(!$(img).attr('alt')&&!$(img).is('[aria-hidden=true], [data-full-photo]')&&!$(img).closest('[aria-hidden=true]').length)warnings.push(`${file}: empty image alt`)});
}
console.log(JSON.stringify({pages:pages.size,localLinks:links,localAssets:assets,errors,warnings},null,2));
if(errors.length)process.exitCode=1;
