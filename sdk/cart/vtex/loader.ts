import { Minicart } from "../../../components/minicart/Minicart.tsx";
import { itemToAnalyticsItem } from "apps/vtex/hooks/useCart.ts";
import type a from "apps/vtex/loaders/cart.ts";
import type { Product } from "apps/commerce/types.ts";
import type { AppContext } from "../../../apps/site.ts";

export type Cart = Awaited<ReturnType<typeof a>>;

export const cartFrom = (form: Cart, url: string, isMobile: boolean, recommendations?: Product[]): Minicart => {
  const { items, totalizers } = form ?? { items: [] };
  const total = totalizers?.find((item) => item.id === "Items")?.value || 0;
  const discounts =
    (totalizers?.find((item) => item.id === "Discounts")?.value || 0) * -1;
  const locale = form?.clientPreferencesData.locale ?? "pt-BR";
  const currency = form?.storePreferencesData.currencyCode ?? "BRL";
  const coupon = form?.marketingData?.coupon ?? undefined;

  return {
    isMobile,
    platformCart: form as unknown as Record<string, unknown>,
    recommendations: recommendations ?? [],
    storefront: {
      items: items.map((item, index) => {
        const detailUrl = new URL(item.detailUrl, url).href;

        return {
          ...itemToAnalyticsItem({ ...item, detailUrl, coupon }, index),
          image: item.imageUrl,
          listPrice: item.listPrice / 100,
        };
      }),

      total: (total - discounts) / 100,
      subtotal: total / 100,
      discounts: discounts / 100,
      coupon: coupon,
      locale,
      currency,
      freeShippingTarget: 1000,
      checkoutHref: "/checkout",
    },
  };
};

async function loader(
  _props: unknown,
  req: Request,
  ctx: AppContext,
): Promise<Minicart> {
  const {
    device,
    minicartSuggestion = ""
  } = ctx;
  console.log("minicartSuggestion", minicartSuggestion);
  const isMobile = device !== "desktop";
  const response = await ctx.invoke("vtex/loaders/cart.ts");
  if (minicartSuggestion !== "") {
    const recommendations = await ctx.invoke("vtex/loaders/intelligentSearch/productList.ts", {
      collection: minicartSuggestion,
      count: 5,
    });

    return cartFrom(response, req.url, isMobile, recommendations);
  }

  return cartFrom(response, req.url, isMobile);
}

export default loader;
