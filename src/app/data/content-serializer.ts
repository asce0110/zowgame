export function serializeContentModule(modulePath: string, valueName: string, content: unknown) {
  return `import type { SiteContent } from "../components/content-store";\n\nexport const ${valueName}: SiteContent = ${JSON.stringify(content, null, 2)};\n`;
}
