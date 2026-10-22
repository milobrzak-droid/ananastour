import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      // Some modules under src/ import "server-only" (directly or transitively).
      // Tests exercise pure logic, so the guard is replaced by an empty stub.
      "server-only": fileURLToPath(new URL("./test/stubs/server-only.ts", import.meta.url)),
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["test/**/*.test.ts"],
    // Match production: the site is rendered for Czech-based users and the mock
    // provider keys its catalogue to the Prague calendar day.
    env: { TZ: "Europe/Prague" },
    coverage: {
      provider: "v8",
      include: ["src/lib/**", "src/i18n/**", "src/components/tours/labels.ts"],
      reporter: ["text", "text-summary"],
    },
  },
});
