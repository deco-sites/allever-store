interface Title {
  breadcrumb?: string;
  title?: string;
  hasAllever?: boolean;
}

const Title = ({ title, breadcrumb, hasAllever }: Title) => {
  return (
    <div class="container py-8 px-5">
      <div class="">
        <p class="text-xs flex gap-1">
          {breadcrumb}
        </p>
      </div>
      <h1 class="text-[20px] font-semibold text-black">
        {title} {hasAllever && <span class="text-primary">[allever]</span>}
      </h1>
    </div>
  );
};
export default Title;
