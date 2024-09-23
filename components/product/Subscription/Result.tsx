import { useCart } from "apps/vtex/hooks/useCart.ts";

import type { Product } from "apps/commerce/types.ts";
import type { ComponentProps } from "../../../sections/Component.tsx";

export interface Props {
  productID: string;
  seller: string;
}

export async function action(props: Props, req: Request) {
  const { 
    productID,
    seller,  
  } = props;

  console.log("productID", productID, "seller", seller);

  const form = await req.formData();
  const selectedOption = `${form.get("subscription-option") ?? ""}`;
  const { addItems, addItemAttachment } = useCart();

  if (selectedOption) {
    const orderItems = [{
      id: productID,
      seller,
      quantity: 1,
    }];

    await addItems({ orderItems });

    const SUBSCRIPTION_KEY = "vtex.subscription.allever";
    const SUBSCRIPTION_PLAN = selectedOption;
    const currentDay = Math.min(new Date().getDate(), 28);
    
    const SUBSCRIPTION_VALUE = {
      'vtex.subscription.key.frequency': SUBSCRIPTION_PLAN,
      'vtex.subscription.key.purchaseday': `${currentDay}`,
    }

    await addItemAttachment({
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

export default function Result({ result }: ComponentProps<typeof action>) {
  if (!result) {
    return <div>Erro</div>;
  }
  return <div>OK</div>;
}