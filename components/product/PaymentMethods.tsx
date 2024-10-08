import Icon from "../ui/Icon.tsx";
import { formatPrice } from "../../sdk/format.ts";
import type {
  AggregateOffer,
  UnitPriceSpecification,
} from "apps/commerce/types.ts";
import { useScript, useScriptAsDataURI } from "@deco/deco/hooks";
interface PaymentMethodsProps {
  offers?: AggregateOffer;
  installment: string;
}
function PaymentMethods({ offers, installment }: PaymentMethodsProps) {
  const offer =
    offers?.offers.find((o) =>
      o.availability === "https://schema.org/InStock"
    ) || offers?.offers[0];
  const maxIntallments = offer?.priceSpecification.reduce(
    (acc: UnitPriceSpecification | null, curr: UnitPriceSpecification) => {
      if (
        curr.priceComponentType !== "https://schema.org/Installment" ||
        curr.name === "Pix"
      ) {
        return acc;
      }
      if (!acc) {
        return curr;
      }
      if (
        acc.billingDuration && curr.billingDuration &&
        acc.billingDuration < curr.billingDuration
      ) {
        return curr;
      }
      return acc;
    },
    null,
  );
  const pixInstallment = installment && parseFloat(installment);
  return (
    <>
      <button
        // @ts-ignore showModal exists on DaisyUI
        hx-on:click={useScript(() =>
          document.getElementById("payment-methods")?.showModal()
        )}
        class="underline text-signature-blue text-left"
      >
        Ver formas de pagamento
      </button>
      <dialog id="payment-methods" class="modal">
        <div class="modal-box bg-white">
          <h3 class="font-semibold text-base text-black mb-4">
            Métodos de <span class="text-signature-blue">[pagamento]</span>
          </h3>
          <div className="flex">
            <div class="flex flex-col gap-8">
              <button
                id="pix"
                class="flex flex-col items-center gap-2 text-sm font-semibold text-center text-black max-w-24"
                hx-on:click={useScript(() => {
                  const content = document.querySelector("div#pix");
                  const otherContent = document.querySelector(
                    "div#installments",
                  );
                  content?.classList.add("flex");
                  content?.classList.remove("hidden");
                  otherContent?.classList.add("hidden");
                  otherContent?.classList.remove("flex");
                  const pixButton = document.querySelector("button#pix > div");
                  const installmentsButton = document.querySelector(
                    "button#installments > div",
                  );
                  pixButton?.classList.add("border-signature-blue");
                  pixButton?.classList.remove("border-dark-gray");
                  installmentsButton?.classList.add("border-dark-gray");
                  installmentsButton?.classList.remove("border-signature-blue");
                })}
              >
                <div class="w-20 h-20 flex items-center justify-center border-2 border-signature-blue rounded-full">
                  <Icon id="pix" width={44} height={48} />
                </div>
                Pix
              </button>
              <button
                id="installments"
                class="flex flex-col items-center gap-2 text-sm font-semibold text-center text-black max-w-24"
                hx-on:click={useScript(() => {
                  const content = document.querySelector("div#pix");
                  const otherContent = document.querySelector(
                    "div#installments",
                  );
                  content?.classList.add("hidden");
                  content?.classList.remove("flex");
                  otherContent?.classList.add("flex");
                  otherContent?.classList.remove("hidden");
                  const pixButton = document.querySelector("button#pix > div");
                  const installmentsButton = document.querySelector(
                    "button#installments > div",
                  );
                  pixButton?.classList.add("border-dark-gray");
                  pixButton?.classList.remove("border-signature-blue");
                  installmentsButton?.classList.add("border-signature-blue");
                  installmentsButton?.classList.remove("border-dark-gray");
                })}
              >
                <div class="w-20 h-20 flex items-center justify-center border-2 border-dark-gray rounded-full">
                  <Icon id="credit-card" width={45} height={35} />
                </div>
                Cartão de Crédito
              </button>
            </div>
            <div class="grow pl-4 lg:pl-6 ml-4 lg:ml-6 border-l border-dark-gray">
              <div id="pix" class="flex flex-col gap-4">
                <p class="text-2xl text-[#123ADD] font-semibold flex items-center">
                  {!!pixInstallment && formatPrice(pixInstallment)}
                  <span class="text-normal ml-2">no PIX</span>
                </p>
                <p class="text-xs text-gray-600 font-semibold max-w-xs">
                  Para pagamento via PIX será gerada uma chave e um QR Code ao
                  finalizar o processo de compra.
                </p>
                <p class="text-xs text-gray-600 font-semibold max-w-xs">
                  - O prazo de validade da chave é de X minutos. Em caso de não
                  pagamento o pedido será cancelado.
                </p>
                <p class="text-xs text-gray-600 font-semibold max-w-xs">
                  - O prazo de entrega começa a contar após a confirmação do
                  pagamento.
                </p>
              </div>
              <div id="installments" class="hidden">
                <table class="table table-xs w-full">
                  <thead>
                    <tr>
                      <th class="text-black font-normal">Parcelamento</th>
                      <th class="text-black font-normal text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    {offer?.priceSpecification.map(
                      (priceSpecification, index) => {
                        if (maxIntallments?.name === priceSpecification.name) {
                          const { billingDuration, billingIncrement } =
                            priceSpecification;
                          return (
                            <tr
                              key={index}
                              class="odd:bg-light-gray even:bg-transparent"
                            >
                              <td>{billingDuration}x</td>
                              <td class="text-right">
                                {formatPrice(billingIncrement)}
                              </td>
                            </tr>
                          );
                        }
                      },
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
export default PaymentMethods;
