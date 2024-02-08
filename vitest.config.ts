import { defineConfig } from "vitest/config";

export default defineConfig({
   test: {
      environment: "node",
      setupFiles: ["./src/tests/setupFiles.ts"],
      threads: false,

      // ...
   },
});
