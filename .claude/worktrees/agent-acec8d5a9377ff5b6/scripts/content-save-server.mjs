import http from "node:http";
import { contentSaveHandler } from "./content-save-handler.mjs";

const port = Number(process.env.ZOW_CONTENT_SAVE_PORT || 41751);

const server = http.createServer((req, res) => {
  if (req.url?.startsWith("/__save-content")) {
    return contentSaveHandler(req, res);
  }

  res.writeHead(404, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(JSON.stringify({ ok: false, error: "Not found" }));
});

server.listen(port, () => {
  console.log(`[content-save] listening on http://127.0.0.1:${port}/__save-content`);
});
