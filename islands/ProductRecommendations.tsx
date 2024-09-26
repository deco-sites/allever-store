import { invoke } from "../runtime.ts";
import { useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function ProductRecommendations() {
  console.log("ProductRecommendations");
  if (!IS_BROWSER) return null;
  console.log("IS_BROWSER", IS_BROWSER);
  useEffect(() => {
    const getData = async () => {
      const response = await invoke.vtex.loaders.collections.list({
        term: "165",
      });

      console.log("response", response);
    }

    getData();
  }, []);

  return (
    <div class="bg-white col-span-2 rounded-l-2xl">
      <div class="py-5 text-2xl text-center max-w-[211px] mx-auto">
        Você também pode <b>[Gostar]</b>
      </div>
      <div>
      </div>
    </div>
  );
}
