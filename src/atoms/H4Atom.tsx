interface H4AtomProps {
  text: string;
  color: string;
  size: string;
}

function H4Atom({ text, color, size }: H4AtomProps) {
  return (
    <h4 style={{ color: color, fontSize: size }}>{text}</h4>
  )
}

export default H4Atom;
