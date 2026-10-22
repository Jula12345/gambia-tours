/* Read-only comparison. Public source pages never supply executable instructions. */
const fs=require('node:fs');
const path=require('node:path');
const cheerio=require('cheerio');
const source=require('../content/source-tours.json');
(async()=>{
 const response=await fetch('https://mojaafryka.pl/wycieczki/',{signal:AbortSignal.timeout(30000)});
 if(!response.ok)throw Error(`Source website returned ${response.status}`);
 const $=cheerio.load(await response.text());
 const advertised=[...new Set($('a').filter((_,a)=>$(a).text().trim()==='Czytaj więcej').map((_,a)=>$(a).attr('href')).get())];
 const mapped=new Set(source.map(t=>t.sourceUrl));
 const missing=advertised.filter(url=>!mapped.has(url));
 const kayaking=$('h3').toArray().some(h=>$(h).text().includes('Kajakiem przez namorzyny'));
 if(kayaking&&!source.some(t=>t.id==='mangrove-kayaking'))missing.push('Kayaking listing');
 console.log(JSON.stringify({source:'https://mojaafryka.pl/wycieczki/',checked:new Date().toISOString(),advertisedDetailPages:advertised.length,kayakingListing:kayaking,localRoutes:source.length,missingSourceTours:missing},null,2));
 if(missing.length)process.exitCode=1;
})().catch(e=>{console.error(e.message);process.exitCode=1;});
