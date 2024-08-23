import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";
import { useSection } from "deco/hooks/useSection.ts";
import Alert from "../../components/header/Alert.tsx";
import Bag from "../../components/header/Bag.tsx";
import Menu from "../../components/header/Menu.tsx";
import SignIn from "../../components/header/SignIn.tsx";
import Searchbar, {
  type SearchbarProps,
} from "../../components/search/Searchbar/Form.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Icon from "../../components/ui/Icon.tsx";
import MicroHeaderSetup from "../../islands/MicroHeaderSetup.tsx";
import { INavItem, MenuHeader } from "../../components/header/NavItem.tsx";
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
  NAVBAR_HEIGHT_MOBILE,
  SEARCHBAR_DRAWER_ID,
  SIDEMENU_CONTAINER_ID,
  SIDEMENU_DRAWER_ID,
} from "../../constants.ts";

import Wishlist from "../../components/header/Wishlist.tsx";

import { useScript } from "apps/utils/useScript.ts";
import { Head } from "$fresh/runtime.ts";
import Logo from "../../components/header/Logo.tsx";
import type { AppContext } from "../../apps/site.ts";

function script() {
  const param = 10;
  return (
    <Head>
      <script
        type="module"
        src={useScript((value) => {
          // console.log(value);
        }, param)}
      />
    </Head>
  );
}
script();

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}

export interface SectionProps {
  alerts?: HTMLWidget[];

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */

  navItems?: INavItem[] | null;
  /**
   * @title Searchbar
   * @description Searchbar configuration
   */
  searchbar: SearchbarProps;

  /** @title Logo */
  logo: Logo;

  /** @hide true */
  variant?: "initial" | "menu";

  /**
   *  @title Ativar sticky?
   *  @description: Se ativo, o background do header fica azul sempre que a página é rolada. No entanto, se a página estiver no topo,
   *  o background fica transparente.
   */
  isSticky?: boolean;
}

type Props = Omit<SectionProps, "alert" | "variant">;

const Desktop = (
  { logo, searchbar }: Props,
) => (
  <>
    <div class="flex flex-col gap-4 py-4 container desktop">
      <div class="flex items-center space-between relative">
        <div>
          <label
            for={SIDEMENU_DRAWER_ID}
            class="flex items-center text-white justify-start gap-[10px] cursor-pointer"
            aria-label="open menu"
            hx-target={`#${SIDEMENU_CONTAINER_ID}`}
            hx-swap="outerHTML"
            hx-trigger="click once"
            hx-get={useSection({ props: { variant: "menu" } })}
          >
            <Icon id="menu" class="mt-[2px]" />
            Todos os departamentos
          </label>
        </div>
        <Drawer
          id={SIDEMENU_DRAWER_ID}
          aside={
            <Drawer.Aside
              layout="menu"
              drawer={SIDEMENU_DRAWER_ID}
              sizeMenu={true}
            >
              <div
                id={SIDEMENU_CONTAINER_ID}
                class="h-full flex items-center justify-center"
              >
                <span class="loading loading-spinner" />
              </div>
            </Drawer.Aside>
          }
        />

        <div class="main-logo">
          <Logo src={logo.src} alt={logo.alt} />
        </div>

        <div class="flex gap-4 items-center place-self-end">
          <Searchbar {...searchbar} />
          <SignIn variant="desktop" />
          <Wishlist />
          <Bag />
        </div>
      </div>
    </div>
  </>
);

const Mobile = ({ logo, searchbar }: Props) => (
  <>
    <Drawer
      id={SEARCHBAR_DRAWER_ID}
      aside={
        <Drawer.Aside
          layout="searchBar"
          title="Buscar"
          drawer={SEARCHBAR_DRAWER_ID}
          background="bg-[#123ADD]"
          color="text-white"
        >
          <div class="w-screen overflow-y-auto">
            <Searchbar {...searchbar} searchBarDrawer={true} />
          </div>
        </Drawer.Aside>
      }
    />
    <Drawer
      id={SIDEMENU_DRAWER_ID}
      aside={
        <Drawer.Aside
          layout="menu"
          title="Menu"
          drawer={SIDEMENU_DRAWER_ID}
          sizeMenu={true}
        >
          <div
            id={SIDEMENU_CONTAINER_ID}
            class="h-full flex items-center justify-center"
          >
            <span class="loading loading-spinner" />
          </div>
        </Drawer.Aside>
      }
    />

    <div
      class="flex flex-col place-items-center w-screen px-5 gap-4 py-5"
      style={{
        height: NAVBAR_HEIGHT_MOBILE,
      }}
    >
      <div class="flex justify-between w-full">
        <label
          for={SIDEMENU_DRAWER_ID}
          class="btn btn-square btn-sm btn-ghost justify-start"
          aria-label="open menu"
          hx-target={`#${SIDEMENU_CONTAINER_ID}`}
          hx-swap="outerHTML"
          hx-trigger="click once"
          hx-get={useSection({ props: { variant: "menu" } })}
        >
          <Icon id="menu" />
        </label>

        {logo && (
          <a
            href="/"
            class="flex-grow inline-flex items-center justify-center"
            aria-label="Store logo"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width || 100}
              height={logo.height || 13}
            />
          </a>
        )}

        <div class="flex gap-[15px] items-center max-h-[30px]">
          <SignIn variant="mobile" />
          <Bag />
        </div>
      </div>

      <div class="w-full">
        <label
          class="flex items-center gap-[15px]"
          for={SEARCHBAR_DRAWER_ID}
          aria-label="search icon button"
        >
          <Icon id="search" />
          <div class="bg-white w-full m-auto rounded-[33px] h-[30px]">
          </div>
        </label>
      </div>
    </div>
  </>
);

function Header({
  alerts = [],
  isSticky,
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11097/3e00d53d-696d-4266-972b-c5c50c5ac2f3",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  ...props
}: Props) {
  const device = useDevice();

  return (
    <header
      hx-trigger="resize from:window, visibilitychange[document.visibilityState === 'visible'] from:document"
      hx-get={useSection()}
      hx-target="closest section"
      hx-swap="outerHTML"
    >
      {alerts.length > 0 && <Alert alerts={alerts} />}
      <div
        id="header"
        class={`bg-transparent w-full z-40 group-header ease-in duration-500 ${
          isSticky && "bg-[#123ADD]"
        }`}
      >
        {device === "desktop"
          ? <Desktop logo={logo} {...props} />
          : <Mobile logo={logo} {...props} />}
      </div>
      <MicroHeaderSetup rootId="header" threshold={50} />
    </header>
  );
}

export default function Section({ variant, ...props }: SectionProps) {
  if (variant === "menu") {
    return <Menu navItems={props.navItems ?? []} />;
  }

  return <Header {...props} />;
}
