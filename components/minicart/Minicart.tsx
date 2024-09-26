import { AppContext } from "../../apps/site.ts";
import { MINICART_DRAWER_ID, MINICART_FORM_ID } from "../../constants.ts";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useComponent } from "../../sections/Component.tsx";
import Coupon from "./Coupon.tsx";
import CartItem, { Item } from "./Item.tsx";
import Icon from "../ui/Icon.tsx";
import MinicartTotalInstallments from "../../islands/MinicartTotalInstallments.tsx";
import { Product } from "apps/commerce/types.ts";
import { useScript } from "@deco/deco/hooks";
import type { SectionProps } from "@deco/deco";
import ProductCard from "../product/ProductCard.tsx";
export interface Minicart {
  /** Cart from the ecommerce platform */
  platformCart: Record<string, unknown>;
  recommendations: Product[];
  /** Cart from storefront. This can be changed at your will */
  storefront: {
    items: Item[];
    total: number;
    subtotal: number;
    discounts: number;
    coupon?: string;
    locale: string;
    currency: string;
    shipping: number | null;
    enableCoupon?: boolean;
    freeShippingTarget: number;
    checkoutHref: string;
  };
}
const onLoad = (formID: string) => {
  const form = document.getElementById(formID) as HTMLFormElement;
  window.STOREFRONT.CART.dispatch(form);
  // view_cart event
  if (typeof IntersectionObserver !== "undefined") {
    new IntersectionObserver((items, observer) => {
      for (const item of items) {
        if (item.isIntersecting && item.target === form) {
          window.DECO.events.dispatch({
            name: "view_cart",
            params: window.STOREFRONT.CART.getCart(),
          });
          observer?.unobserve(item.target);
        }
      }
    }).observe(form);
  }
  // Disable form interactivity while cart is being submitted
  document.body.addEventListener("htmx:before-send", // deno-lint-ignore no-explicit-any
  ({ detail: { elt } }: any) => {
    if (elt !== form) {
      return;
    }
    // Disable addToCart button interactivity
    // document.querySelectorAll("div[data-cart-item]").forEach((container) => {
    //   container?.querySelectorAll("button")
    //     .forEach((node) => node.disabled = true);
    //   container?.querySelectorAll("input")
    //     .forEach((node) => node.disabled = true);
    // });
  });
};
const sendBeginCheckoutEvent = () => {
  window.DECO.events.dispatch({
    name: "being_checkout",
    params: window.STOREFRONT.CART.getCart(),
  });
};
export const action = async (_props: unknown, req: Request, ctx: AppContext) =>
  req.method === "PATCH"
    ? ({ cart: await ctx.invoke("site/loaders/minicart.ts") }) // error fallback
    : ({ cart: await ctx.invoke("site/actions/minicart/submit.ts") });
