import http from "node:http";
import fs from "node:fs/promises";
import { join } from "node:path";
import production from "../dist/server/index.js";
const bucket = {
  async put(key, value) {
    const dir = ".local-inbox";
    await fs.mkdir(join(dir, "enquiries"), { recursive: true });
    await fs.writeFile(join(dir, key), value, { flag: "wx" });
  },
};
const portIndex = process.argv.findIndex((x) => x === "--port" || x === "-p");
const port = Number(
  process.env.PORT || (portIndex < 0 ? 3000 : process.argv[portIndex + 1]),
);
http
  .createServer(async (req, res) => {
    try {
      const parts = [];
      for await (const part of req) parts.push(part);
      const request = new Request("http://" + req.headers.host + req.url, {
        method: req.method,
        headers: req.headers,
        body: ["GET", "HEAD"].includes(req.method)
          ? undefined
          : Buffer.concat(parts),
      });
      const response = await production.fetch(request, { BUCKET: bucket });
      res.writeHead(response.status, Object.fromEntries(response.headers));
      res.end(Buffer.from(await response.arrayBuffer()));
    } catch {
      res.writeHead(500);
      res.end();
    }
  })
  .listen(port, "0.0.0.0");
