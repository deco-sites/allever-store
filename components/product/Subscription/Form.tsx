import { useId } from "../../../sdk/useId.ts";
import { useOffer } from "../../../sdk/useOffer.ts";
import { useComponent } from "../../../sections/Component.tsx";
import type { Product, AnalyticsItem } from "apps/commerce/types.ts";
import { useScript } from "@deco/deco/hooks";
export interface Props {
    item: AnalyticsItem;
    seller: string;
    product: Product;
}
export default function ProductSubscription({ product }: Props) {
    const slot = useId();
    if (!product)
        return null;
    const { offers, productID, additionalProperty, } = product;
    const { seller = '1' } = useOffer(offers) || {};
    const hasProductSubscription = additionalProperty?.find((prop) => prop.name === "vtex.subscription.allever");
    if (!hasProductSubscription)
        return null;
    const value = JSON.parse(hasProductSubscription.value || "[]")[0];
    return (<>
      <button class="btn btn-primary" hx-on:click={useScript(() => {
            // @ts-ignore showModal exists on DaisyUI
            document.getElementById("product_subscription")?.showModal();
        })}>
        Faça sua assinatura
      </button>
      <dialog id="product_subscription" class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h2>ASSINE E COMPRE COM ATÉ <b>[10% OFF]</b></h2>
          <div>
            <h3>Por que assinar?</h3>
            <div>10% OFF no site em todas as compras com assinatura</div>
            <div>Edite os produtos e as datas, pause ou cancele a qualquer momento!</div>
            <div>Sem taxas de Adesão, Mensalidade ou Cancelamento</div>
          </div>
          <form id="subscription-form" class="flex flex-col gap-y-6 p-3 sm:p-6 overflow-y-auto h-full" hx-swap="innerHTML" hx-sync="this:replace" hx-post={useComponent(import.meta.resolve("./Result.tsx"), {
            productID,
            seller,
        })} hx-target={`#${slot}`}>
            <div>
              <fieldset>
                <div className="grid grid-cols-2 gap-4">
                  {value.DomainValues?.split(",").map((domainValue: string, index: number) => (<label className="label cursor-pointer">
                      <span className="label-text">{domainValue.trim()}</span>
                      <input type="radio" name="subscription-option" class="radio checked:bg-blue-500" value={domainValue.trim()} defaultChecked={index === 0}/>
                    </label>))}
                </div>
              </fieldset>
              <button type="submit" class="btn btn-primary">
                <span class="[.htmx-request_&]:hidden inline text-white">
                  Assinar
                </span>
                <span class="[.htmx-request_&]:inline hidden loading loading-spinner"/>
              </button>
            </div>
          </form>
          <div id={slot}/>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>);
}
