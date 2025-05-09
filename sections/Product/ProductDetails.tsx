import Icon from "../../components/ui/Icon.tsx";
import Collapsable from "../../components/ui/Collapsable.tsx";
import BuyTogether from "../../components/product/BuyTogether.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import Description from "../../components/product/Description.tsx";
import ProductGrid from "../../components/product/ProductGrid.tsx";
import { useOffer } from "../../sdk/useOffer.ts";
import { useScript } from "@deco/deco/hooks";
import type { SectionProps } from "@deco/deco";
import type { AppContext } from "../../apps/site.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  /** @title Omitir seção de entrega? */
  hiddenShipping?: boolean;
  /**
   * @title Título da Seção de Assinatura
   * @format rich-text
   */
  subscriptionTitle?: string;
  /** @title Tópicos da Seção de Assinatura */
  subscriptionTopics?: string[];
}

const onLoad = (productId: string, productName: string, image: string) => {
  // @ts-ignore _trustvox exists
  globalThis._trustvox = [
    ["_storeId", "121576"],
    ["_productId", productId],
    ["_productName", productName],
    ["_productPhotos", [image]],
  ];
  const script = document.createElement("script");
  script.id = "_trustvox_widget_script";
  script.async = true;
  script.type = "text/javascript";
  script.src = "//static.trustvox.com.br/sincero/sincero.js";
  document.head.append(script);
  // @ts-ignore _trustvox_shelf_rate exists
  const _trustvox_shelf_rate = globalThis._trustvox_shelf_rate || [];
  _trustvox_shelf_rate.push(["_storeId", "121576"]);
};

export const loader = async (props: Props, _req: Request, ctx: AppContext) => {
  const { productFlags = [], device } = ctx;
  const { page } = props;
  if (page) {
    const { product } = page;
    // const { productID, offers } = product;
    // const { seller = "1" } = useOffer(offers);
    // const items = [{
    //   id: parseInt(productID),
    //   quantity: 1,
    //   seller
    // }];

    // const cartSimulation = await (ctx as any).invoke.vtex.actions.cart.simulation({
    //   items,
    //   country: 'BRA',
    //   postalCode: '12954400',
    //   RnbBehavior: 1,
    // });

    // deno-lint-ignore no-explicit-any
    const productRecommendations = await (ctx as any).invoke.vtex.loaders.legacy.relatedProductsLoader({
      id: product.inProductGroupWithID,
      crossSelling: "whosawalsosaw",
    });

    return {
      ...props,
      productFlags,
      isMobile: device !== "desktop",
      productRecommendations,
    };
  }

  return {
    ...props,
    isMobile: device !== "desktop",
    productFlags,
    productRecommendations: []
  };
};
export default function ProductDetails({
  page,
  isMobile,
  productFlags,
  productRecommendations,
  hiddenShipping = false,
  subscriptionTitle =
    "ASSINE E COMPRE COM ATÉ <b class='text-primary'>[10% OFF]</b>",
  subscriptionTopics = [
    "10% OFF no site em todas as compras com assinatura",
    "Edite os produtos e as datas, pause ou cancele a qualquer momento!",
    "Sem taxas de Adesão, Mensalidade ou Cancelamento",
  ],
}: SectionProps<typeof loader>) {
  if (!page) {
    return (
      <div class="w-full flex justify-center items-center py-28">
        <div class="flex flex-col items-center justify-center gap-6">
          <span class="font-medium text-2xl">Oops!</span>
          <a href="/" class="btn no-animation">
            Go back to Home
          </a>
        </div>
      </div>
    );
  }
  if (page) {
    const { product } = page;
    const {
      productID: productId,
      image: images,
      isVariantOf,
      additionalProperty: productProperties,
    } = product;
    const itsForAdults = productProperties?.find((p) =>
      p.value === "Maior de 18"
    ) || null;
    const productName = (isVariantOf?.name ?? product.name) || "";
    const [front] = images ?? [];
    const image = front?.url || "";
    const device = isMobile ? "mobile" : "desktop";
    const { additionalProperty = [] } = isVariantOf ?? {};

    return (
      <>
        {itsForAdults !== null && (
          <>
            <dialog id="itsForAdults" class="modal">
              <div class="modal-box flex flex-col gap-3 items-center">
                <Icon id="18" size={47} />
                <p class="text-center text-sm">
                  Olá! Precisamos confirmar a sua idade para continuar acessando
                  a página!
                </p>
                <h3 class="text-lg font-bold text-center">
                  Você tem mais de 18 anos?
                </h3>
                <div class="modal-action flex gap-3 justify-center !m-0">
                  <a class="btn m-0" href="/">Não</a>
                  <form method="dialog">
                    <button
                      class="btn btn-primary"
                      hx-on:click={useScript(() => {
                        if (!localStorage.getItem("showAdultModal")) {
                          localStorage.setItem("showAdultModal", "no");
                        }
                      })}
                    >
                      Sim
                    </button>
                  </form>
                </div>
                <p class="text-center text-xs text-dark-gray m-0">
                  Continuando você estará aceitando as políticas de{" "}
                  <b>Privacidade e termos de uso</b> e{" "}
                  <b>políticas de cookies</b>
                </p>
              </div>
            </dialog>
            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{
                __html: useScript(() => {
                  if (!localStorage.getItem("showAdultModal")) {
                    // @ts-ignore showModal exists on daisyUi
                    itsForAdults.showModal();
                  }
                }),
              }}
            />
          </>
        )}
        <ProductInfo
          page={page}
          device={device}
          hiddenShipping={hiddenShipping}
          subscriptionTitle={subscriptionTitle}
          subscriptionTopics={subscriptionTopics}
          productFlags={productFlags}
        />
        <BuyTogether
          page={page}
          device={device}
          productRecommendations={productRecommendations}
        />
        <div class="border border-x-0 border-b-dark-gray border-t-0 lg:border-t-[1px] lg:border-t-dark-gray mt-0 lg:mt-12">
          <Description page={page} />
        </div>
        {additionalProperty.length > 0 && (
          <div
            id="specifications"
            class="pt-32 -mt-32 border border-x-0 border-b-dark-gray border-t-0"
          >
            <Collapsable
              class="container px-5"
              title={
                <div class="flex space-between items-center">
                  <span class="text-base lg:text-xl py-5 sm:py-12 font-semibold">
                    Especificações Técnicas
                  </span>
                  <Icon
                    id={"arrow-right"}
                    size={13}
                    class="group-open:rotate-180 transition-all ease-in-out duration-[400ms]"
                  />
                </div>
              }
            >
              <div class="mb-5 w-full">
                {isVariantOf?.additionalProperty.map((property) => (
                  <div class="px-3 py-2 w-full text-sm sm:text-base odd:bg-middle-gray">
                    <span class="font-semibold after:content-[':'] max-sm:pb-0 mr-2">
                      {property.name}
                    </span>
                    {property.value}
                  </div>
                ))}
              </div>
            </Collapsable>
          </div>
        )}
        <ProductGrid page={page} />
        <div className="container px-5 pb-5">
          <div id="_trustvox_widget" />
        </div>
        <script
          type="text/javascript"
          defer
          dangerouslySetInnerHTML={{
            __html: useScript(onLoad, productId, productName, image),
          }}
        />
      </>
    );
  }
}
export function LoadingFallback() {
  return (
    <div
      style={{ height: "710px" }}
      class="w-full flex justify-center items-center"
    >
      <span class="loading loading-spinner" />
    </div>
  );
}
