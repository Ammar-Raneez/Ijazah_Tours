import { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import Button from '@material-ui/core/Button';

interface ButtonAtomProps {
  text?: string;
  size: 'small' | 'medium' | 'large';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: 'submit';
  starticon?: ReactNode;
  endicon?: ReactNode;
  style?: CSSProperties;
}

function ButtonAtom({
  text,
  starticon,
  endicon,
  disabled,
  onClick,
  style,
  size,
  type,
}: ButtonAtomProps) {
  return (
    <Button
      onClick={onClick}
      style={{ ...style, textTransform: 'none' }}
      startIcon={starticon}
      endIcon={endicon}
      disabled={disabled}
      size={size}
      type={type}
    >
      {text}
    </Button>
  );
}

export default ButtonAtom;
