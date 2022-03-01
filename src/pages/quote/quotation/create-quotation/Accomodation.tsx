import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import DivAtom from "../../../../atoms/DivAtom";
import {
  formCreateMemberStyles,
  libraryStyles,
  libraryTableToolbarStyles,
} from "../../../../styles";
import H2Atom from "../../../../atoms/H2Atom";
import FormControlInput from "../../../../molecules/FormControlInput";
import TextFieldAtom from "../../../../atoms/TextFieldAtom";
import {
  QUOIATIONS_ACCOMODATION_DATA,
  QUOTATIONS_LOCATION_DATA,
} from "../../../../data";
import ButtonAtom from "../../../../atoms/ButtonAtom";
import CreateQuotationTable from "../../../../organisms/quote/quotation/CreateQuotationTable";

function Accomodation() {
  const [noOfDays, setNoOfDays] = useState(0);
  const [specification, setSpecification] = useState("");
  const [location, setLocation] = useState(QUOTATIONS_LOCATION_DATA[0].value);
  const [accomodation, setAccomodation] = useState(
    QUOIATIONS_ACCOMODATION_DATA[0].value
  );
  const [width, setWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [accomodationData, setAccomodationData] = useState<any>([]);
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

  const onCreateAccomodation = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.preventDefault();
    localStorage.setItem(
      "New Quote Accomodations",
      JSON.stringify({
        data: [
          ...accomodationData,
          [location, accomodation, noOfDays, specification, "$30", "$50"],
        ],
      })
    );

    setAccomodationData([
      ...accomodationData,
      [location, accomodation, noOfDays, specification, "$30", "$50"],
    ]);

    setNoOfDays(0);
    setSpecification("");
    setLocation(QUOTATIONS_LOCATION_DATA[0].value);
    setAccomodation(QUOIATIONS_ACCOMODATION_DATA[0].value);
  };

  return (
    <DivAtom style={{ height: containerHeight + "px" }}>
      <DivAtom
        style={{ ...formCreateMemberStyles.header, paddingLeft: "1rem" }}
      >
        <H2Atom style={formCreateMemberStyles.title} text="Add Accomodation" />
      </DivAtom>
      <DivAtom
        style={{
          ...formCreateMemberStyles.multiFieldContainer,
          flexDirection: width < 900 ? "column" : "row",
          padding: "1rem",
        }}
      >
        <TextFieldAtom
          variant="standard"
          size="medium"
          label="Location"
          value={location}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setLocation(e.target.value)
          }
          options={QUOTATIONS_LOCATION_DATA}
          adornmentposition="end"
          style={{
            flex: 1,
            width: width < 600 ? "100%" : "auto",
            margin: "0 1rem 1rem 0",
          }}
          disableUnderline={false}
          select
        />
        <TextFieldAtom
          variant="standard"
          size="medium"
          label="Accomodation"
          value={accomodation}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setAccomodation(e.target.value)
          }
          options={QUOIATIONS_ACCOMODATION_DATA}
          adornmentposition="end"
          style={{
            ...libraryStyles.textField,
            flex: 1,
            width: width < 600 ? "100%" : "auto",
            margin: "0 1rem 1rem 0",
          }}
          disableUnderline={false}
          select
        />
        <FormControlInput
          margin="0 1rem 1rem 0"
          flex={1}
          label="Number of Days"
          fullWidth
          type="number"
          multiline={false}
          rows={1}
          value={noOfDays}
          setValue={setNoOfDays}
          placeholder="Enter Number of Days"
        />
        <FormControlInput
          margin="0 0 1rem 0"
          flex={1}
          label="Specification"
          fullWidth
          multiline={false}
          rows={1}
          value={specification}
          setValue={setSpecification}
          placeholder="Enter Specification"
        />
        <ButtonAtom
          starticon={<AddCircleOutlineOutlinedIcon />}
          text="Add Accomodation"
          disabled={
            specification.trim() === "" ||
            accomodation === "" ||
            location === ""
          }
          onClick={(event) => onCreateAccomodation(event)}
          style={{
            ...libraryTableToolbarStyles.addBtn,
            width: width < 900 ? "100%" : "13rem",
            height: "3rem",
            marginLeft: width < 900 ? "0px" : "1rem",
            marginBottom: width < 900 ? "1rem" : "0",
          }}
          size="large"
        />
      </DivAtom>

      <DivAtom style={formCreateMemberStyles.tableContainer}>
        {accomodationData.length > 0 && (
          <CreateQuotationTable
            columns={[
              "LOCATION",
              "ACCOMODATION",
              "No OF DAYS",
              "SPECIFICATION",
            ]}
            data={accomodationData}
          />
        )}
      </DivAtom>

      <DivAtom
        style={{
          ...formCreateMemberStyles.addBtnContainer,
          padding: width < 768 ? "1rem" : "0px",
          margin:
            width < 768 ? "0px" : formCreateMemberStyles.addBtnContainer.margin,
        }}
      >
        <ButtonAtom
          size="large"
          text="Continue"
          disabled={accomodationData.length === 0}
          onClick={() => history.replace("/quote/quotations/create/costing")}
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

export default Accomodation;
