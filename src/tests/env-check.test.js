import { expect, test } from "vitest";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

test("Environment matches .env.example", () => {
  // 1. Read the .env.example file
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const examplePath = path.resolve(currentDir, "../../.env.example");
  const exampleConfig = dotenv.parse(fs.readFileSync(examplePath));

  // 2. Get the list of keys (e.g., VITE_APP_TITLE, etc.)
  const requiredKeys = Object.keys(exampleConfig);

  // 3. Verify each key exists in the current environment
  requiredKeys.forEach((key) => {
    const value = import.meta.env[key];

    expect(
      value,
      `❌ MISSING SECRET: The variable "${key}" is defined in .env.example but missing from the environment/GitHub Secrets.`,
    ).toBeDefined();

    expect(
      value,
      `❌ EMPTY SECRET: The variable "${key}" is present but has no value.`,
    ).not.toBe("");
  });
});
