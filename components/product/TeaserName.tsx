import { FunctionalComponent } from "preact";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { TeaserRename } from "../../apps/site.ts"; 

interface Teaser {
  name: string;
}

interface TeasersComponentProps {
  page: ProductDetailsPage | null;
  context: "product-details" | "product-card";
  teaserRenames: TeaserRename[]; 
}

const TeasersComponent: FunctionalComponent<TeasersComponentProps> = ({ page, context, teaserRenames = [] }) => {
  if (!page) return null;

  const { product } = page;
  const { offers } = product || {};
  const { teasers = [] } = useOffer(offers) || {}; 

  const teaserNameMap = teaserRenames.reduce((acc, teaser) => {
    acc[teaser.currentName] = { newName: teaser.newName, className: teaser.className };
    return acc;
  }, {} as Record<string, { newName: string, className: string }>);

  const validTeasers = teasers.filter((teaser: Teaser) => teaserNameMap[teaser.name]);

  console.log("Teasers recebidos do produto:", teasers);

  if (validTeasers.length === 0) return null;

  const getTailwindClassForContext = (context: string) => {
    if (context === "product-details") {
      return "text-xs font-semibold text-white uppercase bg-[#F22E2E] text-center items-center px-2 py-1 rounded-[6px] w-full h-10 flex justify-center";
    }
    if (context === "product-card") {
      return "text-xs font-medium text-gray-800 uppercase bg-yellow-500 text-center items-center px-2 py-1 rounded-[4px] w-full h-8 flex justify-center";
    }
    return "";
  };

  const Ctx_class = getTailwindClassForContext(context);

  return (
    <>
      {validTeasers.map((teaser) => {
        const teaserData = teaserNameMap[teaser.name];

        if (!teaserData) return null;

        return (
          <p key={teaser.name} class={`${Ctx_class} ${teaserData.className}`}>
            {teaserData.newName}
          </p>
        );
      })}
    </>
  );
};

export default TeasersComponent;
