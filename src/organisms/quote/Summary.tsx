import { useEffect, useState } from "react";
import DivAtom from "../../atoms/DivAtom";
import { summaryStyles } from "../../styles";

function Summary() {
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
    <DivAtom style={summaryStyles.container}>
      <DivAtom
        style={{
          ...summaryStyles.innerContainer,
          height: containerHeight + "px",
        }}
      >
        Summary
      </DivAtom>
    </DivAtom>
  );
}

export default Summary;

