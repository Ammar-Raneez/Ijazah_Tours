import { ChangeEvent, MouseEvent } from 'react';
import { CircularProgress, FormControl, InputLabel } from '@material-ui/core';

import AccomodationRatesContainer from './AccomodationRatesContainer';
import FormControlInput from '../../../molecules/FormControlInput';
import CheckboxGroup from '../../../molecules/CheckboxGroup';
import DivAtom from '../../../atoms/DivAtom';
import ParagraphAtom from '../../../atoms/ParagraphAtom';
import InputAtom from '../../../atoms/InputAtom';
import ButtonAtom from '../../../atoms/ButtonAtom';
import { formCreateMemberStyles } from '../../../styles';
import { AccomodationRate } from '../../../utils/types';

const allRoomTypes = [
  'Cilantro Suite',
  'Executive Room',
  'Premium Room',
];

const allRoomViews = [
  'Cilantro Suite',
  'Executive Room',
  'Premium Room',
];

const allRoomGradings = [
  '5 Star',
  '2 Star',
  '3 Star',
];

interface CreateEditAccomodationFormProps {
  rateData: AccomodationRate[];
  width: number;
  showValidationErrorMessage: boolean;
  btnText: string;
  location: string;
  city: string;
  group: string;
  name: string;
  contactNumber: string;
  email: string;
  webLink: string;
  ijazahLink: string;
  newRateStart: string;
  newRateEnd: string;
  newMealPlan: string;
  newSinglePrice: string;
  newDoublePrice: string;
  newTriplePrice: string;
  isCreating: boolean;
  selectedTypes: string[];
  roomCategories: boolean[];
  roomViews: boolean[];
  roomGradings: boolean[];
  selectedTypeValues: { [k: string]: any };
  addRoomCategory: (i: number) => void;
  addRoomView: (i: number) => void;
  addRoomGradings: (i: number) => void;
  onSetSelectedTypeValue: (type: string, val: string) => void;
  onCreateRate: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  onAddEditAccomodation: () => Promise<void>;
  setLocation: any;
  setCity: any;
  setGroup: any;
  setName: any;
  setContactNumber: any;
  setEmail: any;
  setWebLink: any;
  setIjazahLink: any;
  setNewRateStart: any,
  setNewRateEnd: any,
  setNewMealPlan: any,
  setNewSinglePrice: any,
  setNewDoublePrice: any,
  setNewTriplePrice: any,
}

