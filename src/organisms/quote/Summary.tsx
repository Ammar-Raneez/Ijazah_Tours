import DivAtom from "../../atoms/DivAtom";

function Summary() {
  return (
    <DivAtom backgroundcolor="#E5E5E5" padding="1rem" display="flex">
      <DivAtom
        backgroundcolor="white"
        borderradius="0.5rem"
        padding="1rem"
        flex={1}
      >
        Summary
      </DivAtom>
    </DivAtom>
  );
}

export default Summary;
