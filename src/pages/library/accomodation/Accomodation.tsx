import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

import CreateAccomodation from './CreateAccomodation';
import AccomodationTable from '../../../organisms/library/accomodation/AccomodationTable';
import DivAtom from '../../../atoms/DivAtom';
import { LIBRARY_ACCOMODATION_DATA } from '../../../data';
import { libraryStyles } from '../../../styles';

function Accomodation() {
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    setContainerHeight(window.innerHeight - 180);
    const heightListener = window.addEventListener('resize', () => {
      setContainerHeight(window.innerHeight - 180);
    });

    const removeEventListeners = () => {
      window.removeEventListener('resize', heightListener as any);
    };

    return removeEventListeners();
  }, [containerHeight]);

  return (
    <DivAtom style={libraryStyles.container}>
      <DivAtom
        style={{
          ...libraryStyles.innerContainer,
          height: `${containerHeight}px`,
        }}
      >
        <Route path="/library/accomodation/create">
          <CreateAccomodation />
        </Route>
        <Route exact path="/library/accomodation">
          <DivAtom>
            <AccomodationTable data={LIBRARY_ACCOMODATION_DATA} />
          </DivAtom>
        </Route>
      </DivAtom>
    </DivAtom>
  );
}

export default Accomodation;
