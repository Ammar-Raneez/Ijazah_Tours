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

interface SummaryEarningsProps {
  width: number;
  newERTitle: string;
  newERRemark: string
  newERPrice: string
  onCreate: MouseEventHandler<HTMLButtonElement>;
  onDelete: any;
  earningsData: any;
  setNewERTitle: any;
  setNewERRemark: any;
  setNewERPrice: any;
}

function SummaryEarnings({
  width,
  earningsData,
  newERTitle,
  newERRemark,
  newERPrice,
  setNewERTitle,
  setNewERRemark,
  setNewERPrice,
  onCreate,
  onDelete,
}: SummaryEarningsProps) {
  return (
    <>
      <ParagraphAtom text="Earnings" style={{ marginTop: '2rem' }} />
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
          value={newERTitle}
          setValue={setNewERTitle}
          placeholder="Enter Title"
        />
        <FormControlInput
          margin={widthHeightDynamicStyle(width, 1000, '0 0 1rem 0', '0 1rem 1rem 0') as string}
          flex={1}
          label="Remark"
          fullWidth
          multiline={false}
          rows={1}
          value={newERRemark}
          setValue={setNewERRemark}
          placeholder="Enter Remark"
        />
        <FormControlInput
          margin="0 0 1rem 0"
          flex={1}
          label="Price"
          fullWidth
          multiline={false}
          rows={1}
          value={newERPrice}
          setValue={setNewERPrice}
          placeholder="Enter Price"
          dollarAdornment
        />
        <ButtonAtom
          startIcon={<AddCircleOutlineOutlinedIcon />}
          text="Add"
          disabled={
            newERTitle === ''
            || newERRemark === ''
            || newERPrice === ''
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
        {earningsData.length > 0 && (
          <EarningsTable
            data={earningsData}
            columns={['TITLE', 'REMARK', 'PRICE', '']}
            deleteEarnings={onDelete}
          />
        )}
      </DivAtom>
    </>
  );
}

export default SummaryEarnings;
