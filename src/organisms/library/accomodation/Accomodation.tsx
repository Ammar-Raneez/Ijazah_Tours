import ButtonAtom from "../../../atoms/ButtonAtom";
import TextFieldAtom from "../../../atoms/TextFieldAtom";
import DivAtom from "../../../atoms/DivAtom";
import { ChangeEvent, useEffect, useState } from "react";
import AccomodationTable from "./AccomodationTable";
import { LIBRARY_ACCOMODATION_DATA } from "../../../data";
import { Route } from "react-router-dom";
import CreateAccomodation from "./CreateAccomodation";

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
    <DivAtom style={styles.container}>
      <DivAtom
        style={{
          ...styles.innerContainer,
          height: containerHeight + "px",
        }}
      >
        <Route path="/library/accomodation/create">
          <CreateAccomodation />
        </Route>
        <Route exact path="/library/accomodation">
          <DivAtom style={styles.btnContainer}>
            <TextFieldAtom
              variant="standard"
              size="medium"
              label=""
              value={accomodationType}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setAccomodationType(e.target.value)
              }
              options={options}
              adornmentposition="end"
              style={styles.textField}
              select
            />
            <ButtonAtom
              text="Specification"
              style={{
                ...styles.btn,
                margin: "0 16px",
              }}
              onClick={() => null}
              size="large"
            />
            <ButtonAtom
              text="Location"
              style={styles.btn}
              onClick={() => null}
              size="large"
            />
          </DivAtom>
          <DivAtom>
            <AccomodationTable data={LIBRARY_ACCOMODATION_DATA} />
          </DivAtom>
        </Route>
      </DivAtom>
    </DivAtom>
  );
}

export default Accomodation;

const styles = {
  container: {
    backgroundColor: "#E5E5E5",
    padding: "1rem",
    display: "flex",
  },
  innerContainer: {
    backgroundColor: "white",
    borderRadius: "0.5rem",
    padding: "1rem",
    flex: 1,
    overflowX: "hidden" as const,
    overflowY: "scroll" as const,
  },
  btn: {
    color: "white",
    backgroundColor: "#6296E4",
    borderRadius: "0.5rem",
    width: "11rem",
    fontWeight: 600,
    filter: "drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.25))",
  },
  textField: {
    width: "11rem",
  },
  btnContainer: {
    justifyContent: "flex-start",
    marginBottom: "4rem",
    display: "flex",
  },
};
