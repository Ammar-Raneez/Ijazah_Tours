import { ChangeEvent } from 'react';

import DivAtom from '../../../atoms/DivAtom';
import TextFieldAtom from '../../../atoms/TextFieldAtom';
import { libraryStyles } from '../../../styles';
import { dateTypeOptions, widthHeightDynamicStyle } from '../../../utils/helpers';

interface RenderDatePickerProps {
  width: number;
  dateType: string;
  checkin: string;
  checkout: string;
  setCheckin: any;
  setCheckout: any;
}

export const RenderDatePicker = ({
  width,
  dateType,
  checkin,
  checkout,
  setCheckin,
  setCheckout,
}: RenderDatePickerProps) => (
  dateType === dateTypeOptions[0].value ? (
    <DivAtom>
      <TextFieldAtom
        variant="standard"
        size="medium"
        label="Check-in"
        value={checkin}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCheckin(e.target.value)}
        adornmentPosition="end"
        style={{
          ...libraryStyles.textField,
          flex: 1,
          width: widthHeightDynamicStyle(width, 600, '100%', 'auto'),
          margin: widthHeightDynamicStyle(width, 600, '0 0 1rem 0', '0 1rem 0 0'),
        }}
        disableUnderline={false}
        select={false}
        focused
        type="date"
      />
      <TextFieldAtom
        variant="standard"
        size="medium"
        label="Checkout"
        value={checkout}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCheckout(e.target.value)}
        adornmentPosition="end"
        style={{
          ...libraryStyles.textField,
          flex: 1,
          width: widthHeightDynamicStyle(width, 600, '100%', 'auto'),
        }}
        disableUnderline={false}
        select={false}
        focused
        type="date"
      />
    </DivAtom>
  ) : (
    <DivAtom>
      <TextFieldAtom
        variant="standard"
        size="medium"
        label="Check-in"
        value={checkin}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCheckin(e.target.value)}
        adornmentPosition="end"
        style={{
          ...libraryStyles.textField,
          flex: 1,
          width: widthHeightDynamicStyle(width, 600, '100%', 'auto'),
          margin: widthHeightDynamicStyle(width, 600, '0 0 1rem 0', '0 1rem 0 0'),
        }}
        disableUnderline={false}
        select={false}
        focused
        type="month"
      />
      <TextFieldAtom
        variant="standard"
        size="medium"
        label="Checkout"
        value={checkout}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCheckout(e.target.value)}
        adornmentPosition="end"
        style={{
          ...libraryStyles.textField,
          flex: 1,
          width: widthHeightDynamicStyle(width, 600, '100%', 'auto'),
        }}
        disableUnderline={false}
        select={false}
        focused
        type="month"
      />
    </DivAtom>
  )
);
