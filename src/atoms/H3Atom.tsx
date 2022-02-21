interface H3AtomProps {
  text: string;
  color: string;
  size: string;
}

function H3Atom({ text, color, size }: H3AtomProps) {
  return (
    <h3 style={{ color: color, fontSize: size }}>{text}</h3>
  )
}

export default H3Atom;
