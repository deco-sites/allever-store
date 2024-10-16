import Icon from "../ui/Icon.tsx";
import Collapsable from "./../ui/Collapsable.tsx";

/** @titleBy name */
export interface Children {
  /** @title Texto */
  name: string;
  /** @title Link */
  url: string;
}
/** @titleBy name */
export interface INavItem {
  /** @title Texto */
  name: string;
  /** @title Link */
  url?: string;
  /** @title Filhos */
  children?: Children[];
  /** @title Item possui destaque? */
  ishighlighted?: boolean;
}
export interface Props {
  navItems: INavItem[];
}

function MenuItem({ item }: { item: INavItem }) {
  return (
    <Collapsable 
      title={
        <div
          className={`${
            item.ishighlighted ? "text-[#123ADD] font-semibold" : "text-black"
          } flex items-center justify-between group`}
        >
          <a
            href={item.url}
            class="h-[61px] flex items-center text-sm"
          >
            {item.name}
          </a>
          {item?.children && item?.children.length > 0 && (
            <Icon
              class="group-open:rotate-180 transition-all ease-in-out duration-[400ms]"
              id="arrow-right"
            />
          )}
        </div>
      }
    >
      <>
        {item.children && (
          <ul>
            {item.children.map((node, index) => (
              <li key={index}>
                <a
                  href={node.url}
                  class="h-[61px] flex items-center  text-[#888888] text-sm"
                >
                  {node.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </>
    </Collapsable>
  );
}

function Menu({ navItems }: Props) {
  return (
    <div class="bg-white min-h-screen">
      <div class="text-signature-blue font-semibold px-4">
        <a
          href="/login"
          class="h-[61px] flex items-center font-semibold text-sm border-b border-b-middle-gray"
        >
          <Icon class="mr-[10px]" id="account_blue" />
          Entre ou cadastre-se
        </a>
        <a
          href="/atendimento"
          class="h-[61px] flex items-center font-semibold text-sm border-b border-b-middle-gray"
        >
          <Icon class="mr-[10px]" id="sac" />
          Atendimento
        </a>
      </div>
      <div class="flex flex-col">
        <ul class="px-4 flex-grow flex flex-col divide-y divide-[#D3D3D3]">
          {navItems.map((item) => (
            <li>
              <MenuItem item={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Menu;
