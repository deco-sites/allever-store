import type {
  AggregateOffer,
  UnitPriceSpecification,
} from "apps/commerce/types.ts";

const bestInstallment = (
  acc: UnitPriceSpecification | null,
  curr: UnitPriceSpecification,
) => {
  if (curr.priceComponentType !== "https://schema.org/Installment") {
    return acc;
  }

  if (curr.name === "Pix") {
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
  const offer =
    aggregateOffer?.offers.find((o) =>
      o.availability === "https://schema.org/InStock"
    ) || aggregateOffer?.offers[0];
  const listPrice = offer?.priceSpecification.find((spec) =>
    spec.priceType === "https://schema.org/ListPrice"
  );
  const price = offer?.priceSpecification.find((spec) =>
    spec.priceType === "https://schema.org/SalePrice"
  );

  const availability = offer?.availability;
  const installment = offer?.priceSpecification.reduce(bestInstallment, null);
  const pix = offer?.priceSpecification.find((spec: UnitPriceSpecification) => {
    return spec.name === "Pix";
  })?.price || 0;
  const inventory = offer?.inventoryLevel?.value;
  const seller = offer?.seller;
  const sellerName = offer?.sellerName;
  const teasers = offer?.teasers || [];

  return {
    sellerName,
    inventory,
    price: price?.price,
    listPrice: listPrice?.price,
    availability,
    seller,
    pix,
    installment,
    installments: installment && price
      ? installmentToString(installment, price?.price)
      : null,
    teasers
  };
};
