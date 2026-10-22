const fs=require('node:fs'),c=require('cheerio'),path=require('node:path');
const root=path.resolve(__dirname,'..');const dictionary=JSON.parse(fs.readFileSync(path.join(root,'content/subpage-pl.json')));
const norm=s=>s.trim().replace(/\s+/g,' ');const missing=new Map();let pages=0,strings=0;
for(const file of fs.readdirSync(root).filter(f=>f.endsWith('.html')&&!['index.html','admin.html'].includes(f))){
 const $=c.load(fs.readFileSync(path.join(root,file),'utf8'));pages++;
 function check(text){const key=norm(text);if(!key||!/[a-zA-Z]/.test(key))return;strings++;if(!Object.hasOwn(dictionary,key)&&!missing.has(key))missing.set(key,file);}
 $('body *').contents().each((_,n)=>{if(n.type==='text'&&!$(n).parents('script,style,svg,noscript,.polish-site-invite').length)check(n.data)});
 $('[aria-label],[alt],[placeholder],[data-caption]').each((_,n)=>{for(const name of ['aria-label','alt','placeholder','data-caption'])if($(n).attr(name))check($(n).attr(name));});
 check($('title').text());
}
console.log(JSON.stringify({pages,strings,missing:[...missing].map(([text,page])=>({text,page}))},null,2));if(missing.size)process.exitCode=1;
