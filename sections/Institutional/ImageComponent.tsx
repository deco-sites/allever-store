import { BaseBanner } from "../Images/components/types/types.ts";
import { useDevice } from "deco/hooks/useDevice.ts";

import Image from "apps/website/components/Image.tsx";

const ImageComponent = ({ ...base }: BaseBanner) => {
  const device = useDevice();
  return (
    <div class="my-8 px-5 flex justify-center container">
      {device === "desktop" &&
        (
          <Image
            src={base?.desktop?.Image}
            alt={base.Alt}
            width={base.desktop?.Width || "100%"}
            height={base.desktop?.Height}
            loading={base.Loading}
          />
        )}
      {device === "mobile" &&
        (
          <Image
            src={base?.mobile?.Image}
            alt={base.Alt}
            width={base.mobile?.Width || "100%"}
            height={base.mobile?.Height}
            loading={base.Loading}
          />
        )}
    </div>
  );
};

export default ImageComponent;
