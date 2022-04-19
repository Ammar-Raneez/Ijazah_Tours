import { ChangeEvent, MouseEvent } from 'react';

import { Input, MenuItem, Select } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import ButtonAtom from '../../../../atoms/ButtonAtom';
import CheckboxAtom from '../../../../atoms/CheckboxAtom';
import DivAtom from '../../../../atoms/DivAtom';
import ParagraphAtom from '../../../../atoms/ParagraphAtom';
import PhoneInputAtom from '../../../../atoms/PhoneInputAtom';
import TextFieldAtom from '../../../../atoms/TextFieldAtom';
import FormControlInput from '../../../../molecules/FormControlInput';
import RadioButtonGroup from '../../../../molecules/RadioButtonGroup';
import { libraryStyles, quoteCreateQuoteStyles, TableToolbarStyles } from '../../../../styles';
import {
  dateTypeOptions,
  mealPlanOptions,
  MenuProps,
  widthHeightDynamicStyle,
} from '../../../../utils/helpers';
import {
  DropdownOption,
  FlexDirection,
  SettingsLocation,
} from '../../../../utils/types';
import { RenderDatePicker } from '../RenderDatePicker';

interface HolidayFormProps {
  accomodationLocationData: SettingsLocation[];
  holidayTypeData: DropdownOption[];
  destinations: string[];
  width: number;
  title: string;
  holidayType: string
  mealPlan: string;
  dateType: string;
  checkin: string;
  checkout: string;
  additionalBed: boolean;
  onCreateHoliday: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  setTitle: any;
  setHolidayType: any;
  setDestinations: any;
  setToStoreDestinations: any;
  setMealPlan: any;
  setAdditionalBed: any;
  setDateType: any;
  setCheckin: any;
  setCheckout: any
}

function HolidayForm({
  accomodationLocationData,
  holidayTypeData,
  width,
  title,
  holidayType,
  destinations,
  mealPlan,
  dateType,
  checkin,
  checkout,
  additionalBed,
  onCreateHoliday,
  setTitle,
  setHolidayType,
  setDestinations,
  setToStoreDestinations,
  setMealPlan,
  setAdditionalBed,
  setDateType,
  setCheckin,
  setCheckout,
}: HolidayFormProps) {
  const changeDateType = (type: string) => {
    setDateType(type);
    if (type === dateTypeOptions[1].value) {
      setCheckin('2022-01');
      setCheckout('2022-02');
    } else {
      setCheckin('2022-01-01');
      setCheckout('2022-02-01');
    }
  };

  const handleDestinationsChange = (event: ChangeEvent<{ value: unknown }>) => {
    const val = event.target.value as string[];
    setDestinations(val);
    setToStoreDestinations(
      accomodationLocationData.map((l) => l.cities)
        .flat()
        .filter((c) => val.includes(c.value))
        .map((c) => (
          `${c.countryName} | ${c.value}`
        )),
    );
  };

  return (
    <>
      <DivAtom style={quoteCreateQuoteStyles.formContainer}>
        <FormControlInput
          margin={widthHeightDynamicStyle(width, 600, '0 0 1rem 0', '0 1rem 1rem 0') as string}
          flex={1}
          label="Title"
          fullWidth
          multiline={false}
          rows={1}
          value={title}
          setValue={setTitle}
          placeholder="Enter Title"
        />
        <ParagraphAtom
          style={{
            ...quoteCreateQuoteStyles.title,
            marginBottom: '1rem',
          }}
          text="Holiday"
        />
        <TextFieldAtom
          variant="standard"
          size="medium"
          label="Holiday Type"
          value={holidayType}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setHolidayType(e.target.value)
          }
          options={holidayTypeData}
          adornmentPosition="end"
          style={{
            ...libraryStyles.textField,
            flex: 1,
            width: widthHeightDynamicStyle(width, 600, '100%', 'auto'),
            marginBottom: '1rem',
          }}
          disableUnderline={false}
          select
        />
        <DivAtom
          style={{
            ...quoteCreateQuoteStyles.multiFieldContainer,
            flexDirection: widthHeightDynamicStyle(width, 600, 'column', 'row') as FlexDirection,
          }}
        >
          <Select
            labelId="destinations-label"
            id="destinations"
            multiple
            placeholder="Destinations"
            value={destinations}
            onChange={handleDestinationsChange}
            input={<Input />}
            MenuProps={MenuProps}
            style={{
              flex: 1,
              width: widthHeightDynamicStyle(width, 600, '100%', 'auto'),
              margin: widthHeightDynamicStyle(width, 600, '0 0 1rem 0', '0 1rem 1rem 0'),
            }}
          >
            {accomodationLocationData.map((l) => l.cities).flat().map((c) => (
              <MenuItem key={uuid()} value={c.value}>
                {`${c.countryName} | ${c.value}`}
              </MenuItem>
            ))}
          </Select>
          <RadioButtonGroup
            title="Meal Plan"
            options={mealPlanOptions}
            value={mealPlan}
            radioGroupStyle={{
              ...quoteCreateQuoteStyles.radioBtnContainer,
              margin: widthHeightDynamicStyle(width, 600, 0, '0 1rem'),
            }}
            onChange={(e) => setMealPlan(e.target.value)}
          />
          <CheckboxAtom
            label="Additional Bed"
            name="additional-bed"
            checked={additionalBed}
            style={quoteCreateQuoteStyles.singleCheckbox}
            onChange={() => setAdditionalBed(!additionalBed)}
          />
        </DivAtom>
        <DivAtom
          style={{
            ...quoteCreateQuoteStyles.multiFieldContainer,
            flexDirection: 'column',
          }}
        >
          <RadioButtonGroup
            title="Date Type"
            options={dateTypeOptions}
            value={dateType}
            radioGroupStyle={{
              ...quoteCreateQuoteStyles.radioBtnContainer,
              margin: widthHeightDynamicStyle(width, 600, 0, '0 1rem'),
            }}
            onChange={(e) => changeDateType(e.target.value)}
          />
          <RenderDatePicker
            width={width}
            dateType={dateType}
            checkin={checkin}
            checkout={checkout}
            setCheckin={setCheckin}
            setCheckout={setCheckout}
          />
        </DivAtom>
      </DivAtom>
      <DivAtom
        style={{
          ...quoteCreateQuoteStyles.addBtnContainer,
          padding: widthHeightDynamicStyle(width, 768, '1rem', 0),
          margin: widthHeightDynamicStyle(
            width,
            768,
            0,
            quoteCreateQuoteStyles.addBtnContainer.margin,
          ),
        }}
      >
        <ButtonAtom
          size="large"
          text="Continue"
          onClick={(event) => onCreateHoliday(event)}
          disabled={title.trim() === '' || destinations.length === 0}
          style={{
            ...quoteCreateQuoteStyles.addBtn,
            width: widthHeightDynamicStyle(width, 768, '100%', '18%'),
            margin: '0 0 1rem 0',
          }}
        />
      </DivAtom>
    </>
  );
}

export default HolidayForm;
