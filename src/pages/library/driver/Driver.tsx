import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import DivAtom from "../../../atoms/DivAtom";
import { LIBRARY_DRIVER_DATA } from "../../../data";
import { libraryStyles } from "../../../styles";
import CreateDriver from "./CreateDriver";
import DriverTable from "../../../organisms/library/driver/DriverTable";

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
    <DivAtom style={libraryStyles.container}>
      <DivAtom
        style={{
          ...libraryStyles.innerContainer,
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

