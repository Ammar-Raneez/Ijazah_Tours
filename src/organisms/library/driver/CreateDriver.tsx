import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import DivAtom from "../../../atoms/DivAtom";
import H2Atom from "../../../atoms/H2Atom";
import ButtonAtom from "../../../atoms/ButtonAtom";
import ImageUploader from "./ImageUpload";
import IconAtom from "../../../atoms/IconAtom";
import FormControlInput from "../../../molecules/FormControlInput";

function CreateDriver() {
  const [refNum, setRefNum] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [occupation, setOccupation] = useState("");
  const [license, setLicense] = useState([]);
  const [profilePic, setProfilePic] = useState([]);
  const [vehiclePic, setVehiclePic] = useState([]);
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

  const onAddDriver = async () => {};

  return (
    <DivAtom>
      <DivAtom style={{ display: "flex", alignItems: "center" }}>
        <IconAtom
          size="small"
          children={<ChevronLeftRoundedIcon />}
          style={{ color: "#0A65FF", padding: "1rem" }}
          onClick={() => history.replace("/library/driver")}
        />
        <H2Atom
          style={{ margin: "0px", color: "#0A65FF", fontSize: "1.5rem" }}
          text="Create Driver"
        />
      </DivAtom>

      <DivAtom
        style={{ padding: "1rem", display: "flex", flexDirection: "column" }}
      >
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
            display: "flex",
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
        <DivAtom
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: width < 600 ? "column" : "row",
          }}
        >
          <FormControlInput
            margin="0 1rem 1rem 0"
            label="Address Line 01"
            fullWidth
            flex={1}
            multiline={false}
            rows={1}
            value={address}
            setValue={setAddress}
            placeholder="Enter Address Line 01"
          />
          <FormControlInput
            margin="0 0 1rem 0"
            label="Address Line 02"
            fullWidth
            flex={1}
            multiline={false}
            rows={1}
            value={address2}
            setValue={setAddress2}
            placeholder="Enter Address Line 02"
          />
        </DivAtom>
        <FormControlInput
          margin="0 0 1rem 0"
          label="City"
          fullWidth
          multiline={false}
          rows={1}
          value={city}
          setValue={setCity}
          placeholder="Enter City"
        />
      </DivAtom>

      <DivAtom>
        <ImageUploader
          license={license}
          setLicense={setLicense}
          profilePic={profilePic}
          setProfilePic={setProfilePic}
          vehiclePic={vehiclePic}
          setVehiclePic={setVehiclePic}
        />
      </DivAtom>

      <DivAtom style={{ margin: "2rem 1rem 0 0", display: "flex", justifyContent: "flex-end" }}>
        <ButtonAtom
          size="large"
          onClick={onAddDriver}
          style={{
            width: width < 768 ? "100%" : "18%",
            color: "white",
            backgroundColor: "#6296E4",
            borderRadius: "0.5rem",
            filter: "drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.25))",
          }}
          text="Create"
        />
      </DivAtom>
    </DivAtom>
  );
}

export default CreateDriver;
