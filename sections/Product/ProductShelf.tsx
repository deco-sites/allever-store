export function LoadingFallback() {
  return (
    <div
      style={{ height: "631px" }}
      class="container flex flex-col gap-4 sm:gap-6 w-full py-5 sm:py-10"
    >
      <div style={{ height: "34px" }} class="skeleton w-full" />
      <div class="inline-flex gap-5 sm:gap-10 w-full overflow-x-hidden">
        <div style={{ minWidth: "300px", height: "480px" }} class="skeleton" />
        <div style={{ minWidth: "300px", height: "480px" }} class="skeleton" />
        <div style={{ minWidth: "300px", height: "480px" }} class="skeleton" />
        <div style={{ minWidth: "300px", height: "480px" }} class="skeleton" />
        <div style={{ minWidth: "300px", height: "480px" }} class="skeleton" />
      </div>
    </div>
  );
}

export { default } from "../../components/product/ProductShelf.tsx";
