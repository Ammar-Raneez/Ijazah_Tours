import { ListItemText } from '@material-ui/core';
import styled from 'styled-components';

interface LinkTextAtomProps {
  text: string;
}

function LinkTextAtom({ text }: LinkTextAtomProps) {
  return (
    <StyledListItemText primary={text} />
  )
}

export default LinkTextAtom

const StyledListItemText = styled(ListItemText)`
  color: white;

  .MuiListItemText-primary {
    font-weight: 600;
    font-size: 1.4rem;
  }
`;