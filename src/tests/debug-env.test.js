import { test } from "vitest";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import process from "process";

test("DEBUG: Trace Environment Variables", () => {
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const examplePath = path.resolve(currentDir, "../../.env.example");
  const exampleConfig = dotenv.parse(fs.readFileSync(examplePath));
  const requiredKeys = Object.keys(exampleConfig);

  console.log("--- CI ENVIRONMENT DEBUG START ---");

  requiredKeys.forEach((key) => {
    // Check all possible locations where Vitest might store the variable
    const metaValue = import.meta.env[key];
    const processValue = process.env[key];

    const exists = metaValue !== undefined || processValue !== undefined;
    const hasLength = String(metaValue || processValue || "").length > 0;

    console.log(`Key: [${key}]`);
    console.log(`  - Found in import.meta.env: ${metaValue !== undefined}`);
    console.log(`  - Found in process.env:     ${processValue !== undefined}`);
    console.log(
      `  - Status: ${exists ? (hasLength ? "✅ OK" : "⚠️ EMPTY") : "❌ MISSING"}`,
    );
  });

  console.log("--- CI ENVIRONMENT DEBUG END ---");
});
