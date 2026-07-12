import "../src/openapi/init";

import fs from "node:fs";
import path from "node:path";

import { openApiDocument } from "../src/openapi/document";

const outputPath = path.resolve(__dirname, "../../docs/openapi.json");

fs.mkdirSync(path.dirname(outputPath), { recursive: true });

fs.writeFileSync(outputPath, JSON.stringify(openApiDocument, null, 2));

console.log(`OpenAPI specification written to ${outputPath}`);
