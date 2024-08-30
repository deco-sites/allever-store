import { HTMLWidget as HTML } from "apps/admin/widgets.ts";

interface Props {
    firstSection?: {
        title?: HTML;
        firstCard?: {
            content?: string;
            label?: HTML;
        };
        secondCard?: {
            content?: string;
            label?: HTML;
        };
        thirdCard?: {
            content?: string;
            label?: HTML;
        };
    };
}

const FirstSeller = ({ firstSection }: Props) => {
    return (
        <>
            <section class="text-start container px-5">
                <div
                    class="fluid-text"
                    dangerouslySetInnerHTML={{
                        __html: firstSection?.title || "",
                    }}
                />
                <div class="flex justify-around items-center my-10 flex-col gap-[24px] lg:gap-[0] lg:flex-row">
                    <div
                        class="flex flex-row lg:flex-col space-between items-center max-w-[340px] w-full">
                        <div class="bg-primary text-white rounded-full w-20 h-20 lg:w-32 lg:h-32 flex items-center justify-center text-2xl font-bold">
                            <p class="text-base lg:text-4xl">
                                {firstSection?.firstCard?.content}
                            </p>
                        </div>
                        <div class="lg:mt-4">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: firstSection?.firstCard?.label || "",
                                }}
                                class="fluid-text text-left sm:text-center"
                            />
                        </div>
                    </div>

                    <div
                        class="flex flex-row lg:flex-col space-between items-center max-w-[340px] w-full">
                        <div class="bg-primary text-white rounded-full w-20 h-20 lg:w-32 lg:h-32 flex items-center justify-center text-2xl font-bold">
                            <p class="text-base lg:text-4xl">
                                {firstSection?.secondCard?.content}
                            </p>
                        </div>
                        <div class="lg:mt-4">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: firstSection?.secondCard?.label || "",
                                }}
                                class="fluid-text text-left sm:text-center"
                            />
                        </div>
                    </div>
                    <div
                        class="flex flex-row lg:flex-col space-between items-center max-w-[340px] w-full">
                        <div class="bg-primary text-white rounded-full w-20 h-20 lg:w-32 lg:h-32 flex items-center justify-center text-2xl font-bold">
                            <p class="text-base lg:text-4xl">
                                {firstSection?.thirdCard?.content}
                            </p>
                        </div>
                        <div class="lg:mt-4">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: firstSection?.thirdCard?.label || "",
                                }}
                                class="fluid-text text-left sm:text-center"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default FirstSeller;
