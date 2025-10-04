import type { ReactElement } from "react";

interface CoverImgPreviewProps {
  src?: string;
  alt?: string;
}

export default function CoverImgPreview({
  src,
  alt = "cover image",
}: Readonly<CoverImgPreviewProps>): ReactElement {
  return (
    <div>
      <img
        src={src}
        alt={alt}
        className="w-full aspect-video cover object-center border-1 border-neutral-700"
      />
    </div>
  );
}
