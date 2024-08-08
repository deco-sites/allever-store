
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Collapsable from "../ui/Collapsable.tsx"
import Icon from "../ui/Icon.tsx";

export interface Props {
    /** @title Integration */
    page: ProductDetailsPage | null;
}


const Description = ({ page }: Props) => {
    const { product } = page;
    const { isVariantOf, additionalProperty } = product;
    const description = product.description || isVariantOf?.description;

    return (
        <>
            <Collapsable
                class="container"
                title={
                    <div class="flex space-between items-center">
                        <p class="text-[24px] pt-[45px] pb-[45px]"> Descrição do Produto </p>
                        <Icon class="group-open:rotate-180 transition-all ease-in-out duration-[400ms]" size={13} id={'arrow-right'} />
                    </div>
                }
            >
                <div
                    class="pb-[40px]"
                    dangerouslySetInnerHTML={{ __html: description }}
                />

            </Collapsable>

            {/* Description card */}
            {/* <div class="mt-4 sm:mt-6" >
                <span class="text-sm">
                    {description && (
                        <details>
                            <summary class="cursor-pointer">Description</summary>
                            <div
                                class="ml-2 mt-2"
                                dangerouslySetInnerHTML={{ __html: description }}
                            />
                        </details>
                    )}
                </span>
            </div > */}
        </>
    )
}

export default Description