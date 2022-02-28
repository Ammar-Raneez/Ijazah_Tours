import DivAtom from "../../../atoms/DivAtom";
import QuotationsTable from "../../../organisms/quote/quotation/QuotationsTable";
import { QUOTATIONS_DUMMY_DATA } from "../../../data";
import ButtonAtom from "../../../atoms/ButtonAtom";
import { ChangeEvent, useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputAtom from "../../../atoms/InputAtom";
import { quotationsStyles } from "../../../styles";

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
    <DivAtom style={quotationsStyles.container}>
      <DivAtom
        style={{
          ...quotationsStyles.innerContainer,
          height: containerHeight + "px",
        }}
      >
        <DivAtom style={quotationsStyles.btnMainContainer}>
          <ButtonAtom
            text="New Quote +"
            style={{
              ...quotationsStyles.btn,
              marginRight: "16px",
            }}
            onClick={() => null}
            size="large"
          />
          <ButtonAtom
            text="Compare Rates"
            style={quotationsStyles.btn}
            onClick={() => null}
            size="large"
          />
        </DivAtom>
        <DivAtom
          style={{
            ...quotationsStyles.btnSubContainer,
            flexDirection: width < 768 ? "column" : "row",
          }}
        >
          <DivAtom
            style={{
              ...quotationsStyles.btnSubInnerContainer,
              margin: width < 768 ? "0 0 16px 0" : "0",
            }}
          >
            <ButtonAtom
              text="Approved Quotes"
              style={{
                ...quotationsStyles.btn,
                marginRight: "16px",
              }}
              onClick={() => null}
              size="large"
            />
            <ButtonAtom
              text="On Progress"
              style={quotationsStyles.btn}
              onClick={() => null}
              size="large"
            />
          </DivAtom>
          <DivAtom
            style={{
              ...quotationsStyles.btnSubInnerContainer,
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
                ...quotationsStyles.btn,
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

