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
      <DivAtom display="flex" align="center">
        <IconAtom
          size="small"
          children={<ChevronLeftRoundedIcon />}
          textcolor="#0A65FF"
          padding="1rem"
          onClick={() => history.replace("/library/guest")}
        />
        <H2Atom
          margin="0px"
          text="Create Guest"
          color="#0A65FF"
          size="1.5rem"
        />
      </DivAtom>

      <DivAtom padding="1rem" display="flex" flexdirection="column">
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
          display="flex"
          justify="space-between"
          flexdirection={width < 600 ? "column" : "row"}
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
        margin="2rem 1rem 0 0"
        flexdirection={width < 768 ? "column" : "row"}
        display="flex"
        justify="space-between"
      >
        <ButtonAtom
          size="large"
          onClick={onAddGuest}
          width={width < 768 ? "100%" : "18%"}
          margin={width < 768 ? "0 0 1rem 0": "0px" }
          textcolor="white"
          backgroundcolor="#6296E4"
          borderradius="0.5rem"
          text="Create"
          filter="5px 5px 4px"
        />
        <ButtonAtom
          size="large"
          onClick={onAddReminder}
          width={width < 768 ? "100%" : "18%"}
          textcolor="white"
          backgroundcolor="#6296E4"
          borderradius="0.5rem"
          text="Add Reminder"
          filter="5px 5px 4px"
        />
      </DivAtom>
    </DivAtom>
  );
}

export default CreateGuest;
