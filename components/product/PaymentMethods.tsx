import { useEffect, useState } from "preact/hooks";
import Icon from "../ui/Icon.tsx";
import { formatPrice } from "../../sdk/format.ts";

interface PaymentMethodsProps {
  installment?: string;
  installments?: string[];
}

function PaymentMethods({ installment, installments }: PaymentMethodsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("pix");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.keyCode === 27) {
        setIsOpen(false);
        setPaymentMethod("pix");
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const renderContent = () => {
    if (paymentMethod === "pix") {
      return (
        <div class="px-[25px] flex flex-col gap-[15px]">
          <p class="text-[30px] text-[#123ADD] font-semibold flex flex-row">
            {formatPrice(installment)}
            <span class="text-normal ml-[8px]">no PIX</span>
          </p>
          <p class="text-[#888888] font-semibold text-xs max-w-[334px]">
            Para pagamento via PIX será gerada uma chave e um QR Code ao
            finalizar o processo de compra.
          </p>
          <p class="text-[10px] text-[#888888] font-semibold max-w-[334px]">
            - O prazo de validade da chave é de X minutos. Em caso de não
            pagamento o pedido será cancelado.
          </p>
          <p class="text-[10px] text-[#888888] font-semibold max-w-[334px]">
            - O prazo de entrega começa a contar após a confirmação do
            pagamento.
          </p>
        </div>
      );
    } else if (paymentMethod === "card") {
      return (
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Parcelamento
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {installments?.map((installment, index) => (
              <tr key={index}>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {index + 1}x
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  R$ {installment}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return null;
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        class="underline text-[#123ADD] text-base font-normal"
      >
        Ver formas de pagamento
      </button>

      {isOpen && (
        <div class="fixed inset-0 flex items-center justify-center z-50 px-[30px]">
          <div class="bg-white p-6 rounded-lg shadow-lg z-50 max-w-[536px] w-full m-auto">
            <div class="flex justify-between">
              <h3 class="font-semibold text-base text-black">
                Métodos de <span class="text-[#123ADD]">[pagamento]</span>
              </h3>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setPaymentMethod("pix");
                }}
              >
                <Icon id="close-black" class="w-full" />
              </button>
            </div>
            <div class="flex py-[40px] ">
              <div class="flex flex-col w-full border-r max-w-[159px] space-between gap-[48px]">
                <div class="items-center flex flex-col">
                  <div
                    class={`border py-[13px] px-[15px] rounded-full ${
                      paymentMethod === "pix" && "border-[#123ADD]"
                    } `}
                  >
                    <a
                      onClick={() => setPaymentMethod("pix")}
                      class={`flex flex-col items-center gap-2 cursor-pointer`}
                    >
                      <Icon id="pix" width={44} height={47} class="w-full" />
                    </a>
                  </div>
                  <p class={`font-semibold text-xs mt-[5px]`}>Pix</p>
                </div>
                <div class="items-center flex flex-col">
                  <div
                    class={`border py-[20px] px-[15px] rounded-full ${
                      paymentMethod === "card" && "border-[#123ADD]"
                    } `}
                  >
                    <a
                      onClick={() => setPaymentMethod("card")}
                      class={`flex flex-col items-center gap-2 cursor-pointer`}
                    >
                      <Icon
                        id="credit-card"
                        width={43}
                        height={33}
                        class="w-full"
                      />
                    </a>
                  </div>
                  <p class={`font-semibold text-xs mt-[5px]`}>Pix</p>
                </div>
              </div>
              <div class="flex flex-col">
                {renderContent()}
              </div>
            </div>
          </div>
          <div
            class="fixed inset-0 bg-black opacity-50"
            onClick={() => {
              setIsOpen(false);
              setPaymentMethod("pix");
            }}
          >
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentMethods;