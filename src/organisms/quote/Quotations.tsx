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
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    setContainerHeight(window.innerHeight - 180);
    const widthListener = window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
    const heightListener = window.addEventListener("resize", () => {
      setContainerHeight(window.innerHeight - 180);
    });

    const removeEventListeners = () => {
      window.removeEventListener("resize", widthListener as any);
      window.removeEventListener("resize", heightListener as any);
    };

    return removeEventListeners();
  }, [width, containerHeight]);

  return (
    <DivAtom
      style={{ display: "flex", padding: "1rem", backgroundColor: "#E5E5E5" }}
    >
      <DivAtom
        style={{
          backgroundColor: "white",
          borderRadius: "0.5rem",
          padding: "1rem",
          flex: 1,
          overflowX: "hidden",
          overflowY: "scroll",
          height: containerHeight + "px",
        }}
      >
        <DivAtom
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "4rem",
          }}
        >
          <ButtonAtom
            text="New Quote +"
            style={{
              color: "white",
              backgroundColor: "#6296E4",
              borderRadius: "0.5rem",
              width: "11rem",
              fontWeight: 600,
              marginRight: "16px",
              filter: "drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.25))",
            }}
            onClick={() => null}
            size="large"
          />
          <ButtonAtom
            text="Compare Rates"
            style={{
              color: "white",
              backgroundColor: "#6296E4",
              borderRadius: "0.5rem",
              width: "11rem",
              fontWeight: 600,
              filter: "drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.25))",
            }}
            onClick={() => null}
            size="large"
          />
        </DivAtom>
        <DivAtom
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
            flexDirection: width < 768 ? "column" : "row",
          }}
        >
          <DivAtom
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flex: 1,
              margin: width < 768 ? "0 0 16px 0" : "0",
            }}
          >
            <ButtonAtom
              text="Approved Quotes"
              style={{
                color: "white",
                backgroundColor: "#6296E4",
                borderRadius: "0.5rem",
                width: "11rem",
                fontWeight: 600,
                marginRight: "16px",
                filter: "drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.25))",
              }}
              onClick={() => null}
              size="large"
            />
            <ButtonAtom
              text="On Progress"
              style={{
                color: "white",
                backgroundColor: "#6296E4",
                borderRadius: "0.5rem",
                width: "11rem",
                fontWeight: 600,
                filter: "drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.25))",
              }}
              onClick={() => null}
              size="large"
            />
          </DivAtom>
          <DivAtom
            style={{
              display: "flex",
              justifyContent: width < 768 ? "flex-start" : "flex-end",
              flex: 1,
            }}
          >
            <InputAtom
              placeholder="Search"
              adornmentposition="start"
              fullWidth={width < 768}
              value={search}
              plain="false"
              onChange={(e: any) => setSearch(e.target.value)}
              children={<SearchIcon />}
            />
            <ButtonAtom
              text="Search"
              style={{
                color: "white",
                backgroundColor: "#6296E4",
                borderRadius: "0.5rem",
                width: "11rem",
                fontWeight: 600,
                marginLeft: "16px",
                filter: "drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.25))",
              }}
              onClick={() => null}
              size="large"
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
