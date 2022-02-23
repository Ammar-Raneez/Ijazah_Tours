import DivAtom from "../../atoms/DivAtom";
import QuotationsTable from "./QuotationsTable";
import { QUOTATIONS_DUMMY_DATA } from "../../data";
import ButtonAtom from "../../atoms/ButtonAtom";
import { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputAtom from "../../atoms/InputAtom";

function Quotations() {
  const [search, setSearch] = useState("");
	const [width, setWidth] = useState(0);

	useEffect(() => {
		setWidth(window.innerWidth);
		const listener = window.addEventListener('resize', () => {
			setWidth(window.innerWidth);
		});

		return window.removeEventListener('resize', listener as any);
	}, [width])

  return (
    <DivAtom backgroundcolor="#E5E5E5" padding="1rem" display="flex">
      <DivAtom
        backgroundcolor="white"
        borderradius="0.5rem"
        padding="1rem"
        flex={1}
        overflowx="hidden"
        overflowy="hidden"
      >
        <DivAtom display="flex" justify="flex-start" margin="0 0 4rem 0">
          <ButtonAtom
            text="New Quote +"
            textcolor="white"
            backgroundcolor="#6296E4"
            onClick={() => null}
            size="large"
            borderradius="0.5rem"
            width="11rem"
            weight={600}
            margin="0 16px 0 0"
            filter="5px 5px 4px"
          />
          <ButtonAtom
            text="Compare Rates"
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
        <DivAtom
          display="flex"
          justify="space-between"
          margin="0 0 1rem 0"
          flexdirection={width < 768 ? "column" : "row"}
        >
          <DivAtom
            margin={width < 768 ? "0 0 16px 0" : "0"}
            flex={1}
            display="flex"
            justify="flex-start"
          >
            <ButtonAtom
              text="Approved Quotes"
              textcolor="white"
              backgroundcolor="#6296E4"
              onClick={() => null}
              size="large"
              borderradius="0.5rem"
              width="11rem"
              weight={600}
              margin="0 16px 0 0"
              filter="5px 5px 4px"
            />
            <ButtonAtom
              text="On Progress"
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
          <DivAtom
            flex={1}
            display="flex"
            justify={width < 768 ? "flex-start" : "flex-end"}
          >
            <InputAtom
              placeholder="Search"
              adornmentposition="start"
              fullWidth={width < 768}
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
              children={<SearchIcon />}
            />
            <ButtonAtom
              text="Search"
              textcolor="white"
              backgroundcolor="#6296E4"
              onClick={() => null}
              size="large"
              borderradius="0.5rem"
              width="11rem"
              weight={600}
              margin="0 0 0 16px"
            />
          </DivAtom>
        </DivAtom>
        <QuotationsTable
          columns={["QUOTES", "EARNINGS", "COMMISION", "", ""]}
          rowdata={QUOTATIONS_DUMMY_DATA}
        />
      </DivAtom>
    </DivAtom>
  );
}

export default Quotations;
