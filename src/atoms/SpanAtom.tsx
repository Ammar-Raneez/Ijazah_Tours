interface SpanAtomProps {
  text: string;
  color: string;
  size: string;
  margin: string;
  weight: number;
}

function SpanAtom({ text, color, size, margin, weight }: SpanAtomProps) {
  return (
    <span
      style={{
        color: color,
        fontSize: size,
        fontWeight: weight,
        margin: margin,
      }}
    >
      {text}
    </span>
  );
}

export default SpanAtom;
