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
    <div class="container px-5 lg:px-0 pb-[50px]">
      <section class="text-start  pb-[50px]">
        <p dangerouslySetInnerHTML={{ __html: firstSection?.title || "" }}></p>

        <div class="flex justify-around items-center my-10 flex-col gap-[24px] lg:gap-[0] lg:flex-row">
          {firstSection?.cards?.map((item, index) => (
            <div
              key={index}
              class="flex flex-row lg:flex-col space-between items-center max-w-[340px] w-full"
            >
              <div class="bg-primary text-white rounded-full  w-[100px] h-[100px] lg:w-[168px] lg:h-[168px] flex items-center justify-center text-2xl font-bold">
                <p class="text-[24px] lg:text-[40px]">{item?.content}</p>
              </div>
              <p
                dangerouslySetInnerHTML={{ __html: item?.label || "" }}
                class="mt-4 text-sm text-center"
              >
              </p>
            </div>
          ))}
        </div>
      </section>

      <section class="text-start mb-12">
        <h3 class="text-3xl font-bold text-black mb-8">É Fácil!</h3>

        <div class="relative flex justify-between items-center lg:max-w-[686px] w-full mx-auto">
          <div class="absolute top-[22px] left-0 right-0 h-[20px] bg-white rounded-full">
          </div>

          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} class="">
              <div class="relative z-10 flex flex-col items-center justify-center w-16 h-16 bg-white rounded-full shadow-xl">
                <div class="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
                  <Icon id="check" size={30} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div class="flex justify-around lg:px-[85px]">
          <div class="mt-8 text-sm text-end flex gap-[20px] flex-col">
            <p class="text-primary font-bold text-[32px]">01.</p>
            <p class="text-black text-[28px] leading-[30px]">
              Faça seu cadastro
            </p>
          </div>
          <div class="mt-8 text-sm text-center flex gap-[20px] flex-col">
            <p class="text-primary font-bold text-[32px]">02.</p>
            <p class="text-black text-[28px] leading-[30px]">
              Assine o contrato
            </p>
          </div>
          <div class="mt-8 text-sm text-start flex gap-[20px] flex-col">
            <p class="text-primary font-bold text-[32px]">03.</p>
            <p class="text-black text-[28px] leading-[30px]">
              Conecte seus produtos
            </p>
          </div>
        </div>
      </section>

      <section class="text-start">
        <h2
          dangerouslySetInnerHTML={{ __html: secondSection?.title || "" }}
          class="text-3xl font-bold text-black mb-6"
        >
        </h2>
        <a
          dangerouslySetInnerHTML={{
            __html: secondSection?.button?.label || "",
          }}
          href={secondSection?.button?.link}
          class="bg-black text-white text-xl font-bold py-4 px-5 mb-8 inline-block w-full rounded-[30px] text-center"
        >
        </a>
      </section>

      <section
        dangerouslySetInnerHTML={{ __html: secondSection?.html || "" }}
        class="text-left"
      >
      </section>
    </div>
  );
}

export default SellerPage;
