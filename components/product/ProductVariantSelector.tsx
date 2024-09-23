import type { Product } from "apps/commerce/types.ts";
import { clx } from "../../sdk/clx.ts";
import { relative } from "../../sdk/url.ts";
import { useId } from "../../sdk/useId.ts";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import { useSection } from "@deco/deco/hooks";
interface Props {
    product: Product;
}
const colors: Record<string, string | undefined> = {
    "White": "white",
    "Black": "black",
    "Gray": "gray",
};
const useStyles = (value: string, checked: boolean) => {
    if (colors[value]) {
        return clx("h-8 w-8 block", "border border-base-300", "ring-2 ring-offset-2", checked ? "ring-primary" : "ring-transparent");
    }
    return clx("p-3 rounded-[10px] text-xs font-bold w-max", checked && "bg-[#123ADD] text-white ", !checked && "bg-[#D3D3D3] text-black ");
};
export const Ring = ({ value, checked = false, class: _class }: {
    value: string;
    checked?: boolean;
    class?: string;
}) => {
    const color = colors[value];
    const styles = clx(useStyles(value, checked), _class);
    return (<span style={{ backgroundColor: color }} class={`${styles} w-full flex`}>
      {color ? null : value}
    </span>);
};
function VariantSelector({ product }: Props) {
    const { url, isVariantOf } = product;
    const hasVariant = isVariantOf?.hasVariant ?? [];
    const possibilities = useVariantPossibilities(hasVariant, product);
    const relativeUrl = relative(url);
    const id = useId();
    if (Object.keys(possibilities).length === 0)
        return null;
    return (<ul class="flex flex-col gap-4" hx-target="closest section" hx-swap="outerHTML" hx-sync="this:replace">
      {Object.keys(possibilities).map((name) => (<li class="flex flex-col gap-2">
          <span class="text-base font-bold mb-0 lg:mb-5 uppercase">{name}</span>
          <ul class="flex flex-row gap-2 mb-[10px] flex-wrap">
            {Object.entries(possibilities[name])
                .filter(([value]) => value)
                .map(([value, link]) => {
                const relativeLink = relative(link);
                const checked = relativeLink === relativeUrl;
                return (<li>
                    <label class="cursor-pointer grid grid-cols-1 grid-rows-1 place-items-center" hx-get={useSection({ href: relativeLink })}>
                      {/* Checkbox for radio button on the frontend */}
                      <input class="hidden peer" type="radio" name={`${id}-${name}`} checked={checked}/>
                      <div class={clx("col-start-1 row-start-1 col-span-1 row-span-1 ", "[.htmx-request_&]:opacity-0 transition-opacity")}>
                        <Ring value={value} checked={checked}/>
                      </div>
                      {/* Loading spinner */}
                      <div class={clx("col-start-1 row-start-1 col-span-1 row-span-1", "opacity-0 [.htmx-request_&]:opacity-100 transition-opacity", "flex justify-center items-center")}>
                        <span class="loading loading-sm loading-spinner"/>
                      </div>
                    </label>
                  </li>);
            })}
          </ul>
        </li>))}
    </ul>);
}
export default VariantSelector;
