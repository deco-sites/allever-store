import { useCart } from "apps/vtex/hooks/useCart.ts";
import { useState, useEffect } from "preact/hooks";
import { formatPrice } from "../sdk/format.ts";

interface Item {
  item_id: string;
  quantity: number;
  affiliation: string;
}

interface Props {
  items: Item[];
}

interface Installment {
  count: number;
  total: number;
  value: number;
}

interface PaymentData {
  installments: Installment[];
}

const bestInstallment = (installments: Installment[]) => {
  const installment = installments.reduce((prev: Installment | null, curr: Installment) => {
    if (!prev) {
      return curr;
    }

    if (curr.value * curr.count > prev.value * prev.count) {
      return prev;
    }

    if (curr.count > prev.count) {
      return curr;
    }

    if (curr.count < prev.count) {
      return prev;
    }

    return curr;
  }, null);

  return installment;
}

const getInstallment = (paymentOptions: PaymentData[]) => {
  const bestInstallments: Installment[] = [];

  paymentOptions.forEach((paymentOption) => {
    const installment = bestInstallment(paymentOption.installments);
    if (!installment) return;
    bestInstallments.push(installment);
  });
  
  const installment = bestInstallment(bestInstallments);

  return installment;
}

export default function MinicartTotalInstallments({
  items
}: Props) {
  const { simulate } = useCart();
  const [ installment, setInstallment ] = useState<Installment | null>(null);

  useEffect(() => {
    const getData = async () => {
      const newItems = items.map(({ item_id, quantity, affiliation }) => {
        return {
          id: Number(item_id),
          quantity,
          seller: affiliation,
        }
      });

      const response = await simulate({
        items: newItems,
        postalCode: "12942500",
        country: "BRA",
        RnbBehavior: 0,
      });

      setInstallment(getInstallment(response.paymentData.installmentOptions));
    }

    getData();
  }, []);

  if (!installment) return null;

  return (
    <div class="text-right px-4 pb-5 text-xs text-black">
      ou até {installment.count}x de R$ {formatPrice(installment.value / 100)}
    </div>
  );
}