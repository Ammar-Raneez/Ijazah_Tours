import { CSSProperties } from 'react';

interface ParaAtomProps {
  text: string | number;
  mark?: boolean;
  style?: CSSProperties;
  markstyle?: CSSProperties;
}

function ParagraphAtom({
  text,
  style,
  mark,
  markstyle,
}: ParaAtomProps) {
  return mark ? (
    <p style={style}>
      <mark style={markstyle}>{text}</mark>
    </p>
  ) : (
    <p style={style}>{text}</p>
  );
}

export default ParagraphAtom;
