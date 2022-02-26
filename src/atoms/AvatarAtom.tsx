import Avatar from "@material-ui/core/Avatar";
import { CSSProperties } from "react";

interface AvatarAtomProps {
  image: string;
  alt: string;
  variant?: "square" | "rounded";
  style?: CSSProperties;
}

function AvatarAtom({ image, alt, variant, style }: AvatarAtomProps) {
  return (
    <Avatar
      style={style}
      variant={variant}
      src={image}
      alt={alt}
    />
  );
}

export default AvatarAtom;
