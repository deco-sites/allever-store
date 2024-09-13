import { defineConfig } from "$fresh/server.ts";
import plugins from "https://cdn.jsdelivr.net/gh/deco-sites/std@1.26.8/plugins/mod.ts";
import manifest from "./manifest.gen.ts";
import tailwind from "./tailwind.config.ts";

export default defineConfig({
  plugins: plugins({
    // @ts-expect-error somehow this typing doesnt work
    manifest,
    htmx: true,
    // @ts-expect-error somehow this typing doesnt work
    tailwind,
  }),
  render: (ctx, render) => {
    ctx.lang = "pt-BR";
    render();
  },
});