export function ErrorFallback() {
  return (
    <div class="flex flex-col flex-grow justify-center items-center overflow-hidden w-full gap-2">
      <div class="flex flex-col gap-1 p-6 justify-center items-center">
        <span class="font-semibold">
          Error while updating cart
        </span>
        <span class="text-sm text-center">
          Click in the button below to retry or refresh the page
        </span>
      </div>

      <button
        class="btn btn-primary"
        hx-patch={useComponent(import.meta.url)}
        hx-swap="outerHTML"
        hx-target="closest div"
      >
        Retry
      </button>
    </div>
  );
}
export const loader = async (props: {
  cart: Minicart;
}, _req: Request, _ctx: AppContext) => {
  console.log("loader aqui");
  return props;
}
export let itemCount = 0;
export default function Cart(
  {
    cart: {
      platformCart,
      recommendations,
      storefront: {
        items,
        total,
        subtotal,
        coupon,
        discounts,
        locale,
        shipping,
        currency,
        enableCoupon = true,
        freeShippingTarget,
        checkoutHref,
      },
    },
  }: SectionProps<typeof loader>,
) {
  const count = items.length;
  itemCount = count;
  console.log("recommendations", recommendations);
  return (
    <>
      <div class="grid grid-cols-2">
        <div class="bg-white col-span-1 rounded-l-2xl">
          <div class="py-5 text-2xl text-center">
            Você também pode <b>[Gostar]</b>
          </div>
          <div class="flex flex-col gap-4">
            {recommendations.length > 0 && (
              <>
                {recommendations.map((item: Product, index: number) => (
                  <ProductCard
                    key={index}
                    product={item}
                  />
                ))}
              </>
            )}
          </div>
        </div>
        <div>
          <form
            class="contents col-span-1"
            id={MINICART_FORM_ID}
            hx-sync="this:replace"
            hx-trigger="submit, change delay:300ms"
            hx-target="this"
            hx-indicator="this"
            hx-disabled-elt="this"
            hx-post={useComponent(import.meta.url)}
            hx-swap="outerHTML"
          >
            {/* Button to submit the form */}
            <button hidden autofocus />

            {/* Add to cart controllers */}
            <input name="add-to-cart" type="hidden" />
            <button hidden name="action" value="add-to-cart" />

            {/* This contains the STOREFRONT cart. */}
            <input
              type="hidden"
              name="storefront-cart"
              value={encodeURIComponent(
                JSON.stringify({ coupon, currency, value: total, items }),
              )}
            />

            {/* This contains the platformCart cart from the commerce platform. Integrations usually use this value, like GTM, pixels etc */}
            <input
              type="hidden"
              name="platform-cart"
              value={encodeURIComponent(JSON.stringify(platformCart))}
            />

            <div
              class={clx(
                "flex flex-col flex-grow items-center overflow-hidden w-full",
                "[.htmx-request_&]:pointer-events-none [.htmx-request_&]:opacity-60 [.htmx-request_&]:cursor-wait transition-opacity duration-300",
              )}
            >
              {/* Cart header */}
              <div class="bg-[#123ADD] flex justify-between text-white w-full gap-[5px] py-[13px] px-[35px] h-[58px] items-center">
                <div class="flex gap-[5px]">
                  <p class="font-semibold text-base">Meu carrinho</p>
                  {count === 0 ? null : (
                    <p>
                      [{count} {items.length === 0
                        ? ""
                        : items.length === 1
                        ? "Produto"
                        : "Produtos"}]
                    </p>
                  )}
                </div>
                <div>
                  <label class="cursor-pointer" for={MINICART_DRAWER_ID}>
                    <Icon id="close-white" />
                  </label>
                </div>
              </div>
              {count === 0
                ? (
                  <div class="flex flex-col m-auto gap-5">
                    <div class="flex justify-center">
                      <Icon id="bag-blue" />
                    </div>
                    <span class="font-semibold text-base text-center">
                      Seu carrinho está vazio!
                    </span>
                    <p class="text-sm max-w-[184px] m-auto flex text-center leading-[21px]">
                      Você ainda não possuí itens no seu carrinho.
                    </p>
                    <label
                      for={MINICART_DRAWER_ID}
                      class="bg-[#1BAE32] py-[15px] w-full rounded-full text-white px-4 cursor-pointer"
                    >
                      Clique aqui e <b>veja os produtos</b> {">"}
                    </label>
                  </div>
                )
                : (
                  <>
                    <ul
                      role="list"
                      class="mt-[10px] px-2 flex-grow overflow-y-auto flex flex-col gap-6 w-full max-h-[calc(100vh-58px-304px)]"
                    >
                      {items.map((item, index) => (
                        <li>
                          <CartItem
                            item={item}
                            index={index}
                            locale={locale}
                            currency={currency}
                          />
                        </li>
                      ))}
                    </ul>

                    {/* Cart Footer */}
                    <footer class="w-full bg-white">
                      {/* Subtotal */}
                      <div class="flex flex-col">
                        {discounts > 0 && (
                          <div class="flex justify-between items-center px-4">
                            <span class="text-sm">Descontos</span>
                            <span class="text-sm">
                              {formatPrice(discounts, currency, locale)}
                            </span>
                          </div>
                        )}
                        {shipping !== null && (
                          <div class="flex justify-between items-center pb-[10px] pt-5 px-4">
                            <span class="text-[#A8A8A8] text-base flex gap-5">
                              <Icon id="delivery-box" />
                              Frete
                            </span>

                            <span class="text-[#A8A8A8] text-base">
                              {/* @ts-ignore shipping is valid */}
                              {shipping === 0
                                ? "Grátis"
                                : formatPrice(shipping, currency, locale)}
                            </span>
                          </div>
                        )}

                        {enableCoupon && <Coupon coupon={coupon} />}
                      </div>

                      {/* Total */}
                      <div class=" flex flex-col justify-end items-end gap-2 mx-4 pb-1">
                        <div class="flex justify-between items-center w-full">
                          <span class="text-base">Total</span>
                          <output
                            form={MINICART_FORM_ID}
                            class="font-semibold text-xl"
                          >
                            {formatPrice(total, currency, locale)}
                          </output>
                        </div>
                      </div>
                      <MinicartTotalInstallments items={items} />
                      <hr class="max-w-[90%] m-auto" />
                      <div class="p-4">
                        <a
                          class="bg-[#1BAE32] w-full no-animation flex items-center justify-center py-[10px] w-full rounded-full"
                          href={checkoutHref}
                          hx-on:click={useScript(sendBeginCheckoutEvent)}
                        >
                          <span class="[.htmx-request_&]:hidden text-white text-xl font-semibold">
                            Finalizar Compra
                          </span>

                          <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
                        </a>
                        <label
                          for={MINICART_DRAWER_ID}
                          class="flex w-full justify-center mt-5 text-[#123ADD] text-base"
                        >
                          OU CONTINUAR COMPRANDO
                        </label>
                      </div>
                    </footer>
                  </>
                )}
            </div>
          </form>
        </div>
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(onLoad, MINICART_FORM_ID),
        }}
      />
    </>
  );
}
