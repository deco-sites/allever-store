import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";
import { useSection } from "deco/hooks/useSection.ts";
import Alert from "../../components/header/Alert.tsx";
import Bag from "../../components/header/Bag.tsx";
import Menu from "../../components/header/Menu.tsx";
import NavItem from "../../components/header/NavItem.tsx";
import SignIn from "../../components/header/SignIn.tsx";
import Searchbar, {
  type SearchbarProps,
} from "../../components/search/Searchbar/Form.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Modal from "../../components/ui/Modal.tsx";
import {INavItem} from "../../components/header/NavItem.tsx"
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
  NAVBAR_HEIGHT_MOBILE,
  SEARCHBAR_DRAWER_ID,
  SEARCHBAR_POPUP_ID,
  SIDEMENU_CONTAINER_ID,
  SIDEMENU_DRAWER_ID,
} from "../../constants.ts";

import Wishlist from "../../components/header/Wishlist.tsx";

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
}

type Props = Omit<SectionProps, "alert" | "variant">;

const Desktop = (
  { logo, searchbar }: Props,
) => (
  <>
    <div
      class="absolute top-0 bg-base-100 container"
      style={{ marginTop: HEADER_HEIGHT_MOBILE }}
    >

    </div>

    <div class="flex flex-col gap-4 py-[45px] container">
      <div class="flex items-center space-between">

        <div>
          <label
            for={SIDEMENU_DRAWER_ID}
            class="flex items-center text-white justify-start gap-[10px]"
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
            <Drawer.Aside title="Menu" drawer={SIDEMENU_DRAWER_ID} sizeMenu={true}>
              <div
                id={SIDEMENU_CONTAINER_ID}
                class="h-full flex items-center justify-center"
              >
                <span class="loading loading-spinner" />
              </div>
            </Drawer.Aside>
          }
        />

        <div class="place-self-center">
          <a href="/" aria-label="Store logo">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width || 100}
              height={logo.height || 23}
            />
          </a>
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
        <Drawer.Aside title="Buscar" drawer={SEARCHBAR_DRAWER_ID} background="bg-[#123ADD]" color="text-white">
          <div class="w-screen overflow-y-auto">
            <Searchbar {...searchbar} searchBarDrawer={true} />
          </div>
        </Drawer.Aside>
      }
    />
    <Drawer
      id={SIDEMENU_DRAWER_ID}
      aside={
        <Drawer.Aside title="Menu" drawer={SIDEMENU_DRAWER_ID} sizeMenu={true}>
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
      class="flex place-items-center w-screen px-5 gap-4 pt-[18px]"
      style={{
        height: NAVBAR_HEIGHT_MOBILE,
      }}
    >
      <label
        for={SIDEMENU_DRAWER_ID}
        class="btn btn-square btn-sm btn-ghost justify-start mt-[5px]"
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
    <div class="pb-5 pt-[10px]">
      <label
        class="px-5 flex items-center gap-[15px]"
        for={SEARCHBAR_DRAWER_ID}
        aria-label="search icon button"
      >
        <Icon id="search" />
        <div class="bg-white w-full m-auto rounded-[33px] h-[30px]">
        </div>
      </label>
    </div>
  </>
);

function Header({
  alerts = [],
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
      style={{
        height: device === "desktop"
          ? HEADER_HEIGHT_DESKTOP
          : HEADER_HEIGHT_MOBILE,
      }}
      // Refetch the header in two situations
      // 1. When the window is resized so we have a gracefull Developer Experience
      // 2. When the user changes tab, so we can update the minicart badge when the user comes back
      hx-trigger="resize from:window, visibilitychange[document.visibilityState === 'visible'] from:document"
      hx-get={useSection()}
      hx-target="closest section"
      hx-swap="outerHTML"
    >
      <div class="bg-[#123ADD] fixed w-full z-40">
        {alerts.length > 0 && <Alert alerts={alerts} />}
        {device === "desktop"
          ? <Desktop logo={logo} {...props} />
          : <Mobile logo={logo} {...props} />}
      </div>
    </header>
  );
}

export default function Section({ variant, ...props }: SectionProps) {
  if (variant === "menu") {
    return <Menu navItems={props.navItems ?? []} />;
  }

  return <Header {...props} />;
}