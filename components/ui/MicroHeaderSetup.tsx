import { useEffect } from "preact/hooks";

interface Props {
  rootId?: string;
  threshold?: number;
}

// Variável global para indicar o estado do scroll
let isScrolling = false;

const debounce = <T extends (...args: unknown[]) => unknown>(fn: T) => {
  let frame: number;

  return (...params: Parameters<T>): void => {
    if (frame) {
      cancelAnimationFrame(frame);
    }

    frame = requestAnimationFrame(() => {
      fn(...params);
    });
  };
};

const storeHasScrolledPast = (root: HTMLElement, threshold: number) => {
  const hasScrolledPastThreshold = scrollY >= threshold;

  const previousValue = root.getAttribute("data-micro-header");

  if (previousValue === hasScrolledPastThreshold.toString()) return;

  root.setAttribute("data-micro-header", hasScrolledPastThreshold.toString());
};

const storeScrollState = (root: HTMLElement, prevScrollY: number) => {
  const isScrollingDown = globalThis.scrollY > prevScrollY;
  const isAtTop = globalThis.scrollY === 0;

  if (isScrollingDown) {
    root.classList.add("scrolling");
    isScrolling = true;
  } else if (isAtTop) {
    root.classList.remove("scrolling");
    isScrolling = false;
  }
};

const setup = ({ rootId, threshold = 100 }: Props) => {
  const root = document.getElementById(rootId);

  if (!root) {
    console.warn("Unable to find root element with id", rootId);
    return;
  }

  let prevScrollY = globalThis.scrollY;

  document.addEventListener(
    "scroll",
    debounce(() => {
      storeHasScrolledPast(root, threshold);
      storeScrollState(root, prevScrollY);

      prevScrollY = globalThis.scrollY;
    }),
    { passive: true },
  );

  storeHasScrolledPast(root, threshold);
};

function MicroHeaderSetup({ rootId, threshold }: Props) {
  useEffect(() => setup({ rootId, threshold }));

  return <div data-micro-header-controller-js />;
}

export default MicroHeaderSetup;
export { isScrolling };
