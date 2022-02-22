interface ParaAtomProps {
  text: string;
  color: string;
  size: string;
  margin?: string;
  weight?: number;
}

function ParagraphAtom({ text, color, size, margin, weight }: ParaAtomProps) {
  return (
    <p style={{ color, fontSize: size, margin, fontWeight: weight }}>{text}</p>
  )
}

export default ParagraphAtom;
