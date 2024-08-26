import { HTMLWidget } from "apps/admin/widgets.ts";

interface Props {
  html?: HTMLWidget;
}

const Text = ({ html }: Props) => {
  return (
    <>
      {html && (
        <div
          class="text-sm mb-[25px] container px-5 lg:px-0"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </>
  );
};

export default Text;
