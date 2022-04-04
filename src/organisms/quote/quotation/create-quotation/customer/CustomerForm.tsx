import { ChangeEvent, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import { RenderDatePicker } from './RenderDatePicker';
import FormControlInput from '../../../../../molecules/FormControlInput';
import RadioButtonGroup from '../../../../../molecules/RadioButtonGroup';
import TextFieldAtom from '../../../../../atoms/TextFieldAtom';
import DivAtom from '../../../../../atoms/DivAtom';
import ParagraphAtom from '../../../../../atoms/ParagraphAtom';
import ButtonAtom from '../../../../../atoms/ButtonAtom';
import CheckboxAtom from '../../../../../atoms/CheckboxAtom';
import { DropdownOption, FlexDirection, LibraryGuest } from '../../../../../utils/types';
import { dateTypeOptions, mealPlanOptions, widthHeightDynamicStyle } from '../../../../../utils/helpers';
import { libraryStyles, quoteCreateQuoteStyles, TableToolbarStyles } from '../../../../../styles';

interface CustomerFormProps {
  customerData: LibraryGuest[];
  refData: DropdownOption[];
  holidayTypeData: DropdownOption[];
  destinationData: DropdownOption[];
  width: number;
  refNum: string;
  firstName: string;
  lastName: string;
  contactNumber: string
  email: string;
  country: string;
  city: string;
  holidayType: string
  destination: string;
  mealPlan: string;
  dateType: string;
  checkin: string;
  checkout: string;
  numberOfDays: number;
  additionalBed: boolean;
  onCreateCustomer: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  onRefNumChange: (data: LibraryGuest[], rf: string) => void;
  setFirstName: any;
  setLastName: any;
  setContactNumber: any;
  setEmail: any;
  setCountry: any;
  setCity: any;
  setNumberOfDays: any;
  setHolidayType: any;
  setDestination: any;
  setMealPlan: any;
  setAdditionalBed: any;
  setDateType: any;
  setCheckin: any;
  setCheckout: any
}

function CustomerForm({
  customerData,
  refData,
  holidayTypeData,
  destinationData,
  width,
  refNum,
  firstName,
  lastName,
  contactNumber,
  email,
  country,
  city,
  numberOfDays,
  holidayType,
  destination,
  mealPlan,
  dateType,
  checkin,
  checkout,
  additionalBed,
  onCreateCustomer,
  onRefNumChange,
  setFirstName,
  setLastName,
  setContactNumber,
  setEmail,
  setCountry,
  setCity,
  setNumberOfDays,
  setHolidayType,
  setDestination,
  setMealPlan,
  setAdditionalBed,
  setDateType,
  setCheckin,
  setCheckout,
}: CustomerFormProps) {
  return (
    <>
      <DivAtom style={quoteCreateQuoteStyles.formContainer}>
        <ParagraphAtom
          style={{
            ...quoteCreateQuoteStyles.title,
            marginBottom: '1rem',
          }}
          text="Guest"
        />
        <DivAtom
          style={{
            ...quoteCreateQuoteStyles.multiFieldContainer,
            flexDirection: widthHeightDynamicStyle(width, 600, 'column', 'row') as FlexDirection,
          }}
        >
          <TextFieldAtom
            variant="standard"
            size="medium"
            label="Reference Number"
            value={refNum}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onRefNumChange(customerData, e.target.value)}
            options={refData}
            adornmentPosition="end"
            style={{
              ...libraryStyles.textField,
              flex: 1,
              width: widthHeightDynamicStyle(width, 600, '100%', 'auto'),
            }}
            disableUnderline={false}
            select
          />
          <Link to={`/library/guest/create`}>
            <ButtonAtom
              startIcon={<AddCircleOutlineOutlinedIcon />}
              text="Add New Guest"
              style={{
                ...TableToolbarStyles.addBtn,
                width: widthHeightDynamicStyle(width, 600, '100%', '11rem'),
                marginTop: '1rem',
                marginLeft: widthHeightDynamicStyle(width, 600, 0, '1rem'),
              }}
              size="large"
            />
          </Link>
        </DivAtom>
        <DivAtom
          style={{
            ...quoteCreateQuoteStyles.multiFieldContainer,
            flexDirection: widthHeightDynamicStyle(width, 600, 'column', 'row') as FlexDirection,
          }}
        >
          <FormControlInput
            margin={widthHeightDynamicStyle(width, 600, '0 0 1rem 0', '0 1rem 1rem 0') as string}
            flex={1}
            label="First Name"
            fullWidth
            disabled
            multiline={false}
            rows={1}
            value={firstName}
            setValue={setFirstName}
            placeholder="Enter First Name"
          />
          <FormControlInput
            margin="0 0 1rem 0"
            flex={1}
            label="Last Name"
            fullWidth
            disabled
            multiline={false}
            rows={1}
            value={lastName}
            setValue={setLastName}
            placeholder="Enter Last Name"
          />
        </DivAtom>
        <DivAtom
          style={{
            ...quoteCreateQuoteStyles.multiFieldContainer,
            flexDirection: widthHeightDynamicStyle(width, 600, 'column', 'row') as FlexDirection,
          }}
        >
          <FormControlInput
            margin={widthHeightDynamicStyle(width, 600, '0 0 1rem 0', '0 1rem 1rem 0') as string}
            label="Contact Number"
            fullWidth
            disabled
            flex={1}
            multiline={false}
            rows={1}
            value={contactNumber}
            setValue={setContactNumber}
            placeholder="Enter Contact Number"
          />
          <FormControlInput
            margin="0 0 1rem 0"
            label="Email"
            fullWidth
            disabled
            flex={1}
            multiline={false}
            rows={1}
            value={email}
            setValue={setEmail}
            placeholder="Enter Email"
          />
        </DivAtom>
        <DivAtom
          style={{
            ...quoteCreateQuoteStyles.multiFieldContainer,
            flexDirection: widthHeightDynamicStyle(width, 600, 'column', 'row') as FlexDirection,
          }}
        >
          <FormControlInput
            margin={widthHeightDynamicStyle(width, 600, '0 0 1rem 0', '0 1rem 1rem 0') as string}
            label="Country"
            fullWidth
            disabled
            flex={1}
            multiline={false}
            rows={1}
            value={country}
            setValue={setCountry}
            placeholder="Enter Country"
          />
          <FormControlInput
            margin="0 0 1rem 0"
            label="City"
            fullWidth
            disabled
            flex={1}
            multiline={false}
            rows={1}
            value={city}
            setValue={setCity}
            placeholder="Enter City"
          />
        </DivAtom>
        <ParagraphAtom
          style={{
            ...quoteCreateQuoteStyles.title,
            marginBottom: '1rem',
          }}
          text="Holiday"
        />
        <DivAtom
          style={{
            ...quoteCreateQuoteStyles.multiFieldContainer,
            flexDirection: widthHeightDynamicStyle(width, 600, 'column', 'row') as FlexDirection,
          }}
        >
          <FormControlInput
            margin={widthHeightDynamicStyle(width, 600, '0 0 1rem 0', '0 1rem 1rem 0') as string}
            type="number"
            flex={1}
            label="No. of Days"
            fullWidth
            multiline={false}
            rows={1}
            value={numberOfDays}
            setValue={setNumberOfDays}
            placeholder=""
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
              margin: widthHeightDynamicStyle(width, 600, '0 0 1rem 0', '0 1rem 1rem 0'),
            }}
            disableUnderline={false}
            select
          />
        </DivAtom>
        <DivAtom
          style={{
            ...quoteCreateQuoteStyles.multiFieldContainer,
            flexDirection: widthHeightDynamicStyle(width, 600, 'column', 'row') as FlexDirection,
          }}
        >
          <TextFieldAtom
            variant="standard"
            size="medium"
            label="Destination"
            value={destination}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDestination(e.target.value)
            }
            options={destinationData}
            adornmentPosition="end"
            style={{
              ...libraryStyles.textField,
              flex: 1,
              width: widthHeightDynamicStyle(width, 600, '100%', 'auto'),
              margin: widthHeightDynamicStyle(width, 600, '0 0 1rem 0', '0 1rem 1rem 0'),
            }}
            disableUnderline={false}
            select
          />
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
            onChange={(e) => setDateType(e.target.value)}
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
          margin: widthHeightDynamicStyle(width, 768, 0, quoteCreateQuoteStyles.addBtnContainer.margin),
        }}
      >
        <ButtonAtom
          size="large"
          text="Continue"
          onClick={(event) => onCreateCustomer(event)}
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

export default CustomerForm;