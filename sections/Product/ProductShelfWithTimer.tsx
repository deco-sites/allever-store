export function LoadingFallback() {
    return (
      <div class="container px-0 lg:px-5">
        <div
          style={{ height: "555px" }}
          class="flex flex-col gap-4 sm:gap-6 w-full"
        >
          <div class="px-5 sm:px-0">
            <div style={{ height: "34px" }} class="skeleton w-full" />
          </div>
          <div class="inline-flex gap-[0.5rem] lg:gap-5 w-full overflow-x-hidden">
            <div
              style={{ minWidth: "300px", height: "480px" }}
              class="skeleton ml-5 sm:ml-0"
            />
            <div
              style={{ minWidth: "300px", height: "480px" }}
              class="skeleton"
            />
            <div
              style={{ minWidth: "300px", height: "480px" }}
              class="skeleton"
            />
            <div
              style={{ minWidth: "300px", height: "480px" }}
              class="skeleton"
            />
            <div
              style={{ minWidth: "300px", height: "480px" }}
              class="skeleton mr-5 sm:mr-0"
            />
          </div>
        </div>
      </div>
    );
  }
  
  export { default, loader } from "../../components/product/ProductShelfWithTimer.tsx";
  