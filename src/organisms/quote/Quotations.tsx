import DivAtom from "../../atoms/DivAtom";
import QuotationsTable from "./QuotationsTable";
import { QUOTATIONS_DUMMY_DATA } from "../../data";
import ButtonAtom from "../../atoms/ButtonAtom";
import { ChangeEvent, useEffect, useState } from "react";
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
    <DivAtom style={styles.container}>
      <DivAtom
        style={{
          ...styles.innerContainer,
          height: containerHeight + "px",
        }}
      >
        <DivAtom style={styles.btnMainContainer}>
          <ButtonAtom
            text="New Quote +"
            style={{
              ...styles.btn,
              marginRight: "16px",
            }}
            onClick={() => null}
            size="large"
          />
          <ButtonAtom
            text="Compare Rates"
            style={styles.btn}
            onClick={() => null}
            size="large"
          />
        </DivAtom>
        <DivAtom
          style={{
            ...styles.btnSubContainer,
            flexDirection: width < 768 ? "column" : "row",
          }}
        >
          <DivAtom
            style={{
              ...styles.btnSubInnerContainer,
              margin: width < 768 ? "0 0 16px 0" : "0",
            }}
          >
            <ButtonAtom
              text="Approved Quotes"
              style={{
                ...styles.btn,
                marginRight: "16px",
              }}
              onClick={() => null}
              size="large"
            />
            <ButtonAtom
              text="On Progress"
              style={styles.btn}
              onClick={() => null}
              size="large"
            />
          </DivAtom>
          <DivAtom
            style={{
              ...styles.btnSubInnerContainer,
              justifyContent: width < 768 ? "flex-start" : "flex-end",
            }}
          >
            <InputAtom
              placeholder="Search"
              adornmentposition="start"
              fullWidth={width < 768}
              value={search}
              plain="false"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              children={<SearchIcon />}
            />
            <ButtonAtom
              text="Search"
              style={{
                ...styles.btn,
                marginLeft: "16px",
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

const styles = {
  container: {
    display: "flex",
    padding: "1rem",
    backgroundColor: "#E5E5E5",
  },
  innerContainer: {
    backgroundColor: "white",
    borderRadius: "0.5rem",
    padding: "1rem",
    flex: 1,
    overflowX: "hidden" as const,
    overflowY: "scroll" as const,
  },
  btnMainContainer: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "4rem",
  },
  btnSubContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  btnSubInnerContainer: {
    display: "flex",
    justifyContent: "flex-start",
    flex: 1,
  },
  btn: {
    color: "white",
    backgroundColor: "#6296E4",
    borderRadius: "0.5rem",
    width: "11rem",
    fontWeight: 600,
    filter: "drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.25))",
  },
};
