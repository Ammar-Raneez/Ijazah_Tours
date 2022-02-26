import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import DivAtom from "../../../atoms/DivAtom";
import { LIBRARY_DRIVER_DATA } from "../../../data";
import CreateDriver from "./CreateDriver";
import DriverTable from "./DriverTable";

function Driver() {
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
      style={{ backgroundColor: "#E5E5E5", padding: "1rem", display: "flex" }}
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
        <DivAtom>
          <Route path="/library/driver/create">
            <CreateDriver />
          </Route>
          <Route exact path="/library/driver">
            <DriverTable data={LIBRARY_DRIVER_DATA} />
          </Route>
        </DivAtom>
      </DivAtom>
    </DivAtom>
  );
}

export default Driver;
