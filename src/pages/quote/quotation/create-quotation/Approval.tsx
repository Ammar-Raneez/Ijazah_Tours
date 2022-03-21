import { MouseEvent, useEffect, useState } from 'react';

import CreateQuotationTable from '../../../../organisms/quote/quotation/CreateQuotationTable';
import ButtonAtom from '../../../../atoms/ButtonAtom';
import DivAtom from '../../../../atoms/DivAtom';
import H2Atom from '../../../../atoms/H2Atom';
import ParagraphAtom from '../../../../atoms/ParagraphAtom';
import { formCreateMemberStyles } from '../../../../styles';

function Approval() {
  const [width, setWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [accomodationData] = useState(
    JSON.parse(localStorage.getItem('New Quote Accomodations')!),
  );
  const [guestData] = useState(
    JSON.parse(localStorage.getItem('New Quote Customer')!),
  );

  useEffect(() => {
    setWidth(window.innerWidth);
    setContainerHeight(window.innerHeight - 220);
    const widthListener = window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
    const heightListener = window.addEventListener('resize', () => {
      setContainerHeight(window.innerHeight - 220);
    });

    const removeEventListeners = () => {
      window.removeEventListener('resize', widthListener as any);
      window.removeEventListener('resize', heightListener as any);
    };

    return removeEventListeners();
  }, [width, containerHeight]);

  const shareQuotation = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    event.preventDefault();
    // do the sharing process
  };

  return (
    <DivAtom style={{ height: `${containerHeight}px` }}>
      <DivAtom
        style={{
          ...formCreateMemberStyles.header,
          paddingLeft: '1rem',
          alignItems: 'flex-start',
          flexDirection: 'column',
        }}
      >
        <H2Atom style={formCreateMemberStyles.title} text="Approval" />
        <ParagraphAtom
          style={formCreateMemberStyles.subtitle}
          text="Guest Details"
        />
      </DivAtom>

      <DivAtom
        style={{
          ...formCreateMemberStyles.tableContainer,
          marginBottom: '1rem',
        }}
      >
        {accomodationData.data.length > 0 && (
          <CreateQuotationTable
            columns={[
              'REFERENCE NUMBER',
              'FIRST NAME',
              'LAST NAME',
              'CHECK IN',
              'CHECKOUT',
            ]}
            data={guestData.data}
          />
        )}
      </DivAtom>

      <DivAtom
        style={{
          ...formCreateMemberStyles.header,
          paddingLeft: '1rem',
        }}
      >
        <ParagraphAtom
          style={formCreateMemberStyles.subtitle}
          text="Accomodation Total"
        />
      </DivAtom>

      <DivAtom
        style={{
          ...formCreateMemberStyles.tableContainer,
          marginBottom: '1rem',
        }}
      >
        {accomodationData.data.length > 0 && (
          <CreateQuotationTable
            columns={[
              'LOCATION',
              'ACCOMODATION',
              'No OF DAYS',
              'SPECIFICATION',
              'ROOM RATE',
              'TOTAL',
            ]}
            data={accomodationData.data}
          />
        )}
      </DivAtom>

      <DivAtom
        style={{
          ...formCreateMemberStyles.header,
          paddingLeft: '1rem',
        }}
      >
        <ParagraphAtom
          style={formCreateMemberStyles.subtitle}
          text="Overall Total"
        />
      </DivAtom>

      <DivAtom style={formCreateMemberStyles.tableContainer}>
        {accomodationData.data.length > 0 && (
          <CreateQuotationTable
            columns={[
              'TRANSPORTATION/DAY',
              'No OF DAYS',
              'TOTAL PRICE',
              'SELLING PRICE',
              'DISCOUNT',
              'NET PRICE',
            ]}
            data={accomodationData.data}
          />
        )}
      </DivAtom>

      <DivAtom
        style={{
          ...formCreateMemberStyles.addBtnContainer,
          padding: width < 768 ? '1rem' : '0px',
          margin:
            width < 768 ? '0px' : formCreateMemberStyles.addBtnContainer.margin,
        }}
      >
        <ButtonAtom
          size="large"
          text="Share"
          onClick={(event) => shareQuotation(event)}
          style={{
            ...formCreateMemberStyles.addBtn,
            width: width < 768 ? '100%' : '18%',
            margin: '0 0 1rem 0',
          }}
        />
      </DivAtom>
    </DivAtom>
  );
}

export default Approval;
