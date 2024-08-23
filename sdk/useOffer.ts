import type {
  AggregateOffer,
  UnitPriceSpecification,
} from "apps/commerce/types.ts";

const bestInstallment = (
  acc: UnitPriceSpecification | null,
  curr: UnitPriceSpecification,
) => {
  console.log("curr", curr);

  if (curr.priceComponentType !== "https://schema.org/Installment" || curr.name === "Pix") {
    return acc;
  }

  if (!acc) {
    return curr;
  }

  if (acc.price > curr.price) {
    return curr;
  }

  if (acc.price < curr.price) {
    return acc;
  }

  if (
    acc.billingDuration && curr.billingDuration &&
    acc.billingDuration < curr.billingDuration
  ) {
    return curr;
  }

  return acc;
};

const installmentToString = (
  installment: UnitPriceSpecification,
  sellingPrice: number,
) => {
  const { billingDuration, billingIncrement, price } = installment;

  if (!billingDuration || !billingIncrement) {
    return "";
  }

  const withTaxes = sellingPrice < price;

  return `${billingDuration}x de R$ ${billingIncrement} ${
    withTaxes ? "com juros" : "sem juros"
  }`;
};

export const useOffer = (aggregateOffer?: AggregateOffer) => {
  const offer = aggregateOffer?.offers.find((o) => 
    o.availability === "https://schema.org/InStock"
  ) || aggregateOffer?.offers[0];
  // console.log("offer", offer);

  const listPrice = offer?.priceSpecification.find((spec) =>
    spec.priceType === "https://schema.org/ListPrice"
  );

  const availability = offer?.availability;
  const installment = offer?.priceSpecification.reduce(bestInstallment, null);
  console.log("installment", installment);

  const seller = offer?.seller;
  const price = offer?.price;

  console.log("installmentToString", installmentToString(installment, price));

  return {
    price,
    listPrice: listPrice?.price,
    availability,
    seller,
    installment,
    installments: installment && price
      ? installmentToString(installment, price)
      : null,
  };
};
