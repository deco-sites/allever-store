import type { Product } from "apps/commerce/types.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useAddToCart } from "../../sdk/UseAddToCart.ts";
import ProductCard from "./ProductCard.tsx";
import { useCountBuyTogether } from "../../sdk/useCountBuyTogether.ts";
import { formatPrice } from "../../sdk/format.ts";
import AddToCartButton from "./AddToCartButton.tsx";

export interface Props {
  product: Product;
  buyTogether: Product[] | null;
}

function BuyTogether({ product, buyTogether }: Props) {
  const { count } = useCountBuyTogether();

  if (!buyTogether || buyTogether.length < 2) return <></>;

  const product1 = product;
  const product2 = buyTogether[count.value];
  const product3 = buyTogether[(count.value + 1) % buyTogether.length];

  const { price: price1, listPrice: listPrice1, seller: seller1 } = useOffer(
    product1.offers,
  );
  const { price: price2, listPrice: listPrice2, seller: seller2 } = useOffer(
    product2.offers,
  );
  const { price: price3, listPrice: listPrice3, seller: seller3 } = useOffer(
    product3.offers,
  );

  if (!seller1 || !seller2 || !seller3) return <></>;

  const addProduct = (
    prod: Product,
    price: number,
    listPrice: number,
    seller: string,
  ) => ({
    skuId: prod.productID,
    sellerId: seller,
    discount: listPrice ? listPrice - price : 0,
    price: price ?? 0,
    productGroupId: prod.isVariantOf?.productGroupID ?? "",
    name: prod.name ?? "",
    quantity: 1,
  });

  const items = [
    addProduct(product1, price1, listPrice1, seller1),
    addProduct(product2, price2, listPrice2, seller2),
    addProduct(product3, price3, listPrice3, seller3),
  ];

  // Props for AddToCartButton
  const props = useAddToCart({ items });

  const totalListPrice = (listPrice1 || 0) + (listPrice2 || 0) +
    (listPrice3 || 0);
  const totalPrice = (price1 || 0) + (price2 || 0) + (price3 || 0);

  return (
    <section class="py-6">
      <div class="container">
        <h3 class="lg:text-[1.75rem] leading-[2.1875rem] text-black font-semibold tracking-normal mb-6 text-left max-lg:text-2xl max-lg:leading-[1.875rem]">
          Compre junto
        </h3>
        <div class="flex gap-6 items-center">
          <div class="flex flex-1 gap-10">
            <div class="flex-1 flex flex-col max-w-[300px] w-full">
              <ProductCard product={product1} class="flex-1" />
            </div>
            <div class="flex items-center">
              <span class="bg-primary h-[0.125rem] w-[1.125rem]"></span>
              <span class="bg-primary h-[0.125rem] w-[1.125rem] absolute rotate-90">
              </span>
            </div>
            <div class="flex-1 flex flex-col max-w-[300px] w-full">
              <ProductCard product={product2} class="flex-1" />
            </div>
            <div class="flex items-center">
              <span class="bg-primary h-[0.125rem] w-[1.125rem]"></span>
              <span class="bg-primary h-[0.125rem] w-[1.125rem] absolute rotate-90">
              </span>
            </div>
            <div class="flex-1 flex flex-col max-w-[300px] w-full">
              <ProductCard product={product3} class="flex-1" />
            </div>
          </div>
          <div class="flex flex-col gap-2 py-2 max-w-[300px] w-full">
            <ins class="text-black text-base leading-[1.875rem] py-1 no-underline">
              Preço total:{" "}
              <span class="font-semibold text-[20px]">
                {formatPrice(totalPrice, product1.offers!.priceCurrency!)}
              </span>
            </ins>
            <div class="w-full">
              <AddToCartButton
                product={product1}
                seller={seller1}
                item={addProduct(product1, price1, listPrice1, seller1)}
                class="bg-primary border-transparent rounded font-quicksand text-base font-semibold h-12 leading-5 min-w-[15.5rem] max-w-[17.5rem] transition-all duration-300 w-full hover:bg-[#00224d] flex items-center justify-center text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BuyTogether;
