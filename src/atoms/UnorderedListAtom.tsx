interface UnorderedListAtomProps {
  allChildren: any[];
}

function UnorderedListAtom({
  allChildren,
}: UnorderedListAtomProps) {
  return (
    <ul>
      {allChildren.map((val, i) => <li key={i}>{val.title}</li>)}
    </ul>
  );
}

export default UnorderedListAtom;
