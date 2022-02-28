import { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import DivAtom from "../../../../atoms/DivAtom";
import H2Atom from "../../../../atoms/H2Atom";
import ButtonAtom from "../../../../atoms/ButtonAtom";
import IconAtom from "../../../../atoms/IconAtom";
import FormControlInput from "../../../../molecules/FormControlInput";
import {
  formCreateMemberStyles,
  libraryStyles,
  libraryTableToolbarStyles,
} from "../../../../styles";
import TextFieldAtom from "../../../../atoms/TextFieldAtom";
import { QUOTATIONS_REFERENCE_DATA } from "../../../../data";

const options = [
  { label: "Hotel", value: "Hotel" },
  { label: "Villa", value: "Villa" },
  { label: "Appartment", value: "Appartment" },
];

function Customer() {
  const [refNum, setRefNum] = useState(QUOTATIONS_REFERENCE_DATA[0].value);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [age, setAge] = useState(0);
  const [width, setWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [holidayType, setHolidayType] = useState(options[0].value);
  const history = useHistory();

  useEffect(() => {
    setWidth(window.innerWidth);
    setContainerHeight(window.innerHeight - 220);
    const widthListener = window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
    const heightListener = window.addEventListener("resize", () => {
      setContainerHeight(window.innerHeight - 220);
    });

    const removeEventListeners = () => {
      window.removeEventListener("resize", widthListener as any);
      window.removeEventListener("resize", heightListener as any);
    };

    return removeEventListeners();
  }, [width, containerHeight]);

  return (
    <DivAtom style={{ height: containerHeight + "px" }}>
      <DivAtom style={formCreateMemberStyles.header}>
        <IconAtom
          size="small"
          children={<ChevronLeftRoundedIcon />}
          style={formCreateMemberStyles.backBtn}
          onClick={() => history.replace("/quote/quotations")}
        />
        <H2Atom style={formCreateMemberStyles.title} text="Create Quotation" />
      </DivAtom>

      <DivAtom style={formCreateMemberStyles.formContainer}>
        <DivAtom
          style={{
            ...formCreateMemberStyles.multiFieldContainer,
            flexDirection: width < 600 ? "column" : "row",
          }}
        >
          <TextFieldAtom
            variant="standard"
            size="medium"
            label="Reference Number"
            value={refNum}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setRefNum(e.target.value)
            }
            options={QUOTATIONS_REFERENCE_DATA}
            adornmentposition="end"
            style={{
              ...libraryStyles.textField,
              flex: 1,
              width: width < 600 ? "100%" : "auto",
            }}
            select
          />
          <Link to={`/library/guest/create`}>
            <ButtonAtom
              starticon={<AddCircleOutlineOutlinedIcon />}
              text="Add New Guest"
              style={{
                ...libraryTableToolbarStyles.addBtn,
                width: width < 600 ? "100%" : "11rem",
                marginTop: "1rem",
                marginLeft: width < 600 ? "0px" : "1rem",
              }}
              size="large"
            />
          </Link>
        </DivAtom>
        <DivAtom
          style={{
            ...formCreateMemberStyles.multiFieldContainer,
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
            ...formCreateMemberStyles.multiFieldContainer,
            flexDirection: width < 600 ? "column" : "row",
          }}
        >
          <FormControlInput
            type="number"
            margin="0 1rem 1rem 0"
            flex={1}
            label="No. of Adults"
            fullWidth
            multiline={false}
            rows={1}
            value={adults}
            setValue={setAdults}
            placeholder="Enter No. of Adults"
          />
          <FormControlInput
            type="number"
            margin="0 1rem 1rem 0"
            flex={1}
            label="No. of Children"
            fullWidth
            multiline={false}
            rows={1}
            value={children}
            setValue={setChildren}
            placeholder="Enter No. of Children"
          />
          <FormControlInput
            type="number"
            margin="0 0 1rem 0"
            flex={1}
            label="Total Age"
            disabled
            fullWidth
            multiline={false}
            rows={1}
            value={age}
            setValue={setAge}
            placeholder=""
          />
        </DivAtom>
        <DivAtom
          style={{
            ...formCreateMemberStyles.multiFieldContainer,
            flexDirection: width < 600 ? "column" : "row",
          }}
        >
          <FormControlInput
            margin="0 1rem 1rem 0"
            type="number"
            flex={1}
            label="No. of Days"
            fullWidth
            multiline={false}
            rows={1}
            value={numberOfDays}
            setValue={setNumberOfDays}
            placeholder=""
          />
          <TextFieldAtom
            variant="standard"
            size="medium"
            label="Holiday Type"
            value={holidayType}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setHolidayType(e.target.value)
            }
            options={options}
            adornmentposition="end"
            style={{
              ...libraryStyles.textField,
              flex: 1,
              width: width < 600 ? "100%" : "auto",
            }}
            select
          />
        </DivAtom>
      </DivAtom>
      <DivAtom
        style={{
          ...formCreateMemberStyles.addBtnContainer,
          padding: width < 768 ? "1rem" : "0px",
          margin: width < 768 ? "0px" : formCreateMemberStyles.addBtnContainer.margin,
        }}
      >
        <ButtonAtom
          size="large"
          text="Continue"
          onClick={() =>
            history.replace("/quote/quotations/create/accomodation")
          }
          style={{
            ...formCreateMemberStyles.addBtn,
            width: width < 768 ? "100%" : "18%",
            margin: width < 768 ? "0 0 1rem 0" : "0 0 1rem 0",
          }}
        />
      </DivAtom>
    </DivAtom>
  );
}

export default Customer;
