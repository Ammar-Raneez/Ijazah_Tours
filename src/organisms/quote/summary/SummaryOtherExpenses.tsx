import { MouseEventHandler } from 'react';

import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import ButtonAtom from '../../../atoms/ButtonAtom';
import DivAtom from '../../../atoms/DivAtom';
import ParagraphAtom from '../../../atoms/ParagraphAtom';
import FormControlInput from '../../../molecules/FormControlInput';
import { libraryAccomodationStyles, TableToolbarStyles } from '../../../styles';
import { widthHeightDynamicStyle } from '../../../utils/helpers';
import { FlexDirection } from '../../../utils/types';
import OtherExpensesTable from './OtherExpensesTable';

interface SummaryOtherExpensesProps {
  width: number;
  newOTTitle: string;
  newOTRemark: string
  newOTPrice: string
  onCreate: MouseEventHandler<HTMLButtonElement>;
  onDelete: any;
  otherExpenseData: any;
  setNewOTTitle: any;
  setNewOTRemark: any;
  setNewOTPrice: any;
}

function SummaryOtherExpenses({
  width,
  otherExpenseData,
  newOTTitle,
  newOTRemark,
  newOTPrice,
  setNewOTTitle,
  setNewOTRemark,
  setNewOTPrice,
  onCreate,
  onDelete,
}: SummaryOtherExpensesProps) {
  return (
    <>
      <ParagraphAtom text="Other Expenses" style={{ marginTop: '2rem' }} />
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
          value={newOTTitle}
          setValue={setNewOTTitle}
          placeholder="Enter Title"
        />
        <FormControlInput
          margin={widthHeightDynamicStyle(width, 1000, '0 0 1rem 0', '0 1rem 1rem 0') as string}
          flex={1}
          label="Remark"
          fullWidth
          multiline={false}
          rows={1}
          value={newOTRemark}
          setValue={setNewOTRemark}
          placeholder="Enter Remark"
        />
        <FormControlInput
          margin="0 0 1rem 0"
          flex={1}
          label="Price"
          fullWidth
          multiline={false}
          rows={1}
          value={newOTPrice}
          setValue={setNewOTPrice}
          placeholder="Enter Price"
          dollarAdornment
        />
        <ButtonAtom
          startIcon={<AddCircleOutlineOutlinedIcon />}
          text="Add"
          disabled={
            newOTTitle === ''
            || newOTRemark === ''
            || newOTPrice === ''
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
        {otherExpenseData.length > 0 && (
          <OtherExpensesTable
            data={otherExpenseData}
            columns={['TITLE', 'REMARK', 'PRICE', '']}
            deleteExpense={onDelete}
          />
        )}
      </DivAtom>
    </>
  );
}

export default SummaryOtherExpenses;
