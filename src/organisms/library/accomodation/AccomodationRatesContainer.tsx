import { ChangeEvent, MouseEventHandler } from 'react';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import AccomodationPriceTable from './AccomodationPriceTable';
import FormControlInput from '../../../molecules/FormControlInput';
import ButtonAtom from '../../../atoms/ButtonAtom';
import DivAtom from '../../../atoms/DivAtom';
import H2Atom from '../../../atoms/H2Atom';
import TextFieldAtom from '../../../atoms/TextFieldAtom';
import { AccomodationRate } from '../../../utils/types';
import {
  libraryAccomodationStyles,
  libraryStyles,
  TableToolbarStyles,
} from '../../../styles';

interface AccomodationRatesContainerProps {
  width: number;
  newRateStart: string;
  newRateEnd: string;
  newMealPlan: string;
  newSinglePrice: string;
  newDoublePrice: string;
  newTriplePrice: string;
  rateData: AccomodationRate[];
  deleteRate: ((row: AccomodationRate) => Promise<void>) | ((row: AccomodationRate) => void);
  onCreateRate: MouseEventHandler<HTMLButtonElement>;
  setNewRateStart: any;
  setNewRateEnd: any;
  setNewMealPlan: any;
  setNewSinglePrice: any;
  setNewDoublePrice: any;
  setNewTriplePrice: any;
}

function AccomodationRatesContainer({
  width,
  newRateStart,
  newRateEnd,
  newMealPlan,
  newSinglePrice,
  newDoublePrice,
  newTriplePrice,
  setNewRateStart,
  setNewRateEnd,
  setNewMealPlan,
  setNewSinglePrice,
  setNewDoublePrice,
  setNewTriplePrice,
  rateData,
  onCreateRate,
  deleteRate,
}: AccomodationRatesContainerProps) {
  return (
    <>
      <H2Atom style={libraryAccomodationStyles.title} text="Rates" />
      <DivAtom
        style={{
          ...libraryAccomodationStyles.multiFieldContainer,
          flexDirection: width < 1000 ? 'column' : 'row',
          marginTop: '1rem',
        }}
      >
        <TextFieldAtom
          variant="standard"
          size="medium"
          label="Start Date"
          value={newRateStart}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNewRateStart(e.target.value)}
          adornmentPosition="end"
          style={{
            ...libraryStyles.textField,
            flex: 1,
            width: width < 1000 ? '100%' : 'auto',
            margin: width < 1000 ? '0 0 1rem 0' : '0 1rem 0 0',
          }}
          disableUnderline={false}
          select={false}
          focused
          type="date"
        />
        <TextFieldAtom
          variant="standard"
          size="medium"
          label="End Date"
          value={newRateEnd}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNewRateEnd(e.target.value)}
          adornmentPosition="end"
          style={{
            ...libraryStyles.textField,
            flex: 1,
            width: width < 1000 ? '100%' : 'auto',
            margin: width < 1000 ? '0 0 1rem 0' : '0 1rem 1rem 0',
          }}
          disableUnderline={false}
          select={false}
          focused
          type="date"
        />
        <FormControlInput
          margin={width < 1000 ? '0 0 1rem 0' : '0 1rem 1rem 0'}
          flex={1}
          label="Meal Plan"
          fullWidth
          multiline={false}
          rows={1}
          value={newMealPlan}
          setValue={setNewMealPlan}
          placeholder="Enter Meal Plan"
        />
        <FormControlInput
          margin={width < 1000 ? '0 0 1rem 0' : '0 1rem 1rem 0'}
          flex={1}
          label="Single Price"
          fullWidth
          multiline={false}
          rows={1}
          value={newSinglePrice}
          setValue={setNewSinglePrice}
          placeholder="Enter Single Price"
        />
        <FormControlInput
          margin={width < 1000 ? '0 0 1rem 0' : '0 1rem 1rem 0'}
          flex={1}
          label="Double Price"
          fullWidth
          multiline={false}
          rows={1}
          value={newDoublePrice}
          setValue={setNewDoublePrice}
          placeholder="Enter Double Price"
        />
        <FormControlInput
          margin="0 0 1rem 0"
          flex={1}
          label="Triple Price"
          fullWidth
          multiline={false}
          rows={1}
          value={newTriplePrice}
          setValue={setNewTriplePrice}
          placeholder="Enter Triple Price"
        />
        <ButtonAtom
          startIcon={<AddCircleOutlineOutlinedIcon />}
          text={width < 1000 ? 'Add Rate' : 'Add'}
          disabled={
            newRateStart === ''
            || newRateEnd === ''
            || newMealPlan === ''
            || newSinglePrice === ''
            || newDoublePrice === ''
            || newTriplePrice === ''
          }
          onClick={(event) => onCreateRate(event)}
          style={{
            ...TableToolbarStyles.addBtn,
            width: width < 1000 ? '100%' : 'auto',
            height: '3rem',
            marginLeft: width < 1000 ? '0px' : '1rem',
            marginBottom: width < 1000 ? '1rem' : '0',
          }}
          size="large"
        />
      </DivAtom>
      <DivAtom style={libraryAccomodationStyles.tableContainer}>
        {rateData.length > 0 && (
          <AccomodationPriceTable
            columns={[
              'START DATE',
              'END DATE',
              'MEAL PLAN',
              'SINGLE',
              'DOUBLE',
              'TRIPLE',
              '',
            ]}
            data={rateData}
            deleteRate={deleteRate}
          />
        )}
      </DivAtom>
    </>
  );
}

export default AccomodationRatesContainer;
