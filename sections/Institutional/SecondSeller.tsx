import { HTMLWidget as HTML } from "apps/admin/widgets.ts";

interface Props {
    secondSection?: {
        title?: HTML;
        button?: {
            label?: HTML;
            link?: string;
        };
        html?: HTML;
    };
}

const SecondSeller = ({ secondSection }: Props) => {
    return (
        <>
            <section class="text-start container px-5">
                <div
                    dangerouslySetInnerHTML={{
                        __html: secondSection?.title || "",
                    }}
                    class="fluid-text mb-4"
                />
                <a
                    dangerouslySetInnerHTML={{
                        __html: secondSection?.button?.label || "",
                    }}
                    href={secondSection?.button?.link}
                    class="bg-black text-white fluid-text font-bold py-0 px-5 mb-8 inline-block w-full rounded-full text-center"
                />
            </section>

            <section
                dangerouslySetInnerHTML={{ __html: secondSection?.html || "" }}
                class="fluid-text text-left"
            />
        </>
    );
};

export default SecondSeller;
