interface ParaAtomProps {
  text: string;
  color: string;
  size: string;
}

function ParagraphAtom({ text, color, size }: ParaAtomProps) {
  return (
    <p style={{ color: color, fontSize: size }}>{text}</p>
  )
}

export default ParagraphAtom;
