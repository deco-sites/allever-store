import { useScript } from "@deco/deco/hooks";
import type { AppContext } from "../../../apps/site.ts";
import type { ComponentProps } from "../../../sections/Component.tsx";

export interface Props {
  productID: string;
  seller: string;
}

export async function action(props: Props, req: Request, ctx: AppContext) {
  const {
    productID,
    seller,
  } = props;

  const form = await req.formData();
  const selectedOption = `${form.get("subscription-option") ?? ""}`;

  if (selectedOption) {
    const orderItems = [{
      id: productID,
      seller,
      quantity: 1,
    }];

    // deno-lint-ignore no-explicit-any
    await (ctx as any).invoke("vtex/actions/cart/addItems.ts", { 
      orderItems 
    });

    const SUBSCRIPTION_KEY = "vtex.subscription.allever";
    const SUBSCRIPTION_PLAN = selectedOption;

    const SUBSCRIPTION_VALUE = {
      "vtex.subscription.key.frequency": SUBSCRIPTION_PLAN,
    };

    // deno-lint-ignore no-explicit-any
    await (ctx as any).invoke("vtex/actions/cart/updateItemAttachment.ts", {
      index: 0,
      content: SUBSCRIPTION_VALUE,
      attachment: SUBSCRIPTION_KEY,
      noSplitItem: true,
    });

    return {
      result: "OK",
    };
  }

  return {
    result: null,
  };
}

export default function Result(_props: ComponentProps<typeof action>) {
  return (
    <script
      type="text/javascript" 
      defer
      dangerouslySetInnerHTML={{
        __html: useScript(() => {
          setTimeout(() => {
            const button = document?.querySelector<HTMLButtonElement>(
              `#minicart-form #teste-sub`,
            );
            button?.click();
            // @ts-ignore showModal exists on DaisyUI
            document.querySelector("#modal_subscription > form > button")?.click();
            // @ts-ignore click is correct
            document.querySelector("label[for=minicart-drawer]")?.click();
          }, 500);
        })
      }}
    />
  );
}
