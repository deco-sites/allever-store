import { INavItem } from '../../components/header/NavItem.tsx'
import Icon from "../ui/Icon.tsx";
import Collapsable from './../ui/Collapsable.tsx';

export interface Props {
  navItems: INavItem[];
}


function MenuItem({ item }: { item: INavItem }) {
  return (
    <Collapsable
      title={
        <div className={`${item.ishighlighted ? "text-[#123ADD] font-semibold" : "text-black"} flex items-center justify-between group`}>
          <a href={item.url} class={`h-[61px] flex items-center  text-sm ${item.isBold && "font-semibold"}`}>
            {item.icon ? <Icon class="mr-[10px]" id={item.icon} /> : null}
            {item.name}
          </a>
          {item?.children && item?.children.length > 0 && <Icon class="group-open:rotate-180 transition-all ease-in-out duration-[400ms]" id={'arrow-right'} />}
        </div>
      }
    >

      {item.children && (
        <ul>
          {item.children.map((node, index) => (
            <li key={index}>
              <a href={node.url} class="h-[61px] flex items-center  text-[#888888] text-sm">
                {node.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </Collapsable>
  );
}


function Menu({ navItems }: Props) {
  return (
    <>
      <div class="flex flex-col h-full overflow-y-scroll no-scrollbar">
        <ul class="px-4  flex-grow flex flex-col bg-white divide-y divide-[#D3D3D3]">
          {navItems.map((item) => (
            <li>
              <MenuItem item={item} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Menu;