import { HTMLWidget } from "apps/admin/widgets.ts";

interface Props {
  html?: HTMLWidget;
}

const Text = ({ html }: Props) => {
  return (
    <>
      {html && (
        <div
          class="text-sm mb-8 container px-5"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </>
  );
};

export default Text;
