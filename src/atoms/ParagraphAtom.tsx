interface ParaAtomProps {
  text: string | number;
  color: string;
  size: string;
  margin?: string;
  weight?: number;
  mark?: boolean;
  markstyle?: any;
}

function ParagraphAtom({
  text,
  color,
  size,
  margin,
  weight,
  mark,
  markstyle
}: ParaAtomProps) {
  return mark ? (
    <p style={{ color, fontSize: size, margin, fontWeight: weight }}>
      <mark style={markstyle}>{text}</mark>
    </p>
  ) : (
    <p style={{ color, fontSize: size, margin, fontWeight: weight }}>{text}</p>
  );
}

export default ParagraphAtom;
