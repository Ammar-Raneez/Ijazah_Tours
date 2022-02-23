import DivAtom from "../../atoms/DivAtom";
import QuotationsTable from "./QuotationsTable";
import { QUOTATIONS_DUMMY_DATA } from "../../data";

function Quotations() {
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
        <QuotationsTable
          columns={["QUOTES", "EARNINGS", "COMMISION", "", ""]}
          rowdata={QUOTATIONS_DUMMY_DATA}
        />
      </DivAtom>
    </DivAtom>
  );
}

export default Quotations;
