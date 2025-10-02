import type { ReactElement } from "react";

interface CoverImgPreviewProps {
  src: string;
  alt: string;
}

export default function CoverImgPreview({
  src,
  alt,
}: Readonly<CoverImgPreviewProps>): ReactElement {
  return (
    <div>
      <img
        src={src}
        alt={alt}
        className="w-full aspect-video cover object-center"
      />
    </div>
  );
}