function CreateEditAccomodationForm({
  rateData,
  width,
  btnText,
  showValidationErrorMessage,
  location,
  city,
  group,
  name,
  contactNumber,
  email,
  webLink,
  ijazahLink,
  newRateStart,
  newRateEnd,
  newMealPlan,
  newSinglePrice,
  newDoublePrice,
  newTriplePrice,
  isCreating,
  selectedTypes,
  roomCategories,
  roomViews,
  roomGradings,
  selectedTypeValues,
  addRoomCategory,
  addRoomView,
  addRoomGradings,
  onSetSelectedTypeValue,
  onCreateRate,
  onAddEditAccomodation,
  setLocation,
  setCity,
  setGroup,
  setName,
  setContactNumber,
  setEmail,
  setWebLink,
  setIjazahLink,
  setNewRateStart,
  setNewRateEnd,
  setNewMealPlan,
  setNewSinglePrice,
  setNewDoublePrice,
  setNewTriplePrice,
}: CreateEditAccomodationFormProps) {
  return (
    <>
      <DivAtom style={formCreateMemberStyles.formContainer}>
        <DivAtom
          style={{
            ...formCreateMemberStyles.multiFieldContainer,
            flexDirection: width < 600 ? 'column' : 'row',
          }}
        >
          <FormControlInput
            margin={width < 600 ? '0 0 1rem 0' : '0 1rem 1rem 0'}
            flex={1}
            label="Location"
            fullWidth
            multiline={false}
            rows={1}
            value={location}
            setValue={setLocation}
            placeholder="Enter Location"
          />
          <FormControlInput
            margin="0 0 1rem 0"
            flex={1}
            label="City"
            fullWidth
            multiline={false}
            rows={1}
            value={city}
            setValue={setCity}
            placeholder="Enter City"
          />
        </DivAtom>
        <DivAtom
          style={{
            ...formCreateMemberStyles.multiFieldContainer,
            flexDirection: width < 600 ? 'column' : 'row',
          }}
        >
          <FormControlInput
            margin={width < 600 ? '0 0 1rem 0' : '0 1rem 1rem 0'}
            flex={1}
            label="Group"
            fullWidth
            multiline={false}
            rows={1}
            value={group}
            setValue={setGroup}
            placeholder="Enter Group"
          />
          <FormControlInput
            margin="0 0 1rem 0"
            flex={1}
            label="Name"
            fullWidth
            multiline={false}
            rows={1}
            value={name}
            setValue={setName}
            placeholder="Enter Name"
          />
        </DivAtom>
        <DivAtom
          style={{
            ...formCreateMemberStyles.multiFieldContainer,
            flexDirection: width < 600 ? 'column' : 'row',
          }}
        >
          <FormControlInput
            margin={width < 600 ? '0 0 1rem 0' : '0 1rem 1rem 0'}
            flex={1}
            label="Contact Number"
            fullWidth
            multiline={false}
            rows={1}
            value={contactNumber}
            setValue={setContactNumber}
            placeholder="Enter Contact Number"
          />
          <FormControlInput
            margin="0 0 1rem 0"
            flex={1}
            label="Email"
            fullWidth
            multiline={false}
            rows={1}
            value={email}
            setValue={setEmail}
            placeholder="Enter Email"
          />
        </DivAtom>
        <DivAtom
          style={{
            ...formCreateMemberStyles.multiFieldContainer,
            flexDirection: width < 600 ? 'column' : 'row',
          }}
        >
          <FormControlInput
            margin={width < 600 ? '0 0 1rem 0' : '0 1rem 1rem 0'}
            flex={1}
            label="Web Link"
            fullWidth
            multiline={false}
            rows={1}
            value={webLink}
            setValue={setWebLink}
            placeholder="Enter Web Link"
          />
          <FormControlInput
            margin="0 0 1rem 0"
            flex={1}
            label="Ijazah Link"
            fullWidth
            multiline={false}
            rows={1}
            value={ijazahLink}
            setValue={setIjazahLink}
            placeholder="Enter Ijazah Link"
          />
        </DivAtom>

        <DivAtom
          style={{
            ...formCreateMemberStyles.multiFieldContainer,
            flexDirection: width < 600 ? 'column' : 'row',
            justifyContent: 'flex-start',
            marginTop: '0.8rem',
          }}
        >
          <CheckboxGroup
            grouptitle="Room Categories"
            labels={allRoomTypes}
            names={['cilantro-suite', 'executive-room', 'premium-room']}
            checked={roomCategories}
            onChange={(_, i: number) => addRoomCategory(i)}
            style={{ flexDirection: 'column', marginBottom: '1rem' }}
          />
          <CheckboxGroup
            grouptitle="Room View"
            labels={allRoomViews}
            names={['cilantro-suite', 'executive-room', 'premium-room']}
            checked={roomViews}
            onChange={(_, i: number) => addRoomView(i)}
            style={{ flexDirection: 'column', marginBottom: '1rem' }}
          />
          <CheckboxGroup
            grouptitle="Gradings"
            labels={allRoomGradings}
            names={['five', 'four', 'three']}
            checked={roomGradings}
            onChange={(_, i: number) => addRoomGradings(i)}
            style={{
              flexDirection: 'column',
            }}
          />
        </DivAtom>

        <AccomodationRatesContainer
          width={width}
          newRateStart={newRateStart}
          newRateEnd={newRateEnd}
          newMealPlan={newMealPlan}
          newSinglePrice={newSinglePrice}
          newDoublePrice={newDoublePrice}
          newTriplePrice={newTriplePrice}
          setNewRateStart={setNewRateStart}
          setNewRateEnd={setNewRateEnd}
          setNewMealPlan={setNewMealPlan}
          setNewSinglePrice={setNewSinglePrice}
          setNewDoublePrice={setNewDoublePrice}
          setNewTriplePrice={setNewTriplePrice}
          rateData={rateData}
          onCreateRate={onCreateRate}
        />

        {(selectedTypes[0] || selectedTypes[1] || selectedTypes[2]) && selectedTypes.map((type, ind) => (
          <DivAtom
            key={ind}
            style={{
              ...formCreateMemberStyles.multiFieldContainer,
              flexDirection: width < 600 ? 'column' : 'row',
              justifyContent: 'flex-start',
              marginTop: '0.8rem',
            }}
          >
            <ParagraphAtom style={{ width: '150px' }} text={type} />
            <FormControl style={{ margin: '0 0 1rem 1rem' }}>
              <InputLabel>Price</InputLabel>
              <InputAtom
                plain="true"
                fullWidth
                multiline={false}
                rows={1}
                value={selectedTypeValues[type]}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onSetSelectedTypeValue(type, e.target.value)}
                placeholder="Enter Price"
              />
            </FormControl>
          </DivAtom>
        ))}
      </DivAtom>

      {showValidationErrorMessage && (
        <ParagraphAtom
          text="Please fill in all the fields"
          style={{ color: 'red', textAlign: 'center' }}
        />
      )}

      <DivAtom
        style={{
          ...formCreateMemberStyles.addBtnContainer,
          padding: width < 768 ? '1rem' : '0px',
          margin:
            width < 768 ? '0px' : formCreateMemberStyles.addBtnContainer.margin,
        }}
      >
        <ButtonAtom
          endicon={isCreating && <CircularProgress size={20} color="inherit" />}
          size="large"
          disabled={isCreating}
          text={btnText}
          onClick={onAddEditAccomodation}
          style={{
            ...formCreateMemberStyles.addBtn,
            width: width < 768 ? '100%' : '18%',
            margin: width < 768 ? '0 0 1rem 0' : '0px',
          }}
        />
      </DivAtom>

    </>
  );
}

export default CreateEditAccomodationForm;
