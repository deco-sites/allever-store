import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { useScript } from "@deco/deco/hooks";
import { Context } from "@deco/deco";

const ADMIN_PATH = "/live/previews";

declare global {
  interface Window {
    _trustvox_shelf_rate: Array<[
      string,
      string | number | Array<string | undefined> | undefined,
    ]>;
  }
}
const serviceWorkerScript = () =>
  addEventListener("load", () =>
    navigator && navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js"));
function setupTrustvoxRateConfig(storeId: string) {
  window._trustvox_shelf_rate = [];
  window._trustvox_shelf_rate.push(["_storeId", storeId]);
  window._trustvox_shelf_rate.push(["_productContainer", "body"]);
  window._trustvox_shelf_rate.push(["_watchSubtree", "true"]);
}
export default defineApp(async (req, ctx) => {
  const revision = await Context.active().release?.revision();
  const url = new URL(req.url);
  const isOnAdmin = url.pathname.includes(ADMIN_PATH);
  return (
    <>
      {/* Include Icons and manifest */}
      <Head>
        {/* Enable View Transitions API */}

        {!isOnAdmin && (
          <style
            dangerouslySetInnerHTML={{
              __html: `@view-transition { navigation: auto; }`,
            }}
          />
        )}

        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Glide Modules */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
        />

        {!isOnAdmin && (
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
        )}
        {!isOnAdmin && (
          <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" />
        )}
        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />

        {!isOnAdmin && (
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: useScript(setupTrustvoxRateConfig, "121576"),
            }}
          />
        )}
        {!isOnAdmin && (
          <script
            defer
            type="text/javascript"
            src="//rate.trustvox.com.br/widget.js"
          />
        )}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/zoomist@2/zoomist.css"
        />
        {!isOnAdmin && (
          <script src="https://cdn.jsdelivr.net/npm/zoomist@2/zoomist.umd.js" />
        )}
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        {/* @ts-ignore . */}

        <link rel="preconnect" href="https://fonts.gstatic.com" />

        {/* <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'Poppins', serif;
                src: url('${asset("/Poppins-Light.ttf")}') format('ttf');
                font-weight: 300;
                font-style: normal;
              }
              @font-face {
                font-family: 'Poppins', serif;
                src: url('${asset("/Poppins-Regular.ttf")}') format('ttf');
                font-weight: 400;
                font-style: normal;
              }
              @font-face {
                font-family: 'Poppins', serif;
                src: url('${asset("/Poppins-Medium.ttf")}') format('ttf');
                font-weight: 500;
                font-style: normal;
              }
              @font-face {
                font-family: 'Poppins', serif;
                src: url('${asset("/Poppins-SemiBold.ttf")}') format('ttf');
                font-weight: 600;
                font-style: normal;
              }
              @font-face {
                font-family: 'Poppins', serif;
                src: url('${asset("/Poppins-Bold.ttf")}') format('ttf');
                font-weight: 700;
                font-style: normal;
              }
            `,
          }}
        /> */}
      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />
      {!isOnAdmin && (
        <script
          type="module"
          dangerouslySetInnerHTML={{ __html: useScript(serviceWorkerScript) }}
        />
      )}
    </>
  );
});
