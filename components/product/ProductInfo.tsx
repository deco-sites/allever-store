import { ImageObject, ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import ShippingSimulationForm from "../shipping/Form.tsx";
import WishlistButton from "../wishlist/WishlistButton.tsx";
import AddToCartButton from "./AddToCartButton.tsx";
import OutOfStock from "./OutOfStock.tsx";
import ProductSelector from "./ProductVariantSelector.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import PaymentMethods from "./PaymentMethods.tsx";
import GallerySlider from "./Gallery.tsx";
import type { Device } from "apps/website/matchers/device.ts";
import ProductSubscription from "./Subscription/Form.tsx";
import { useScript } from "@deco/deco/hooks";
import SelectedVariantNames from "./SelectedVariantNames.tsx";
import Icon from "../ui/Icon.tsx";
import Price from "./Price.tsx";
import { ProductFlag } from "../../apps/site.ts";
import Flag from "../ui/Flag.tsx";

interface Props {
  page: ProductDetailsPage | null;
  device: Device;
  hiddenShipping: boolean;
  subscriptionTitle: string;
  subscriptionTopics: string[];
  productFlags: ProductFlag[];
}

const onLoad = () => {
  const handleScroll = () => {
    const fixedAddToCart = document.getElementById("fixed-add-to-cart");
    if (fixedAddToCart) {
      if (globalThis.scrollY > 450) {
        fixedAddToCart.classList.add("visible");
        fixedAddToCart.classList.remove("invisible");
      } else {
        fixedAddToCart.classList.add("invisible");
        fixedAddToCart.classList.remove("visible");
      }
    }
  };
  addEventListener("scroll", handleScroll);
};
function ShareModal() {
  return (
    <>
      <dialog id="share_product" class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div class="text-base font-semibold mb-5">Compartilhar</div>
          <div class="flex items-center gap-3">
            <a
              id="share-x"
              class="flex items-center justify-center w-14 h-14 rounded-full border border-primary"
              target="_blank"
            >
              <Icon id="x-twitter" width={27} height={25} />
            </a>
            <a
              id="share-facebook"
              class="flex items-center justify-center w-14 h-14 rounded-full border border-primary"
              target="_blank"
            >
              <Icon id="facebook" width={15} height={29} />
            </a>
            <a
              id="share-email"
              class="flex items-center justify-center w-14 h-14 rounded-full border border-primary"
              target="_blank"
            >
              <Icon id="mail" width={29} height={25} />
            </a>
            <a
              id="share-whatsapp"
              class="flex items-center justify-center w-14 h-14 rounded-full border border-primary"
              target="_blank"
            >
              <Icon id="whatsapp" width={27} height={28} />
            </a>
            <button
              id="share-copy"
              class="flex items-center justify-center w-14 h-14 rounded-full border border-primary"
            >
              <Icon id="copy-paste" width={27} height={28} />
            </button>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <script
        type="text/javascript"
        defer
        dangerouslySetInnerHTML={{
          __html: useScript(() => {
            const productURL = encodeURIComponent(window.location.href);
            const shareLinks = {
              x: `https://twitter.com/intent/tweet?url=${productURL}&text=Confira este produto!`, // Link para X
              facebook:
                `https://www.facebook.com/sharer/sharer.php?u=${productURL}`, // Link para Facebook
              email:
                `mailto:?subject=Confira este produto&body=Veja este produto interessante: ${productURL}`, // Link para E-mail
              whatsapp:
                `https://api.whatsapp.com/send?text=Confira este produto: ${productURL}`, // Link para WhatsApp
            };

            function copyToClipboard() {
              navigator.clipboard.writeText(window.location.href)
                .then(() => alert("Link copiado!"))
                .catch((err) => console.error("Erro ao copiar o link: ", err));
            }

            document.getElementById("share-x")?.setAttribute(
              "href",
              shareLinks.x,
            );
            document.getElementById("share-facebook")?.setAttribute(
              "href",
              shareLinks.facebook,
            );
            document.getElementById("share-email")?.setAttribute(
              "href",
              shareLinks.email,
            );
            document.getElementById("share-whatsapp")?.setAttribute(
              "href",
              shareLinks.whatsapp,
            );
            document.getElementById("share-copy")?.addEventListener(
              "click",
              copyToClipboard,
            );
          }),
        }}
      />
    </>
  );
}
interface MeasurementTable {
  image?: ImageObject | null;
}
function MeasurementTable({
  image,
}: MeasurementTable) {
  if (!image) return null;
  return (
    <dialog id="measurement_table" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <div class="text-base font-semibold mb-5">Guia de Medidas</div>
          <img
            class="w-full object-contain bg-white rounded-xl lg:rounded-3xl"
            src={image.url ?? ""}
            alt={image.alternateName}
            width={600}
          />
        </form>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
function SubscriptionPrice({
  price,
  discount,
  title,
  topics,
}: {
  price: number;
  discount: number;
  title: string;
  topics: string[];
}) {
  const priceDiscount = price * (discount / 100);
  const total = price - priceDiscount;
  return (
    <>
      <div class="w-full rounded-2xl border border-dark-gray p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
        <div class="text-primary flex items-center gap-2 text-xl font-semibold">
          <Icon id="bookmark" />
          {formatPrice(total)}
        </div>
        <div class="pl-[33px] sm:pl-0">
          Para assinantes <span class="text-primary">[allever]</span>
        </div>
        <button
          class="pl-[33px] sm:pl-0 underline text-dark-gray text-sm"
          hx-on:click={useScript(() => {
            // @ts-ignore .
            document.getElementById("subscripton_info")?.showModal();
          })}
        >
          O que é a assinatura?
        </button>
      </div>
      <dialog id="subscripton_info" class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <div
              class="text-black font-semibold uppercase text-lg mb-3"
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            />
            <div class="text-sm text-black font-semibold">
              <span>Por que assinar?</span>
              {topics.map((topic) => (
                <div class="flex items-center gap-3 border-b border-middle-gray py-3">
                  <div class="flex-grow max-w-[24px]">
                    <Icon
                      id="check-circle"
                      class="text-primary"
                    />
                  </div>
                  {topic}
                </div>
              ))}
              <button
                class="btn btn-primary w-full mt-3"
                hx-on:click={useScript(() => {
                  // @ts-ignore .
                  document.getElementById("subscripton_info")?.showModal();
                })}
              >
                Entendido
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
function ProductInfo({
  page,
  device,
  productFlags,
  hiddenShipping,
  subscriptionTitle,
  subscriptionTopics = [],
}: Props) {
  if (page === null) throw new Error("Missing Product Details Page Info");
  const { breadcrumbList, product } = page;
  const {
    productID,
    offers,
    isVariantOf,
    brand,
    additionalProperty,
    image: images,
  } = product;

  const model = isVariantOf?.model ?? "";
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const {
    pix = 0,
    price = 0,
    listPrice = 0,
    seller = "1",
    sellerName,
    inventory = 0,
    availability,
    teasers,
  } = useOffer(offers);
  
  const hasSubscription =
    additionalProperty?.find((prop) =>
      prop.value?.toLowerCase().indexOf("assinatura") !== -1
    )?.value || "0";
  const subscriptionValue = parseInt(hasSubscription.replace(/\D/g, ""));
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

  const newOffers = offers?.offers.filter((offer) => {
    return offer.inventoryLevel.value && offer.inventoryLevel.value > 0 &&
      offer.seller !== seller;
  }) || [];

  const measurementTableImage =
    ((images as ImageObject[])?.find((img) =>
      img.name === "measurementtable"
    ) as ImageObject) ||
    null;

  const flagsPosition1 = productFlags.filter((flag) => flag.position === "TOP");
  const flagsPosition2 = productFlags.filter((flag) =>
    flag.position === "CENTER"
  );
  const flagsPosition3 = productFlags.filter((flag) =>
    flag.position === "BOTTOM"
  );

  const renderFlag = (
    flag: ProductFlag,
  ) => {
    const teaserNames = teasers?.map((prop) => prop.name);
    const propertyIDs = additionalProperty?.map((prop) => prop.propertyID);

    const hasTeaser = teaserNames.some((t) =>
      t.indexOf(flag.id) !== -1
    );

    if (
      propertyIDs?.includes(flag.id) || hasTeaser
    ) {
      return <Flag {...flag} />;
    }
    return null;
  };

  if (device === "mobile" || device === "tablet") {
    return (
      <>
        <ShareModal />
        <MeasurementTable image={measurementTableImage} />
        <div class="flex flex-col gap-3 px-5 pt-5">
          <Breadcrumb itemListElement={page.breadcrumbList.itemListElement} />
          <SelectedVariantNames product={product} />
          <div class="flex items-center justify-between">
            <p class="text-dark-gray m-0 text-xs">
              Cod: {model} | {brand?.name}
            </p>
            <button
              class="btn btn-ghost text-dark-gray underline text-xs font-normal hover:bg-transparent"
              hx-on:click={useScript(() =>
                document.getElementById("share_product")?.showModal()
              )}
            >
              <Icon id="share-2" width={20} height={20} />
              Compartilhe
            </button>
            <WishlistButton item={item} pdp={true} />
          </div>
          <div class="flex flex-wrap gap-2">
            {flagsPosition1.map(renderFlag)}
            {flagsPosition2.map(renderFlag)}
          </div>
          <GallerySlider page={page} />
          <div class="flex flex-wrap gap-2">
            {flagsPosition3.map(renderFlag)}
          </div>
          <div class="flex flex-col gap-3">
            {availability === "https://schema.org/InStock"
              ? (
                <>
                  <div
                    id="product-page"
                    data-trustvox-product-code={productGroupID}
                  />
                  <Price type="details" product={product} isMobile={true} />
                  <PaymentMethods
                    offers={offers}
                    pix={pix}
                  />
                  <ProductSelector product={product} />
                  {subscriptionValue > 0 && (
                    <SubscriptionPrice
                      price={price}
                      discount={subscriptionValue}
                      title={subscriptionTitle}
                      topics={subscriptionTopics}
                    />
                  )}
                  <div class="w-[calc(100%+40px)] -mx-[20px] px-[20px] py-4 border border-y-dark-gray flex flex-col gap-3">
                    <>
                      {inventory > 0 && inventory <= 9 && (
                        <p className="text-base font-normal text-black">
                          Restam só{" "}
                          <span className="font-bold text-primary">
                            {inventory} unidade{inventory > 1 ? "s" : ""}
                          </span>
                        </p>
                      )}
                    </>
                    <AddToCartButton
                      item={item}
                      seller={seller}
                      product={product}
                      class="uppercase bg-signature-green text-[20px] flex justify-center items-center gap-2 py-[10px] rounded-[30px] no-animation text-white font-semibold hover:bg-[#1bae3299] ease-in"
                      disabled={false}
                    />
                    <ProductSubscription
                      product={product}
                      item={item}
                      seller={seller}
                      title={subscriptionTitle}
                      topics={subscriptionTopics}
                    />
                    <p class="text-xs font-normal text-black">
                      Vendido e entregue por:{" "}
                      <span class="font-bold capitalize">{sellerName}</span>
                    </p>
                  </div>
                  {newOffers.length > 0 &&
                    (
                      <div class="w-[calc(100%+40px)] -mx-[20px] border-b border-b-dark-gray pb-5 pt-2">
                        <span class="block font-semibold text-black mb-5 px-[20px]">
                          Veja outros vendedores
                        </span>
                        {newOffers.map((offer) => (
                          <div class="flex items-end justify-between border-t border-t-dark-gray py-5 px-[20px] last:pb-0">
                            <div class="flex flex-col gap-3">
                              <span>{offer.sellerName}</span>
                              <span class="font-semibold">
                                {formatPrice(offer.price, offer?.priceCurrency)}
                              </span>
                            </div>
                            <AddToCartButton
                              item={item}
                              seller={offer.seller || ""}
                              product={product}
                              hiddenIcon={true}
                              class="bg-primary text-sm py-3 px-8 rounded-full no-animation text-white font-semibold hover:bg-[#1bae3299] ease-in"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  {!hiddenShipping && (
                    <div class="w-[calc(100%+40px)] -mx-[20px] px-[20px] pt-1.5 pb-4 border border-b-dark-gray border-t-0">
                      <div>
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
              )
              : <OutOfStock productID={productID} />}
          </div>
        </div>
        <div class="fixed bottom-0 left-0 right-0 rounded-t-2xl bg-white shadow-2xl z-10">
          <div class="container px-5 py-4 flex gap-4 items-center">
            <Price type="fixed" product={product} isMobile={true} />
            <AddToCartButton
              item={item}
              seller={seller}
              product={product}
              class="uppercase bg-signature-green text-base flex justify-center items-center gap-2 p-3 rounded-full no-animation text-white font-semibold hover:bg-[#1bae3299]"
              disabled={false}
            />
          </div>
        </div>
      </>
    );
  }
  if (device === "desktop") {
    return (
      <>
        <ShareModal />
        <MeasurementTable image={measurementTableImage} />
        <div class="container pt-12 px-5 grid grid-cols-2 gap-8">
          <div class="col-span-1 relative">
            <GallerySlider page={page} />
          </div>
          <div class="col-span-1">
            <div class="flex flex-col gap-6">
              <Breadcrumb
                itemListElement={page.breadcrumbList.itemListElement}
              />
              <div class="flex flex-col gap-3 border border-x-0 border-y-dark-gray py-6">
                <div class="flex items-center gap-4 justify-between">
                  <SelectedVariantNames product={product} />
                  <div
                    id="product-page"
                    data-trustvox-product-code={productGroupID}
                  />
                  <WishlistButton item={item} pdp={true} />
                </div>
                <div className="flex items-center justify-between">
                  <p class="text-dark-gray text-sm">
                    Cod: {model} | {brand?.name}
                  </p>
                  <button
                    class="btn btn-ghost text-dark-gray underline text-sm hover:bg-transparent p-0 min-h-unset h-auto"
                    hx-on:click={useScript(() =>
                      document.getElementById("share_product")?.showModal()
                    )}
                  >
                    <Icon id="share-2" />
                    Compartilhe
                  </button>
                </div>
                <div class="flex flex-wrap gap-2">
                  {flagsPosition1.map(renderFlag)}
                </div>
              </div>
              {availability === "https://schema.org/InStock" &&
                (
                  <>
                    <div class="flex flex-wrap gap-2">
                      {flagsPosition2.map(renderFlag)}
                    </div>
                    <Price type="details" product={product} isMobile={false} />
                    <div class="flex flex-wrap gap-2">
                      {flagsPosition3.map(renderFlag)}
                    </div>
                    <PaymentMethods
                      offers={offers}
                      pix={pix}
                    />
                    <ProductSelector product={product} />
                    {subscriptionValue > 0 && (
                      <SubscriptionPrice
                        price={price}
                        discount={subscriptionValue}
                        title={subscriptionTitle}
                        topics={subscriptionTopics}
                      />
                    )}
                    <div class="flex flex-col gap-3">
                      <AddToCartButton
                        item={item}
                        seller={seller}
                        product={product}
                        class="uppercase bg-signature-green text-[20px] flex justify-center items-center gap-2 py-[10px] rounded-[30px] no-animation text-white font-semibold hover:bg-[#1bae3299] ease-in"
                        disabled={false}
                      />
                      <ProductSubscription
                        product={product}
                        item={item}
                        seller={seller}
                        title={subscriptionTitle}
                        topics={subscriptionTopics}
                      />
                      {inventory > 0 && inventory <= 9 && (
                        <div>
                          <p className="text-xl text-black">
                            Restam só{" "}
                            <span className="font-bold text-primary">
                              {inventory} unidade{inventory > 1 ? "s" : ""}
                            </span>
                          </p>
                        </div>
                      )}
                      <p class="text-xs font-normal text-black">
                        Vendido e entregue por:{" "}
                        <span class="font-bold capitalize">{sellerName}</span>
                      </p>
                    </div>
                    {newOffers.length > 0 &&
                      (
                        <div class="border border-y-dark-gray border-x-0 py-5">
                          <span class="block font-semibold text-black mb-5">
                            Veja outros vendedores
                          </span>
                          {newOffers.map((offer) => (
                            <div class="flex items-end justify-between border-t border-t-dark-gray py-5 last:pb-0">
                              <div class="flex flex-col gap-3">
                                <span>{offer.sellerName}</span>
                                <span class="font-semibold">
                                  {formatPrice(
                                    offer.price,
                                    offer?.priceCurrency,
                                  )}
                                </span>
                              </div>
                              <AddToCartButton
                                item={item}
                                seller={offer.seller || ""}
                                product={product}
                                hiddenIcon={true}
                                class="bg-primary text-sm py-3 px-8 rounded-full no-animation text-white font-semibold hover:bg-[#1bae3299] ease-in"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    {!hiddenShipping && (
                      <div>
                        <ShippingSimulationForm
                          items={[{
                            id: Number(product.sku),
                            quantity: 1,
                            seller: seller,
                          }]}
                        />
                      </div>
                    )}
                  </>
                )}
            </div>
            <div class="flex flex-col gap-[14px] py-[14px]">
              {availability != "https://schema.org/InStock" &&
                (
                  <div>
                    <OutOfStock productID={productID} />
                  </div>
                )}
            </div>
          </div>
        </div>
        <div
          id="fixed-add-to-cart"
          class="invisible fixed bottom-0 left-0 right-0 rounded-t-2xl bg-white shadow-2xl z-10"
        >
          <div class="container px-5 py-4 grid grid-cols-4 lg:grid-cols-7 gap-12 items-center">
            <div class="hidden lg:block text-xl font-semibold text-black col-span-3">
              <SelectedVariantNames product={product} />
            </div>
            <Price type="fixed" product={product} isMobile={false} />
            <div class="col-span-2">
              <AddToCartButton
                item={item}
                seller={seller}
                product={product}
                class="uppercase bg-signature-green text-[20px] flex justify-center items-center gap-2 py-[10px] rounded-[30px] no-animation text-white font-semibold hover:bg-[#1bae3299] ease-in"
                disabled={false}
              />
            </div>
          </div>
        </div>
        <script
          type="module"
          dangerouslySetInnerHTML={{ __html: useScript(onLoad) }}
        />
      </>
    );
  }
  return null;
}
export default ProductInfo;
