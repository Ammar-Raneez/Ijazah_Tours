import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import DivAtom from "../../../atoms/DivAtom";
import H2Atom from "../../../atoms/H2Atom";
import ButtonAtom from "../../../atoms/ButtonAtom";
import IconAtom from "../../../atoms/IconAtom";
import FormControlInput from "../../../molecules/FormControlInput";
import { libraryCreateGuestStyles } from "../../../styles";

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
      <DivAtom style={libraryCreateGuestStyles.header}>
        <IconAtom
          size="small"
          children={<ChevronLeftRoundedIcon />}
          style={libraryCreateGuestStyles.backBtn}
          onClick={() => history.replace("/library/guest")}
        />
        <H2Atom style={libraryCreateGuestStyles.title} text="Create Guest" />
      </DivAtom>

      <DivAtom style={libraryCreateGuestStyles.formContainer}>
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
            ...libraryCreateGuestStyles.multiFieldContainer,
            justifyContent: "space-between",
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
          ...libraryCreateGuestStyles.addBtnContainer,
          flexDirection: width < 768 ? "column" : "row",
          padding: width < 768 ? "1rem" : "0px",
          margin:
            width < 768
              ? "0px"
              : libraryCreateGuestStyles.addBtnContainer.margin,
        }}
      >
        <ButtonAtom
          size="large"
          onClick={onAddGuest}
          style={{
            ...libraryCreateGuestStyles.addBtn,
            width: width < 768 ? "100%" : "18%",
            margin: width < 768 ? "0 0 1rem 0" : "0 0 0 1rem",
          }}
          text="Create"
        />
        <ButtonAtom
          size="large"
          onClick={onAddReminder}
          style={{
            ...libraryCreateGuestStyles.addBtn,
            width: width < 768 ? "100%" : "18%",
          }}
          text="Add Reminder"
        />
      </DivAtom>
    </DivAtom>
  );
}

export default CreateGuest;
