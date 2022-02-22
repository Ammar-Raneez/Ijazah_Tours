import Avatar from "@material-ui/core/Avatar";

interface AvatarAtomProps {
  image: string;
  alt: string;
  variant?: "square" | "rounded";
  size: number;
  margin: string;
}

function AvatarAtom({ image, alt, variant, size, margin }: AvatarAtomProps) {
  return (
    <Avatar
      style={{ width: size, height: size, margin }}
      variant={variant}
      src={image}
      alt={alt}
    />
  );
}

export default AvatarAtom;
