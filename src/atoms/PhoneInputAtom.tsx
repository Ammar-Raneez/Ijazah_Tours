import { CSSProperties } from 'react';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import styled from 'styled-components';

interface PhoneInputAtomProps {
  value: any;
  setContactNumber: any;
  style?: CSSProperties;
}

function PhoneInputAtom({
  value,
  setContactNumber,
  style,
}: PhoneInputAtomProps) {
  return (
    <StyledPhoneInputAtom
      placeholder="Enter Contact Number"
      value={value}
      onChange={setContactNumber}
      style={style}
    />
  );
}

export default PhoneInputAtom;

const StyledPhoneInputAtom = styled(PhoneInput)`
  flex: 1;

  .PhoneInputInput {
    outline: none;
    border: none;
    padding: 0.2rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    font: inherit;
  }
`;
