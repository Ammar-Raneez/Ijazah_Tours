import { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import Button from '@material-ui/core/Button';

interface ButtonAtomProps {
  text?: string;
  size: 'small' | 'medium' | 'large';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  starticon?: ReactNode;
  style?: CSSProperties;
}

function ButtonAtom({
  text,
  starticon,
  disabled,
  onClick,
  style,
  size,
}: ButtonAtomProps) {
  return (
    <Button
      onClick={onClick}
      style={{ ...style, textTransform: 'none' }}
      startIcon={starticon}
      disabled={disabled}
      size={size}
    >
      {text}
    </Button>
  );
}

export default ButtonAtom;
