interface H2AtomProps {
  text: string;
  color: string;
  size: string;
}

function H2Atom({ text, color, size }: H2AtomProps) {
  return (
    <h2 style={{ color: color, fontSize: size }}>{text}</h2>
  )
}

export default H2Atom;
