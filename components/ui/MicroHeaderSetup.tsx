import { useEffect } from "preact/hooks";

interface Props {
  rootId?: string;
  threshold?: number;
}

const setup = ({ rootId, threshold = 100 }: Props) => {
  const root = document.getElementById(rootId);

  if (!root) {
    console.warn("Unable to find root element with id", rootId);
    return;
  }

  const parsedUrl = new URL(window.location.href);
  const homePage = parsedUrl.pathname === "/";

  // console.log("homePage", homePage);

  if (homePage) {
    if (root.classList.contains("is-otherpage")) {
      root.classList.remove("is-otherpage");
    }
    root.classList.add("is-homepage");
  } else {
    if (root.classList.contains("is-homepage")) {
      root.classList.remove("is-homepage");
    }
    root.classList.add("is-otherpage");
  }

  document.addEventListener(
    "scroll",
    (e) => {
      if (globalThis.scrollY > threshold) {
        root.classList.add("is-scrolled");
      } else {
        root.classList.remove("is-scrolled");
      }
    },
  );
};

function MicroHeaderSetup({ rootId, threshold }: Props) {
  useEffect(() => setup({ rootId, threshold }));

  return <div data-micro-header-controller-js />;
}

export default MicroHeaderSetup;