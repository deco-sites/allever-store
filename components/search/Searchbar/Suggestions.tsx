import { Suggestion } from "apps/commerce/types.ts";
import { Resolved } from "deco/mod.ts";
import type { AppContext } from "../../../apps/site.ts";
import { clx } from "../../../sdk/clx.ts";
import { ComponentProps } from "../../../sections/Component.tsx";
import ProductCard from "../../product/ProductCard.tsx";
import Icon from "../../ui/Icon.tsx";
import { ACTION, NAME } from "./Form.tsx";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<Suggestion | null>;
}

export const action = async (props: Props, req: Request, ctx: AppContext) => {
  const { loader: { __resolveType, ...loaderProps } } = props;

  const form = await req.formData();
  const query = `${form.get(NAME ?? "q")}`;

  // @ts-expect-error This is a dynamic resolved loader
  const suggestion = await ctx.invoke(__resolveType, {
    ...loaderProps,
    query,
  }) as Suggestion | null;

  return { suggestion };
};

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const { loader: { __resolveType, ...loaderProps } } = props;

  const query = new URL(req.url).searchParams.get(NAME ?? "q");

  // @ts-expect-error This is a dynamic resolved loader
  const suggestion = await ctx.invoke(__resolveType, {
    ...loaderProps,
    query,
  }) as Suggestion | null;

  return { suggestion };
};

function Suggestions(
  { suggestion }: ComponentProps<typeof loader, typeof action>,
) {
  const { products = [], searches = [] } = suggestion ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);


  return (
    <div
      class={clx(``, !hasProducts && !hasTerms && "flex")}
    >
      <div class="flex gap-4 flex-col lg:flex-row">
        <div class="flex flex-col gap-5 mt-[35px] lg:my-[35px] lg:w-[200px]">
          <span
            class="font-extrabold text-sm uppercase text-[#123ADD]"
            role="heading"
            aria-level={3}
          >
            Sugestões
          </span>
          <ul class="flex flex-col gap-5 ">
            {searches.map(({ term }) => (
              <li>
                {/* TODO @gimenes: use name and action from searchbar form */}
                <a
                  href={`${ACTION}?${NAME}=${term}`}
                  class="flex gap-4 items-center"
                >

                  <span class="text-[#888888] text-sm" dangerouslySetInnerHTML={{ __html: term }} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div class="flex flex-col md:flex-row pt-6 md:pt-0 gap-6 overflow-x-hidden">
          <div class="gap-4 flex">
            {
              products.length > 0 ? (
                <div class="flex flex-col pt-6 md:py-8 gap-6 overflow-x-hidden">
                  <div class="flex flex-col gap-y-4  overflow-auto">
                    {products.map((product, index) => (
                      <a class="flex items-center gap-x-6 bg-white py-2 px-[10px] rounded-[10px] h-[208px]" href={product.url}>
                        <div class=" max-w-[140px] max-h-[192px]">
                          <Image
                            src={product?.image[0].url!}
                            alt={product?.image[0].name}
                            width={140}
                            height={192}
                            loading="lazy"
                            decoding="async"
                            class="w-full h-full"
                          />
                        </div>
                        <span class="text-sm">{product?.isVariantOf.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ) : null
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Suggestions;
