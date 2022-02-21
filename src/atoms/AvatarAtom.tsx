import { Avatar } from '@mui/material';

interface AvatarAtomProps {
  image: string;
  alt: string;
  variant: 'square' | 'rounded';
}

function AvatarAtom({ image, alt, variant }: AvatarAtomProps) {
  return (
    <Avatar variant={variant} src={image} alt={alt} />
  );
}

export default AvatarAtom;