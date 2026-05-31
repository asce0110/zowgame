import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { serializeContentModule } from "../src/app/data/content-serializer.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const targetFile = path.join(root, "src", "app", "data", "cobb-can-move-content.ts");

function sendJson(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(body));
}

export async function contentSaveHandler(req, res) {
  if (req.method === "OPTIONS") {
    return sendJson(res, 200, { ok: true });
  }

  if (req.method !== "POST") {
    return sendJson(res, 405, { ok: false, error: "Method not allowed" });
  }

  let raw = "";
  req.on("data", (chunk) => {
    raw += chunk;
  });

  req.on("end", async () => {
    try {
      const parsed = JSON.parse(raw || "{}");
      const content = parsed?.content;
      if (!content || typeof content !== "object") {
        return sendJson(res, 400, { ok: false, error: "Missing content payload" });
      }

      const source = serializeContentModule("../data/cobb-can-move-content", "DEFAULT_CONTENT", content);
      await fs.writeFile(targetFile, source, "utf8");

      return sendJson(res, 200, { ok: true, path: targetFile });
    } catch (error) {
      return sendJson(res, 500, { ok: false, error: String(error) });
    }
  });
}
