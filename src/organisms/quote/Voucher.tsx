import { useEffect, useState } from "react";
import DivAtom from "../../atoms/DivAtom";

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
        Voucher
      </DivAtom>
    </DivAtom>
  );
}

export default Voucher;
