import { useEffect, useState } from "react";
import DivAtom from "../../../atoms/DivAtom";
import { LIBRARY_CUSTOMER_DATA } from "../../../data";
import CustomerTable from "./CustomerTable";

function Customer() {
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    setContainerHeight(window.innerHeight - 180);
    const heightListener = window.addEventListener("resize", () => {
      setContainerHeight(window.innerHeight - 180);
    });

    const removeEventListeners = () => {
      window.removeEventListener("resize", heightListener as any);
    };

    return removeEventListeners();
  }, [containerHeight]);

  return (
    <DivAtom backgroundcolor="#E5E5E5" padding="1rem" display="flex">
      <DivAtom
        backgroundcolor="white"
        borderradius="0.5rem"
        padding="1rem"
        flex={1}
        overflowx="hidden"
        overflowy="scroll"
        height={containerHeight + "px"}
      >
        <DivAtom>
          <CustomerTable data={LIBRARY_CUSTOMER_DATA} />
        </DivAtom>
      </DivAtom>
    </DivAtom>
  );
}

export default Customer;
