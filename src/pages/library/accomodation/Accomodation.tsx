import { ChangeEvent, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import ButtonAtom from '../../../atoms/ButtonAtom';
import TextFieldAtom from '../../../atoms/TextFieldAtom';
import DivAtom from '../../../atoms/DivAtom';
import AccomodationTable from '../../../organisms/library/accomodation/AccomodationTable';
import { LIBRARY_ACCOMODATION_DATA } from '../../../data';
import CreateAccomodation from './CreateAccomodation';
import { libraryStyles } from '../../../styles';

const options = [
  { label: 'Hotel', value: 'Hotel' },
  { label: 'Villa', value: 'Villa' },
  { label: 'Appartment', value: 'Appartment' },
];

function Accomodation() {
  const [accomodationType, setAccomodationType] = useState(options[0].value);
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
          <DivAtom style={libraryStyles.btnContainer}>
            <TextFieldAtom
              variant="standard"
              size="medium"
              label=""
              value={accomodationType}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setAccomodationType(e.target.value)
              }
              options={options}
              adornmentposition="end"
              style={libraryStyles.textField}
              select
            />
            <ButtonAtom
              text="Specification"
              style={{
                ...libraryStyles.btn,
                margin: '0 16px',
              }}
              onClick={() => null}
              size="large"
            />
            <ButtonAtom
              text="Location"
              style={libraryStyles.btn}
              onClick={() => null}
              size="large"
            />
          </DivAtom>
          <DivAtom>
            <AccomodationTable data={LIBRARY_ACCOMODATION_DATA} />
          </DivAtom>
        </Route>
      </DivAtom>
    </DivAtom>
  );
}

export default Accomodation;
