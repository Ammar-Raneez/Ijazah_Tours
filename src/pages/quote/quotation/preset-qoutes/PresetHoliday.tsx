import {
  useEffect,
  useState,
  MouseEvent,
} from 'react';

import { CircularProgress } from '@material-ui/core';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import {
  collection,
  getDocs,
} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import DivAtom from '../../../../atoms/DivAtom';
import H2Atom from '../../../../atoms/H2Atom';
import IconAtom from '../../../../atoms/IconAtom';
import { db } from '../../../../firebase';
import PresetForm from '../../../../organisms/quote/quotation/preset-quotes/PresetForm';
import { selectWith2NavbarHeight, selectWith2NavbarWidth } from '../../../../redux/containerSizeSlice';
import {
  fetchingDataIndicatorStyles,
  quoteCreateQuoteStyles,
} from '../../../../styles';
import { DropdownOption, SettingsLocation } from '../../../../utils/types';

function PresetQuote() {
  const height = useSelector(selectWith2NavbarHeight);
  const width = useSelector(selectWith2NavbarWidth);

  const [title, setTitle] = useState('');

  const history = useHistory();

  useEffect(() => {
    const getInitialData = () => {
      const storedHolidayData = localStorage.getItem('New Preset Quote Holiday');
      if (storedHolidayData) {
        const holData = JSON.parse(storedHolidayData).data[0];
        setTitle(holData[0]);
      }
    };

    getInitialData();
  }, []);

  const onCreateHoliday = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    event.preventDefault();

    localStorage.setItem(
      'New Preset Quote Holiday',
      JSON.stringify({
        data: [[
          title,
        ]],
      }),
    );

    history.replace('/quote/quotations/create/preset/accomodation');
  };

  return (
    <DivAtom style={{ height: `${height}px` }}>
      <DivAtom style={quoteCreateQuoteStyles.header}>
        <IconAtom
          size="small"
          children={<ChevronLeftRoundedIcon />}
          style={quoteCreateQuoteStyles.backBtn}
          onClick={() => history.replace('/quote/quotations')}
        />
        <H2Atom style={quoteCreateQuoteStyles.title} text="Create Preset Quote" />
      </DivAtom>

      <PresetForm
        width={width}
        title={title}
        onCreateHoliday={onCreateHoliday}
        setTitle={setTitle}
      />
    </DivAtom>
  );
}

export default PresetQuote;
