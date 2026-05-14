import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  base: "/automation-workbench/",
  plugins: [react()],
  test: {
    include: ["tests/core/**/*.test.ts", "tests/components/**/*.test.tsx", "tests/config/**/*.test.ts"],
  },
});
