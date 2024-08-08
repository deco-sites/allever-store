import { useUI } from "../sdk/useUI.ts";

interface ExpandableInputProps {
  placeholder: string;
  name: string;
  tabIndex?: number;
  slot?: string;
  autocomplete?:string
  loader?: any; // Ajuste o tipo de loader conforme necessário
  searchBarDrawer?: boolean;
  hxTarget?: string;
  hxPost?: string;
  hxTrigger?: string;
  hxIndicator?: string;
  hxSwap?: string;
  hxFocus?: string;
}

function ExpandableInput({
  placeholder,
  name,
  tabIndex = 0,
  slot,
  loader,
  hxTarget,
  autocomplete,
  hxPost,
  hxTrigger,
  hxIndicator,
  hxSwap,
  hxFocus
}: ExpandableInputProps) {
  // const { searchBarExpanded } = useUI();
  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      tabIndex={tabIndex}
      autocomplete={autocomplete}
      className={`transition-all duration-300 ease-in-out rounded-[30px] outline-none py-[8.5px] px-5 placeholder-[#D3D3D3] w-full`}
      // onClick={() => searchBarExpanded.value = true}
      // onBlur={() => searchBarExpanded.value = false}
      autoComplete="off"
      data-hx-target={hxTarget}
      data-hx-post={hxPost}
      data-hx-trigger={hxTrigger}
      data-hx-indicator={hxIndicator}
      data-hx-swap={hxSwap}
      data-hx-focus={hxFocus}
    />
  );
}

export default ExpandableInput;
