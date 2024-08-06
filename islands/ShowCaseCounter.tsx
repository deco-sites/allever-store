import { useState } from 'preact/hooks';
import CampaignTimer from './CampaignTimer.tsx';
import Icon from "../components/ui/Icon.tsx";
import ProductAd from "../components/product/ProductAd.tsx";
import { ProductDetailsPage } from 'apps/commerce/types.ts';

interface Props {
    /**
     * @title Titulo?
     */
    Title?: string ;
    /**
     * @title Subtitulo
     */
    Label?: string;
    /**
     * @title Data Final
     * @format datetime
     */
    expireAt?: string;
    /**
     * @ignore
     */
    hideLabel?: boolean;
    product: ProductDetailsPage | null;
}

const ShowCaseCounter = ({ Title = "<p class='flex gap-[5px]'><span class='font-bold'>[Oferta]</span> <span class='font-semibold'> Relâmpago</span></p> ", Label = "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum", expireAt, hideLabel = false, product }: Props) => {
    const [expire, setExpire] = useState(false);

    const handleExpire = () => {
        setExpire(true);
    };

    if (expire) {
        return null;
    }

    return (
        <div class="lg:bg-[#123ADD] px-5 lg:px-0 rounded-[10px] lg:rounded-none">
            <div class="flex flex-col sm:flex-row container  p-5 lg:px-0 lg:py-[100px] justify-between bg-[#123ADD] rounded-[10px] lg:rounded-none">
                <div class="max-w-[301px] lg:max-w-[447px] mx-auto flex flex-col justify-unset lg:justify-center">
                    <div>
                        <div class="flex justify-center items-center">
                            <Icon size={32} id={"rain"} />
                            <h3 class="text-[22px] sm:text-[40px] text-white" dangerouslySetInnerHTML={{ __html: Title }}></h3>
                        </div>
                        <p class="text-white mt-[10px] text-center break-all text-sm lg:text-[20px]">{Label}</p>
                    </div>
                    <CampaignTimer expiresAt={expireAt} hideLabel={hideLabel} onExpire={handleExpire} />
                </div>
                <div class="bg-white max-w-[602px] w-full rounded-[10px]">
                    <ProductAd product={product} />
                </div>
            </div>
        </div>
    );
}

export default ShowCaseCounter;
