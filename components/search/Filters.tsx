import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import Avatar from "../../components/ui/Avatar.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";

import Icon from "../ui/Icon.tsx";
import Collapsable from '../ui/Collapsable.tsx'
interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <li>
      <a href={url} rel="nofollow" class="flex items-center gap-2 py-3">
        <div aria-checked={selected} class="checkbox" />
        <span class="text-xs font-semibold">{label}</span>
        {/* {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>} */}
      </a>
    </li>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const avatars = key === "tamanho" || key === "cor";
  const flexDirection = avatars ? "flex-row items-center" : "flex-col";

  return (
    <ul class={clx(`flex flex-wrap gap-2 py-2`, flexDirection)}>
      {values.map((item) => {
        const { url, selected, value } = item;

        if (avatars) {
          return (
            <a href={url} rel="nofollow">
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  if (filters.length <= 0) {
    return null;
  }
  return (
    <ul class="flex flex-col gap-[10px] p-5 sm:p-0">
      {filters
        .filter(isToggle)
        .map((filter) => (
          <li class="flex flex-col gap-4 border-b border-gray-300">
            <Collapsable
              class=""
              title={
                <div class="flex items-center space-between py-[10px] gap-5 lg:gap-0">

                  <span>{filter.label}</span>
                  <div class="w-[14px] h-[14px]">
                    <Icon class="group-open:rotate-180 transition-all ease-in-out duration-[400ms]" id={'arrow-right'} size={13} />
                  </div>
                </div>
              }
            >
              <FilterValues {...filter} />
            </Collapsable>
          </li>
        ))}
    </ul>
  );
}

export default Filters;
