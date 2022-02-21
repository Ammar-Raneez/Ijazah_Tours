interface H1AtomProps {
  text: string;
  color: string;
  size: string;
}

function H1Atom({ text, color, size }: H1AtomProps) {
  return (
    <h1 style={{ color: color, fontSize: size }}>{text}</h1>
  )
}

export default H1Atom;
