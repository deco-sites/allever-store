import Radio from "../ui/Radio.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useRef, useState } from "preact/hooks";
import type { Product } from "apps/commerce/types.ts";

export interface Props {
  product: Product
}

export default function ProductSubscription({
  product
}: Props) {

  if (!IS_BROWSER) return null;

  const modalRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

	const changeHandler = (e: Event) => {
		const target = e.target as HTMLInputElement
		// @ts-ignore all inputs are checked
		if (target.checked) {
			setSelected(target.value);
		}
	}

  const submitHandler = (e: Event) => {
    e.preventDefault();
  }

  if (!product) return null;

  console.log(product);

  const {
    additionalProperty
  } = product;

  const hasProductSubscription = additionalProperty?.find(
    (prop) => prop.name === "vtex.subscription.allever"
  );

  console.log("hasProductSubscription", hasProductSubscription);

  if (!hasProductSubscription) return null;

  const value = JSON.parse(hasProductSubscription.value || "[]")[0];

  console.log("value", value);

  return (
    <>
      <button class="btn btn-primary" onClick={() => {
        modalRef.current?.showModal();
      }}>
        Faça sua assinatura
      </button>
      <dialog id="product_subscription" class="modal" ref={modalRef}>
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
          <form
            class="flex flex-col gap-y-6 p-3 sm:p-6 overflow-y-auto h-full"
            onSubmit={submitHandler}
          >
            <div>
              <fieldset>
                <div className="grid grid-cols-2 gap-4">
                  <Radio
                    selected={selected}
                    changeHandler={changeHandler}
                    name="subscription_option"
                    value="1M"
                    text="A cada <b>1 mês</b>"
                  />
                  <Radio
                    selected={selected}
                    changeHandler={changeHandler}
                    name="subscription_option"
                    value="2M"
                    text="A cada <b>2 meses</b>"
                  />
                  <Radio
                    selected={selected}
                    changeHandler={changeHandler}
                    name="subscription_option"
                    value="3M"
                    text="A cada <b>3 meses</b>"
                  />
                  <Radio
                    selected={selected}
                    changeHandler={changeHandler}
                    name="subscription_option"
                    value="6M"
                    text="A cada <b>6 meses</b>"
                  />
                </div>
              </fieldset>
            </div>
          </form>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}