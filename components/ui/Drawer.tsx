import { useScript } from "apps/utils/useScript.ts";
import { type ComponentChildren } from "preact";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import Icon from "./Icon.tsx";

export interface Props {
  open?: boolean;
  class?: string;
  children?: ComponentChildren;
  aside: ComponentChildren;
  id?: string;
}

const script = (id: string) => {
  const handler = (e: KeyboardEvent) => {
    if (e.key !== "Escape" && e.keyCode !== 27) {
      return;
    }

    const input = document.getElementById(id) as HTMLInputElement | null;

    if (!input) {
      return;
    }

    input.checked = false;
  };

  addEventListener("keydown", handler);
};

function Drawer({
  children,
  aside,
  open,
  class: _class = "",
  id = useId(),
}: Props) {
  return (
    <>
      <div class={clx("drawer", _class)}>
        <input
          id={id}
          name={id}
          checked={open}
          type="checkbox"
          class="drawer-toggle"
          aria-label={open ? "open drawer" : "closed drawer"}
        />

        <div class="drawer-content">
          {children}
        </div>

        <aside
          data-aside
          class={clx(
            "drawer-side h-full z-40 overflow-hidden",
            "[[data-aside]&_section]:contents", // lazy-loading via useSection
          )}
        >
          <label for={id} />
          {aside}
        </aside>
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(script, id) }}
      />
    </>
  );
}

function Aside(
  { title, drawer, children, background = "bg-white", color, sizeMenu, sizeMinicart }: {
    title?: string;
    drawer: string;
    children: ComponentChildren;
    background?: string;
    color?: string;
    sizeMenu?: boolean;
    sizeMinicart?: boolean;
  },
) {
  return (
    <div
      data-aside
      class={`bg-base-100 grid grid-rows-[auto_1fr] h-full divide-y w-full 
      ${sizeMenu ? "max-w-[388px]" : ""} 
      ${sizeMinicart ? "max-w-[390px] lg:max-w-[445px]" : ""}`}

    >
      <div class={`flex justify-between items-center ${background} lg:${sizeMinicart ? "max-w-[390px] lg:max-w-[445px] w-full" : ""}   ${sizeMenu ? "max-w-[388px]" : ""}`}>
        {title ?
          <h1 class="p-5">
            <span class={`font-medium text-[16px] ${color}`}>{title}</span>
          </h1>
          : null}
        <label for={drawer} aria-label="X" class="btn btn-ghost">
          {background === "bg-[#FFFFFF]" ? <Icon id="close-white" /> : <Icon id="close" />}
        </label>
      </div>
      {children}
    </div>
  );
}

Drawer.Aside = Aside;

export default Drawer;
