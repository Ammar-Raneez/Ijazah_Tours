import { Avatar } from "@mui/material";

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
      sx={{ width: size, height: size, margin: margin }}
      variant={variant}
      src={image}
      alt={alt}
    />
  );
}

export default AvatarAtom;
