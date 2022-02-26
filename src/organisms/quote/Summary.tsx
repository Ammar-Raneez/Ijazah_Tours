import { useEffect, useState } from "react";
import DivAtom from "../../atoms/DivAtom";

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
    <DivAtom style={styles.container}>
      <DivAtom
        style={{
          ...styles.innerContainer,
          height: containerHeight + "px",
        }}
      >
        Summary
      </DivAtom>
    </DivAtom>
  );
}

export default Summary;

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
};
