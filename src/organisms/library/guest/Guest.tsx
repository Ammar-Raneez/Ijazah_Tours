import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import DivAtom from "../../../atoms/DivAtom";
import CreateGuest from "./CreateGuest";
import { LIBRARY_GUEST_DATA } from "../../../data";
import GuestTable from "./GuestTable";

function Guest() {
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
        <DivAtom>
          <Route path="/library/guest/create">
            <CreateGuest />
          </Route>
          <Route exact path="/library/guest">
            <GuestTable data={LIBRARY_GUEST_DATA} />
          </Route>
        </DivAtom>
      </DivAtom>
    </DivAtom>
  );
}

export default Guest;

const styles = {
  container: {
    backgroundColor: "#E5E5E5",
    padding: "1rem",
    display: "flex",
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
