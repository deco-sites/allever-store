import { Suggestion } from "apps/commerce/types.ts";
import { useScript } from "apps/utils/useScript.ts";
import { asResolved, Resolved } from "deco/mod.ts";
import {
  SEARCHBAR_INPUT_FORM_ID,
  SEARCHBAR_POPUP_ID,
} from "../../../constants.ts";
import { useId } from "../../../sdk/useId.ts";
import { useComponent } from "../../../sections/Component.tsx";
import Icon from "../../ui/Icon.tsx";
import { Props as SuggestionProps } from "./Suggestions.tsx";

import ExpandableInput from '../../../islands/ExpandableInput.tsx'

export const ACTION = "/s";
export const NAME = "q";

export interface SearchbarProps {
  placeholder?: string;
  loader: Resolved<Suggestion | null>;
  searchBarDrawer?: boolean;
}

const script = (formId: string, name: string, popupId: string) => {
  const form = document.getElementById(formId) as HTMLFormElement | null;
  const input = form?.elements.namedItem(name) as HTMLInputElement | null;
  form?.addEventListener("submit", () => {
    const search_term = input?.value;
    if (search_term) {
      window.DECO.events.dispatch({
        name: "search",
        params: { search_term },
      });
    }
  });

  addEventListener("keydown", (e: KeyboardEvent) => {
    const isK = e.key === "k" || e.key === "K" || e.keyCode === 75;

    if (e.metaKey === true && isK) {
      const input = document.getElementById(popupId) as HTMLInputElement | null;
      if (input) {
        input.checked = true;
        document.getElementById(formId)?.focus();
      }
    }
  });
};

const Suggestions = import.meta.resolve("./Suggestions.tsx");

export default function Searchbar(
  { placeholder = "O que deseja?", loader, searchBarDrawer }: SearchbarProps,
) {
  const slot = useId();

  return (
    <div class={`w-full relative flex flex-col  ${searchBarDrawer ? "gap-[unset]" : ""}`}>
      <div class="flex flex-row-reverse items-center gap-2">
        <form id={SEARCHBAR_INPUT_FORM_ID} action={ACTION} class={`flex-1 join flex gap-[20px] ${searchBarDrawer ? "my-5 w-full px-5" : ""}`}>
        <button
          type="submit"
          form={SEARCHBAR_INPUT_FORM_ID}
          class="bg-transparent border-none md:hidden"
          aria-label="Search"
          tabIndex={-1}
        >
          <span class="loading loading-spinner loading-xs hidden [.htmx-request_&]:inline" />
          {searchBarDrawer ? <Icon id="search-drawer" class="inline [.htmx-request_&]:hidden" /> : <Icon id="search" class="inline [.htmx-request_&]:hidden" />}
        </button>
          <ExpandableInput
            name={NAME}
            placeholder={placeholder}
            autocomplete="off"
            hxTarget={`#${slot}`}
            hxPost={loader && useComponent<SuggestionProps>(Suggestions, { loader: asResolved(loader) })}
            hx-trigger={`input changed delay:100ms, ${NAME}`}
            hx-indicator={`#${SEARCHBAR_INPUT_FORM_ID}`}
            hxSwap="innerHTML"
            hx-focus={`border-black`}
          />
        </form>
        <button
          type="submit"
          form={SEARCHBAR_INPUT_FORM_ID}
          class="bg-transparent border-none hidden md:block"
          aria-label="Search"
          tabIndex={-1}
        >
          <span class="loading loading-spinner loading-xs hidden [.htmx-request_&]:inline" />
          {searchBarDrawer ? <Icon id="search-drawer" class="inline [.htmx-request_&]:hidden" /> : <Icon id="search" class="inline [.htmx-request_&]:hidden" />}
        </button>
      </div>

      {/* Suggestions slot */}
      <div class="absolute top-full left-0 w-[calc(100%-32px)] bg-white z-10" id={slot} />

      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(
            script,
            SEARCHBAR_INPUT_FORM_ID,
            NAME,
            SEARCHBAR_POPUP_ID,
          ),
        }}
      />
    </div>
  );
}