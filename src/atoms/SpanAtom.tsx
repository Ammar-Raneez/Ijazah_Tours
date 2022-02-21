interface SpanAtomProps {
  text: string;
  color: string;
  size: string;
}

function SpanAtom({ text, color, size }: SpanAtomProps) {
  return (
    <span style={{ color: color, fontSize: size }}>{text}</span>
  )
}

export default SpanAtom;
