import ButtonAtom from "../../atoms/ButtonAtom";
import TextFieldAtom from "../../atoms/TextFieldAtom";
import DivAtom from "../../atoms/DivAtom";
import { useEffect, useState } from "react";
import LibraryTable from "./LibraryTable";

const options = [
  { label: "Hotel", value: "Hotel" },
  { label: "Villa", value: "Villa" },
  { label: "Appartment", value: "Appartment" },
];

function Accomodation() {
  const [accomodationType, setAccomodationType] = useState(options[0].value);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    setContainerHeight(window.innerHeight - 180);
    const heightListener = window.addEventListener("resize", () => {
      setContainerHeight(window.innerHeight - 180);
    });

    const removeEventListeners = () => {
      window.removeEventListener("resize", heightListener as any);
    };

    return removeEventListeners();
  }, [containerHeight]);

  return (
    <DivAtom backgroundcolor="#E5E5E5" padding="1rem" display="flex">
      <DivAtom
        backgroundcolor="white"
        borderradius="0.5rem"
        padding="1rem"
        flex={1}
        overflowx="hidden"
        overflowy="scroll"
        height={containerHeight + "px"}
      >
        <DivAtom display="flex" justify="flex-start" margin="0 0 4rem 0">
          <TextFieldAtom
            variant="standard"
            size="medium"
            label=""
            value={accomodationType}
            onChange={(e: any) => setAccomodationType(e.target.value)}
            options={options}
            adornmentposition="end"
            width="11rem"
            select
          />
          <ButtonAtom
            text="Specification"
            textcolor="white"
            backgroundcolor="#6296E4"
            onClick={() => null}
            size="large"
            borderradius="0.5rem"
            width="11rem"
            weight={600}
            margin="0 16px 0 16px"
            filter="5px 5px 4px"
          />
          <ButtonAtom
            text="Location"
            textcolor="white"
            backgroundcolor="#6296E4"
            onClick={() => null}
            size="large"
            borderradius="0.5rem"
            width="11rem"
            weight={600}
            filter="5px 5px 4px"
          />
        </DivAtom>
        <DivAtom>
          <LibraryTable />
        </DivAtom>
      </DivAtom>
    </DivAtom>
  );
}

export default Accomodation;
