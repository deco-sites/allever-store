import Icon from "../ui/Icon.tsx";
import ProductAd from "../product/ProductAd.tsx";
import CampaignTimer from "../ui/CampaingTimer.tsx";

import { useId } from "../../sdk/useId.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";

interface Props {
  /**
   * @title Titulo?
   */
  Title?: string;
  /**
   * @title Subtitulo
   */
  Label?: string;
  /**
   * @title Data Final
   * @format datetime
   */
  expireAt?: string;
  product: ProductDetailsPage | null;
}

const ShowCaseCounter = ({
  Title =
    "<p class='flex gap-[5px]'><span class='font-bold'>[Oferta]</span> <span class='font-regular'> Relâmpago</span></p> ",
  Label = "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
  expireAt,
  product,
}: Props) => {
  const id = useId();

  if (!expireAt) {
    return null;
  }

  return (
    <div
      id={id}
      class=" px-5 lg:px-0 rounded-[10px] lg:rounded-none lg:bg-primary"
    >
      <div class="flex items-center justify-center flex-wrap container p-5 gap-x-10 gap-y-3 lg:py-[100px] bg-primary rounded-[10px] lg:rounded-none">
        <div class="flex flex-col justify-unset lg:justify-center">
          <div>
            <div class="flex justify-center items-center">
              <Icon size={32} id={"rain"} />
              <h3
                class="text-[22px] sm:text-[40px] text-white"
                dangerouslySetInnerHTML={{ __html: Title }}
              >
              </h3>
            </div>
            <p class="text-white mt-[10px] text-center break-all text-sm lg:text-[20px] mb-4">
              {Label}
            </p>
          </div>
          <CampaignTimer
            id={id}
            expiresAt={expireAt}
          />
        </div>
        <div class="bg-white max-w-[602px] rounded-[10px]">
          <ProductAd product={product} />
        </div>
      </div>
    </div>
  );
};

export default ShowCaseCounter;
