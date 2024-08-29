import Icon from "../../components/ui/Icon.tsx";

import { HTMLWidget as HTML } from "apps/admin/widgets.ts";

interface Props {
  firstSection?: {
    title?: HTML;
    cards?: {
      content?: string;
      label?: HTML;
    }[];
  };
  secondSection?: {
    title?: HTML;
    button?: {
      label?: HTML;
      link?: string;
    };
    html?: HTML;
  };
}

function SellerPage({ firstSection, secondSection }: Props) {
  return (
    <div class="container px-5 my-8">
      <section class="text-start">
        <div class="fluid-text" dangerouslySetInnerHTML={{ __html: firstSection?.title || "" }} />
        <div class="flex justify-around items-center my-10 flex-col gap-[24px] lg:gap-[0] lg:flex-row">
          {firstSection?.cards?.map((item, index) => (
            <div
              key={index}
              class="flex flex-row lg:flex-col space-between items-center max-w-[340px] w-full"
            >
              <div class="bg-primary text-white rounded-full w-20 h-20 lg:w-32 lg:h-32 flex items-center justify-center text-2xl font-bold">
                <p class="text-base lg:text-4xl">{item?.content}</p>
              </div>
              <div class="lg:mt-4">
                <div
                  dangerouslySetInnerHTML={{ __html: item?.label || "" }}
                  class="fluid-text text-left sm:text-center"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section class="text-start mb-12">
        <h3 class="text-xl lg:text-3xl font-bold text-black text-start mb-4 lg:mb-8">É Fácil!</h3>
        <div class="flex flex-col sm:flex-row w-full justify-start lg:justify-between gap-4 lg:gap-16">
          <div class="flex items-center gap-4 lg:flex-col lg:items-end">
            <div class="mr-0 lg:-mr-4 relative z-10 flex flex-col items-center justify-center w-16 h-16 bg-white rounded-full shadow-xl">
              <div class="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
                <Icon id="check" size={30} />
              </div>
            </div>
            <div class="text-sm text-start sm:text-end flex gap-2 lg:gap-4 flex-col mt-8">
              <p class="text-primary font-bold text-base lg:text-3xl">01.</p>
              <p class="text-black text-base lg:text-2xl">
                Faça seu cadastro
              </p>
            </div>
          </div>
          <div class="flex items-center gap-4 lg:flex-col relative grow">
            <div class="absolute w-16 lg:w-[calc(100%+128px+32px)] top-1/2 lg:top-0 left-0 lg:left-1/2 -translate-y-1/2 lg:-translate-y-0 lg:-translate-x-1/2 h-[calc(100%+128px)] lg:h-16 bg-white" />
            <div class="relative z-10 flex flex-col items-center justify-center w-16 h-16 bg-white rounded-full shadow-xl">
              <div class="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
                <Icon id="check" size={30} />
              </div>
            </div>
            <div class="text-sm text-start sm:text-center flex gap-2 lg:gap-4 flex-col mt-8">
              <p class="text-primary font-bold text-base lg:text-3xl">02.</p>
              <p class="text-black text-base lg:text-2xl">
                Assine o contrato
              </p>
            </div>
          </div>
          <div class="flex items-center gap-4 lg:flex-col lg:items-start">
            <div class="mr-0 lg:-ml-4 relative z-10 flex flex-col items-center justify-center w-16 h-16 bg-white rounded-full shadow-xl">
              <div class="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
                <Icon id="check" size={30} />
              </div>
            </div>
            <div class="text-sm text-start flex gap-2 lg:gap-4 flex-col mt-8">
              <p class="text-primary font-bold text-base lg:text-3xl">03.</p>
              <p class="text-black text-base lg:text-2xl">
                Conecte seus produtos
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="text-start">
        <div
          dangerouslySetInnerHTML={{ __html: secondSection?.title || "" }}
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
    </div>
  );
}

export default SellerPage;
