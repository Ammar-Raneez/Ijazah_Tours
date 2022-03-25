import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import ButtonAtom from '../../atoms/ButtonAtom';
import DivAtom from '../../atoms/DivAtom';
import H2Atom from '../../atoms/H2Atom';
import { formCreateMemberStyles, libraryTableToolbarStyles } from '../../styles';

interface SectionContainerProps {
  containerWidth: number;
  h2Text: string;
  btnText: string;
  setOpenDialog: any;
}

function SectionContainer({
  containerWidth,
  h2Text,
  btnText,
  setOpenDialog,
}: SectionContainerProps) {
  return (
    <DivAtom
      style={{
        ...formCreateMemberStyles.multiFieldContainer,
        flexDirection: containerWidth < 1000 ? 'column' : 'row',
        marginTop: '1rem',
      }}
    >
      <H2Atom style={{ ...formCreateMemberStyles.title, fontSize: '1.2rem' }} text={h2Text} />
      <ButtonAtom
        starticon={<AddCircleOutlineOutlinedIcon />}
        text={btnText}
        onClick={setOpenDialog}
        style={{
          ...libraryTableToolbarStyles.addBtn,
          width: containerWidth < 1000 ? '100%' : '16rem',
          height: '3rem',
          marginLeft: containerWidth < 1000 ? '0px' : '1rem',
          marginBottom: containerWidth < 1000 ? '1rem' : '0',
        }}
        size="large"
      />
    </DivAtom>
  );
}

export default SectionContainer;
