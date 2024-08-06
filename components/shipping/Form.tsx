import type { SKU } from "apps/vtex/utils/types.ts";
import { useId } from "../../sdk/useId.ts";
import { useComponent } from "../../sections/Component.tsx";

export interface Props {
  items: SKU[];
}

export default function Form({ items }: Props) {
  const slot = useId();

  return (
    <div class="flex flex-col gap-2">
      <div class="flex flex-col">
        <span class="uppercase text-xs font-semibold">Calcule o frete</span>
      </div>

      <form
        class="flex gap-[11px]"
        hx-target={`#${slot}`}
        hx-swap="innerHTML"
        hx-sync="this:replace"
        hx-post={useComponent(import.meta.resolve("./Results.tsx"), {
          items,
        })}
      >
        <input
          as="input"
          type="text"
          class="input input-bordered w-48 rounded-[10px] bg-white text-xs w-full max-w-[212px] placeholder:text-black text-black"
          placeholder="Informe o CEP"
          name="postalCode"
          maxLength={8}
          size={8}
        />
        <button type="submit" class="no-animation bg-[#123ADD] text-white text-xs font-semibold rounded-[39px] p-4 max-w-[127px] w-full">
          <span class="[.htmx-request_&]:hidden inline">Calcular</span>
          <span class="[.htmx-request_&]:inline hidden loading loading-spinner loading-xs" />
        </button>
      </form>
      <a href="https://buscacepinter.correios.com.br/app/endereco/index.php" target="_blank" class="text-xs text-black font-normal underline">Descobrir meu CEP</a>

      {/* Results Slot */}
      <div id={slot} />
    </div>
  );
}
