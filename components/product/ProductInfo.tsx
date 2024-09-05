import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import ShippingSimulationForm from "../shipping/Form.tsx";
import WishlistButton from "../wishlist/WishlistButton.tsx";
import AddToCartButton from "./AddToCartButton.tsx";
import OutOfStock from "./OutOfStock.tsx";
import ProductSelector from "./ProductVariantSelector.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import PaymentMethods from "../../islands/PaymentsMethods.tsx";
import ProductStars from "../../islands/ProductStars.tsx";
import GallerySlider from "./Gallery.tsx";

import { useDevice } from "deco/hooks/useDevice.ts";

interface Props {
  page: ProductDetailsPage | null;
}

function ProductInfo({ page }: Props) {
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const { productID, offers, isVariantOf, additionalProperty } = product;
  const description = product.description || isVariantOf?.description;
  const title = isVariantOf?.name ?? product.name;

  const productGroupID = isVariantOf?.productGroupID ?? "";
  const {
    price = 0,
    listPrice,
    seller = "1",
    inventory = 0,
    installment,
    installments,
    availability,
  } = useOffer(offers);

  const hasPromotion = additionalProperty?.some(
    (prop) => prop.value === "Promoção",
  );

  const hasNews = additionalProperty?.some(
    (prop) => prop.value === "Novidades",
  );

  const percent = listPrice && price
    ? Math.round(((listPrice - price) / listPrice) * 100)
    : 0;

  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const item = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });
  const hasFlag = hasPromotion || hasNews;

  const viewItemEvent = useSendEvent({
    on: "view",
    event: {
      name: "view_item",
      params: {
        item_list_id: "product",
        item_list_name: "Product",
        items: [item],
      },
    },
  });

  const device = useDevice();

  return (
    <div {...viewItemEvent} class="flex flex-col" id={id}>
      <>
        {device === "mobile" ? (
            <>
              <div class="py-[10px]">
                <Breadcrumb
                  itemListElement={page.breadcrumbList.itemListElement}
                />
              </div>
              <div class="text-base font-semibold mt-[10px] mb-4">
                {/* Product Name */}
                <h1 class="mb-0"> 
                  {title}
                </h1>
              </div>
              <div class={`flex justify-between`}>
                <p class="text-[#A8A8A8] m-0 text-xs pb-2">
                  Cod: {productID} | {seller}
                </p>
                <WishlistButton item={item} pdp={true} />
              </div>
              <>
                {hasFlag &&
                  (
                    <div class="flex gap-[5px] mt-2 mb-4 w-[50%]">
                      {hasPromotion &&
                        (
                          <p class="text-xs font-semibold text-white uppercase bg-[#F22E2E] text-center text-white px-2 py-1 rounded-[6px] w-full">
                            Promoção
                          </p>
                        )}
                    </div>
                  )}
              </>
              <div>
                <GallerySlider page={page} />
              </div>
              <div class="flex justify-between my-4">
                <div class="w-full max-w-[151px]">
                  {hasNews &&
                    (
                      <p class="text-xs font-semibold text-white uppercase bg-[#FFA318] text-center text-white px-2 py-1 rounded-[6px]">
                        Novidade
                      </p>
                    )}
                </div>

                <ProductStars
                  storeId="121576"
                  productId={productGroupID ?? ""}
                />
              </div>
              <div>
                {availability === "https://schema.org/InStock" &&
                  (
                    <div class="flex gap-3 items-center">
                      <span class="line-through text-base font-semibold text-[#A8A8A8] leading-[24px]">
                        {formatPrice(listPrice, offers?.priceCurrency)}
                      </span>
                      <span class="text-[20px] font-semibold text-[#000] leading-[24px]">
                        {formatPrice(price, offers?.priceCurrency)}
                      </span>
                    </div>
                  )}
                {availability === "https://schema.org/InStock" &&
                  (
                    <>
                      <div class="flex flex-col items-start">
                        <p class="text-[40px] font-semibold text-[#123ADD] leading-[60px]">
                          {formatPrice(installment?.price)}
                          <span class="text-[#123ADD] font-normal text-[30px] ml-2 leading-[30px]">
                            no PIX
                          </span>
                        </p>
                        {/* Price tag */}
                      </div>
                      <div
                        class={clx(
                          "text-xs font-semibold text-white uppercase bg-[#123ADD] text-center text-white px-2 py-1 rounded-[6px]",
                          percent < 1 && "opacity-0",
                          "w-fit",
                        )}
                      >
                        {percent} % off
                      </div>
                    </>
                  )}
                {availability === "https://schema.org/InStock" &&
                  (
                    <div class="my-2">
                      <p class="text-[#000] text-base">
                        ou {installment?.billingDuration}x de {formatPrice(
                          installment?.billingIncrement,
                          offers!.priceCurrency!,
                        )}
                      </p>
                    </div>
                  )}
              </div>
              {availability === "https://schema.org/InStock" &&
                (
                  <div>
                    <PaymentMethods
                      installment={installment?.price.toString() || ""}
                    />
                  </div>
                )}
              <div class="my-3">
                <ProductSelector product={product} />
              </div>

              {/* Sku Selector */}
              {inventory > 0 && inventory <= 9 && (
                <div class="mb-3">
                  <p className="text-[24px] font-normal text-black leading-[28.8px]">
                    Restam só{" "}
                    <span className="font-bold text-[#123ADD]">
                      {inventory} unidade{inventory > 1 ? "s" : ""}
                    </span>
                  </p>
                </div>
              )}
              
              {availability === "https://schema.org/InStock" &&
                (
                  <div class="mb-3">
                    <AddToCartButton
                      item={item}
                      seller={seller}
                      product={product}
                      class="bg-[#1BAE32] text-[20px] flex justify-center items-center gap-2 py-[10px] rounded-[30px] no-animation text-white font-semibold hover:bg-[#1bae3299] ease-in"
                      disabled={false}
                    />
                  </div>
                )}
              {availability != "https://schema.org/InStock" &&
                (
                  <div>
                    <OutOfStock productID={productID} />
                  </div>
                )}
        
              {availability === "https://schema.org/InStock" &&
                (
                  <div class="mb-3">
                    <p class="text-xs font-normal text-black leading-[14.4px]">
                      Vendido e entregue por:{" "}
                      <span class="font-bold capitalize">{seller}</span>
                    </p>
                  </div>
                )}
              {availability == "https://schema.org/InStock" &&
                (
                  <div>
                    {/* Shipping Simulation */}
                    <div class="lg:max-w-[338px]">
                      <ShippingSimulationForm
                        items={[{
                          id: Number(product.sku),
                          quantity: 1,
                          seller: seller,
                        }]}
                      />
                    </div>
                  </div>
                )}
            </>
          ) : null
            // <>
            //   <div class="flex flex-col pt-[24px]">
            //     <div class="mb-[24px]">
            //       <Breadcrumb
            //         itemListElement={page.breadcrumbList.itemListElement}
            //       />
            //     </div>
            //     <div class="flex flex-row items-center gap-5">
            //       <div class="flex flex-col gap-[24px]">
            //         <div class="fluid-text max-h-[115px] overflow-hidden">
            //           {/* Product Name */}
            //           <h1>
            //             {title}
            //           </h1>
            //         </div>

            //         <div class={`${!hasFlag && "mb-6"} fluid-text`}>
            //           <p class="text-[#A8A8A8]">
            //             Cod: {productID} | {seller}
            //           </p>
            //         </div>
            //         {availability === "https://schema.org/InStock" &&
            //           (
            //             <>
            //               {hasFlag &&
            //                 (
            //                   <div class="flex gap-[5px] mb-6">
            //                     {hasPromotion &&
            //                       (
            //                         <p class="text-xs font-semibold text-white uppercase bg-[#F22E2E] text-center text-white px-2 py-1 rounded-[6px]">
            //                           Promoção
            //                         </p>
            //                       )}
            //                     {hasNews &&
            //                       (
            //                         <p class="text-xs font-semibold text-white uppercase bg-[#FFA318] text-center text-white px-2 py-1 rounded-[6px]">
            //                           Novidade
            //                         </p>
            //                       )}
            //                   </div>
            //                 )}
            //             </>
            //           )}
            //       </div>
            //       <div class="flex space-between w-full lg:max-w-[226px]">
            //         <div>
            //           <ProductStars
            //             storeId="121576"
            //             productId={productGroupID ?? ""}
            //           />
            //         </div>

            //         <div>
            //           <WishlistButton item={item} pdp={true} />
            //           {
            //             /* {availability === "https://schema.org/InStock" && } */
            //           }
            //         </div>
            //       </div>
            //     </div>
            //   </div>

            //   <hr />
            //   <div class="flex flex-col gap-[14px] py-[14px]">
            //     {availability === "https://schema.org/InStock" &&
            //       (
            //         <div class="flex gap-3 items-center">
            //           <span class="line-through text-base font-semibold text-[#A8A8A8] leading-[24px]">
            //             {formatPrice(listPrice, offers?.priceCurrency)}
            //           </span>
            //           <span class="text-[20px] font-semibold text-[#000] leading-[24px]">
            //             {formatPrice(price, offers?.priceCurrency)}
            //           </span>
            //         </div>
            //       )}
            //     {availability === "https://schema.org/InStock" &&
            //       (
            //         <div class="flex items-center">
            //           <p class="text-[40px] font-semibold text-[#123ADD] leading-[60px]">
            //             {formatPrice(installment?.price)}
            //             <span class="text-[#123ADD] font-normal text-[30px] ml-2 leading-[30px]">
            //               no PIX
            //             </span>
            //           </p>
            //           {/* Price tag */}
            //           <span
            //             class={clx(
            //               "text-xs font-semibold text-white uppercase bg-[#123ADD] text-center text-white px-2 py-1 rounded-[6px] ml-4",
            //               percent < 1 && "opacity-0",
            //               "w-fit",
            //             )}
            //           >
            //             {percent} % off
            //           </span>
            //         </div>
            //       )}
            //     {availability === "https://schema.org/InStock" &&
            //       (
            //         <div class="fluid-text">
            //           <p class="text-[#000]">
            //             ou {installment?.billingDuration}x de {formatPrice(
            //               installment?.billingIncrement,
            //               offers!.priceCurrency!,
            //             )}
            //           </p>
            //         </div>
            //       )}
            //     {availability === "https://schema.org/InStock" &&
            //       (
            //         <div>
            //           <PaymentMethods
            //             installment={installment?.price.toString() || ""}
            //           />
            //         </div>
            //       )}
            //     <div class="">
            //       <ProductSelector product={product} />
            //     </div>

            //     {/* Sku Selector */}
            //     {availability === "https://schema.org/InStock" &&
            //       (
            //         <div>
            //           <AddToCartButton
            //             item={item}
            //             seller={seller}
            //             product={product}
            //             class="bg-[#1BAE32] text-[20px] flex justify-center items-center gap-2 py-[10px] rounded-[30px] no-animation text-white font-semibold hover:bg-[#1bae3299] ease-in"
            //             disabled={false}
            //           />
            //         </div>
            //       )}
            //     {availability != "https://schema.org/InStock" &&
            //       (
            //         <div>
            //           <OutOfStock productID={productID} />
            //         </div>
            //       )}
            //     {inventory > 0 && inventory <= 9 && (
            //       <div>
            //         <p className="text-[24px] font-normal text-black leading-[28.8px]">
            //           Restam só{" "}
            //           <span className="font-bold text-[#123ADD]">
            //             {inventory} unidade{inventory > 1 ? "s" : ""}
            //           </span>
            //         </p>
            //       </div>
            //     )}
            //     {availability === "https://schema.org/InStock" &&
            //       (
            //         <div class="">
            //           <p class="text-xs font-normal text-black leading-[14.4px]">
            //             Vendido e entregue por:{" "}
            //             <span class="font-bold capitalize">{seller}</span>
            //           </p>
            //         </div>
            //       )}
            //     {availability == "https://schema.org/InStock" &&
            //       (
            //         <>
            //           {/* Shipping Simulation */}
            //           <div class="lg:max-w-[338px]">
            //             <ShippingSimulationForm
            //               items={[{
            //                 id: Number(product.sku),
            //                 quantity: 1,
            //                 seller: seller,
            //               }]}
            //             />
            //           </div>
            //         </>
            //       )}
            //   </div>
            // </>
          // )
          }
      </>
    </div>
  );
}

export default ProductInfo;
