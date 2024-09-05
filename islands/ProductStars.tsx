import { useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

export interface Props {
  context: "card" | "pdp";
  storeId: string;
  productId: string;
}

const id = "trustvox-script-stars";

export default function ProductStars({
  context = "pdp",
  storeId,
  productId,
}: Props) {
  if (!IS_BROWSER) return null;

  useEffect(() => {
    // @ts-ignore _trustvox_shelf_rate exists
    globalThis.window._trustvox_shelf_rate = [["_storeId", storeId]];

    const productStars = document.getElementById(id);

    if (productStars === null) {
      const script = document.createElement("script");

      script.id = id;
      script.async = true;
      script.type = "text/javascript";
      script.src = "//rate.trustvox.com.br/widget.js";

      document.head.append(script);
    } else {
      productStars.remove();
    }
  }, []);

  return <div class={context === "card" ? "mt-2" : ""} data-trustvox-product-code={productId} />;
}
