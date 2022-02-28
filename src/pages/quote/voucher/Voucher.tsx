import { useEffect, useState } from "react";
import DivAtom from "../../../atoms/DivAtom";
import { voucherStyles } from "../../../styles";

function Voucher() {
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
    <DivAtom style={voucherStyles.container}>
      <DivAtom
        style={{
          ...voucherStyles.innerContainer,
          height: containerHeight + "px",
        }}
      >
        Voucher
      </DivAtom>
    </DivAtom>
  );
}

export default Voucher;
