import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import DivAtom from "../../../atoms/DivAtom";
import H2Atom from "../../../atoms/H2Atom";
import ButtonAtom from "../../../atoms/ButtonAtom";
import IconAtom from "../../../atoms/IconAtom";
import FormControlInput from "../../../molecules/FormControlInput";

function CreateGuest() {
  const [refNum, setRefNum] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [occupation, setOccupation] = useState("");
  const [width, setWidth] = useState(0);
  const history = useHistory();

  useEffect(() => {
    setWidth(window.innerWidth);
    const widthListener = window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });

    const removeEventListeners = () => {
      window.removeEventListener("resize", widthListener as any);
    };

    return removeEventListeners();
  }, [width]);

  const onAddGuest = async () => {};

  const onAddReminder = async () => {};

  return (
    <DivAtom>
      <DivAtom style={styles.header}>
        <IconAtom
          size="small"
          children={<ChevronLeftRoundedIcon />}
          style={styles.backBtn}
          onClick={() => history.replace("/library/guest")}
        />
        <H2Atom style={styles.title} text="Create Guest" />
      </DivAtom>

      <DivAtom style={styles.formContainer}>
        <FormControlInput
          margin="0 0 1rem 0"
          label="Reference Number"
          fullWidth
          multiline={false}
          rows={1}
          value={refNum}
          setValue={setRefNum}
          placeholder="Enter Reference Number"
        />
        <DivAtom
          style={{
            ...styles.addressNameContainer,
            flexDirection: width < 600 ? "column" : "row",
          }}
        >
          <FormControlInput
            margin="0 1rem 1rem 0"
            flex={1}
            label="First Name"
            fullWidth
            multiline={false}
            rows={1}
            value={firstName}
            setValue={setFirstName}
            placeholder="Enter First Name"
          />
          <FormControlInput
            margin="0 0 1rem 0"
            flex={1}
            label="Last Name"
            fullWidth
            multiline={false}
            rows={1}
            value={lastName}
            setValue={setLastName}
            placeholder="Enter Last Name"
          />
        </DivAtom>
        <FormControlInput
          margin="0 0 1rem 0"
          label="Occupation"
          fullWidth
          multiline={false}
          rows={1}
          value={occupation}
          setValue={setOccupation}
          placeholder="Enter Occupation"
        />
        <FormControlInput
          margin="0 0 1rem 0"
          label="Contact Number"
          fullWidth
          multiline={false}
          rows={1}
          value={contactNumber}
          setValue={setContactNumber}
          placeholder="Enter Contact Number"
        />
      </DivAtom>

      <DivAtom
        style={{
          ...styles.addBtnContainer,
          flexDirection: width < 768 ? "column" : "row",
        }}
      >
        <ButtonAtom
          size="large"
          onClick={onAddGuest}
          style={{
            ...styles.addBtn,
            width: width < 768 ? "100%" : "18%",
            marginLeft: width < 768 ? "1rem" : "0px",
          }}
          text="Create"
        />
        <ButtonAtom
          size="large"
          onClick={onAddReminder}
          style={{
            ...styles.addBtn,
            width: width < 768 ? "100%" : "18%",
          }}
          text="Add Reminder"
        />
      </DivAtom>
    </DivAtom>
  );
}

export default CreateGuest;

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    margin: "0px",
    color: "#0A65FF",
    fontSize: "1.5rem",
  },
  formContainer: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column" as const,
  },
  addressNameContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  addBtnContainer: {
    margin: "2rem 1rem 0 0",
    display: "flex",
    justifyContent: "space-between",
  },
  backBtn: {
    color: "#0A65FF",
    padding: "1rem",
  },
  addBtn: {
    color: "white",
    backgroundColor: "#6296E4",
    borderRadius: "0.5rem",
    fontWeight: 600,
    filter: "drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.25))",
  },
};
