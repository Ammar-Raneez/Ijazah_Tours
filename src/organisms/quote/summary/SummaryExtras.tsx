import { MouseEventHandler } from 'react';

import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import ButtonAtom from '../../../atoms/ButtonAtom';
import DivAtom from '../../../atoms/DivAtom';
import ParagraphAtom from '../../../atoms/ParagraphAtom';
import FormControlInput from '../../../molecules/FormControlInput';
import { libraryAccomodationStyles, TableToolbarStyles } from '../../../styles';
import { widthHeightDynamicStyle } from '../../../utils/helpers';
import { FlexDirection } from '../../../utils/types';
import EarningsTable from './EarningsTable';

interface SummaryExtrasProps {
  width: number;
  newEXTitle: string;
  newEXRemark: string
  newEXPrice: string
  onCreate: MouseEventHandler<HTMLButtonElement>;
  onDelete: any;
  extrasData: any;
  setNewEXTitle: any;
  setNewEXRemark: any;
  setNewEXPrice: any;
}

function SummaryExtras({
  width,
  extrasData,
  newEXTitle,
  newEXRemark,
  newEXPrice,
  setNewEXTitle,
  setNewEXRemark,
  setNewEXPrice,
  onCreate,
  onDelete,
}: SummaryExtrasProps) {
  return (
    <>
      <ParagraphAtom text="Extras" style={{ marginTop: '2rem' }} />
      <DivAtom
        style={{
          ...libraryAccomodationStyles.multiFieldContainer,
          flexDirection: widthHeightDynamicStyle(width, 1000, 'column', 'row') as FlexDirection,
        }}
      >
        <FormControlInput
          margin={widthHeightDynamicStyle(width, 1000, '0 0 1rem 0', '0 1rem 1rem 0') as string}
          flex={1}
          label="Title"
          fullWidth
          multiline={false}
          rows={1}
          value={newEXTitle}
          setValue={setNewEXTitle}
          placeholder="Enter Title"
        />
        <FormControlInput
          margin={widthHeightDynamicStyle(width, 1000, '0 0 1rem 0', '0 1rem 1rem 0') as string}
          flex={1}
          label="Remark"
          fullWidth
          multiline={false}
          rows={1}
          value={newEXRemark}
          setValue={setNewEXRemark}
          placeholder="Enter Remark"
        />
        <FormControlInput
          margin="0 0 1rem 0"
          flex={1}
          label="Price"
          fullWidth
          multiline={false}
          rows={1}
          value={newEXPrice}
          setValue={setNewEXPrice}
          placeholder="Enter Price"
          dollarAdornment
        />
        <ButtonAtom
          startIcon={<AddCircleOutlineOutlinedIcon />}
          text="Add"
          disabled={
            newEXTitle === ''
            || newEXRemark === ''
            || newEXPrice === ''
          }
          onClick={(event) => onCreate(event)}
          style={{
            ...TableToolbarStyles.addBtn,
            width: widthHeightDynamicStyle(width, 540, '100%', 'auto'),
            height: '3rem',
            marginLeft: widthHeightDynamicStyle(width, 1000, 0, '1rem') as string,
            marginBottom: widthHeightDynamicStyle(width, 1000, '1rem', 0) as string,
          }}
          size="large"
        />
      </DivAtom>
      <DivAtom>
        {extrasData.length > 0 && (
          <EarningsTable
            data={extrasData}
            columns={['TITLE', 'REMARK', 'PRICE', '']}
            deleteEarnings={onDelete}
          />
        )}
      </DivAtom>
    </>
  );
}

export default SummaryExtras;
