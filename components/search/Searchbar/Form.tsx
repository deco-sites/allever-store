/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

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

// When user clicks on the search button, navigate it to
export const ACTION = "/s";
// Querystring param used when navigating the user
export const NAME = "q";

export interface SearchbarProps {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;

  /** @description Loader to run when suggesting new elements */
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

  // Keyboard event listeners
  addEventListener("keydown", (e: KeyboardEvent) => {
    const isK = e.key === "k" || e.key === "K" || e.keyCode === 75;

    // Open Searchbar on meta+k
    if (e.metaKey === true && isK) {
      const input = document.getElementById(popupId) as
        | HTMLInputElement
        | null;

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
    <div
      class={`w-full flex gap-8 ${searchBarDrawer ? "gap-[unset]" : ""}`}
    >
      <form id={SEARCHBAR_INPUT_FORM_ID} action={ACTION} class={`join flex gap-[20px]   ${searchBarDrawer ? "my-5 w-full px-5" : ""}`}>
        <button
          type="submit"
          class="bg-transparent border-none"
          aria-label="Search"
          for={SEARCHBAR_INPUT_FORM_ID}
          tabIndex={-1}
        >
          <span class="loading loading-spinner loading-xs hidden [.htmx-request_&]:inline" />
          {searchBarDrawer ?
            <Icon id="search-drawer" class="inline [.htmx-request_&]:hidden" />
            :
            <Icon id="search" class="inline [.htmx-request_&]:hidden" />
          }
        </button>
        <input
          tabIndex={0}
          className={`lg:focus:w-[619px] 2xl:focus:w-[780px] xl:focus:w-[640px] focus:left-[calc(100%-72vw)] focus:top-[calc(100%-3.65vw)] focus:transform focus:-translate-x-[0vw] focus:transform focus:-translate-y-[0] rounded-[30px] outline-none py-[8.5px] px-5 placeholder-[#D3D3D3] ${searchBarDrawer ? "border border-[#D3D3D3] py-[5px] w-full" : ""}`}
          name={NAME}
          placeholder={placeholder}
          autocomplete="off"
          hx-target={`#${slot}`}
          hx-post={loader && useComponent<SuggestionProps>(Suggestions, {
            loader: asResolved(loader),
          })}
          hx-trigger={`input changed delay:300ms, ${NAME}`}
          hx-indicator={`#${SEARCHBAR_INPUT_FORM_ID}`}
          hx-swap="innerHTML"
        />
      </form>

      {/* Suggestions slot */}
      <div id={slot} />

      {/* Send search events as the user types */}
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