import fs from "node:fs/promises";
import path from "node:path";
const assets = {};
async function collect(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const name = path.join(dir, entry.name);
    if (entry.isDirectory()) await collect(name);
    else
      assets["/" + path.relative("out", name)] = (
        await fs.readFile(name)
      ).toString("base64");
  }
}
await collect("out");
const serve = `
const mime={html:'text/html; charset=utf-8',css:'text/css',js:'text/javascript',txt:'text/plain',md:'text/markdown',json:'application/json',xml:'application/xml',webp:'image/webp',pdf:'application/pdf',ico:'image/x-icon',woff2:'font/woff2',svg:'image/svg+xml'};
export default {async fetch(req,env){let p;try{p=decodeURIComponent(new URL(req.url).pathname)}catch{return new Response('Invalid URL',{status:400})}if(p==='/api/contact')return saveContact(req,env.BUCKET);if(req.method!=='GET'&&req.method!=='HEAD')return new Response(null,{status:405});let key=[p,p.replace(/\\/$/,'')+'/index.html',p+'.html'].find(k=>Object.hasOwn(assets,k));const status=key?200:404;key=key||'/404.html';const type=mime[key.split('.').pop()]||'application/octet-stream';return new Response(req.method==='HEAD'?null:Uint8Array.from(atob(assets[key]),x=>x.charCodeAt(0)),{status,headers:{'Content-Type':type,'X-Content-Type-Options':'nosniff','Cache-Control':key.startsWith('/_next/static/')?'public,max-age=31536000,immutable':'no-cache'}})}};`;
await fs.mkdir("dist/server", { recursive: true });
await fs.writeFile(
  "dist/server/index.js",
  (await fs.readFile("worker/contact.mjs", "utf8")) +
    "\nconst assets=" +
    JSON.stringify(assets) +
    ";\n" +
    serve,
);
