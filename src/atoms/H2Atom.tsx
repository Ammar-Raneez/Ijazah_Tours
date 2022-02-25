interface H2AtomProps {
  text: string;
  color: string;
  margin: string;
  size: string;
}

function H2Atom({ text, color, margin, size }: H2AtomProps) {
  return (
    <h2 style={{ color, margin, fontSize: size }}>{text}</h2>
  )
}

export default H2Atom;
