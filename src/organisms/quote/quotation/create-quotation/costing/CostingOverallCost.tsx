import DivAtom from '../../../../../atoms/DivAtom';
import FormControlInput from '../../../../../molecules/FormControlInput';

interface CostingOverallCostProps {
  width: number;
  totalExpense: string;
  commission: string;
  totalPrice: string;
  sellingPrice: string;
  discount: string;
  netPrice: string;
  setTotalExpense: any;
  setCommission: any;
  setTotalPrice: any;
  setSellingPrice: any;
  setDiscount: any;
  setNetPrice: any;
}

function CostingOverallCost({
  width,
  totalExpense,
  commission,
  totalPrice,
  sellingPrice,
  discount,
  netPrice,
  setTotalExpense,
  setCommission,
  setTotalPrice,
  setSellingPrice,
  setDiscount,
  setNetPrice,
}: CostingOverallCostProps) {
  return (
    <DivAtom
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        padding: '0 1rem',
      }}
    >
      <FormControlInput
        label="Total Expense"
        fullWidth
        multiline={false}
        rows={1}
        value={totalExpense}
        flex={width < 600 ? 1 : undefined}
        setValue={setTotalExpense}
        placeholder="Enter Total Expense"
        margin="0 0 1rem 0"
      />
      <FormControlInput
        label="Commission"
        fullWidth
        multiline={false}
        rows={1}
        value={commission}
        flex={width < 600 ? 1 : undefined}
        setValue={setCommission}
        placeholder="Enter Commission"
        margin="0 0 1rem 0"
      />
      <FormControlInput
        label="Total Price"
        fullWidth
        disabled
        multiline={false}
        rows={1}
        value={totalPrice}
        flex={width < 600 ? 1 : undefined}
        setValue={setTotalPrice}
        placeholder="Enter Total Price"
        margin="0 0 1rem 0"
      />
      <FormControlInput
        label="Selling Price"
        fullWidth
        multiline={false}
        rows={1}
        value={sellingPrice}
        flex={width < 600 ? 1 : undefined}
        setValue={setSellingPrice}
        placeholder="Enter Selling Price"
        margin="0 0 1rem 0"
      />
      <FormControlInput
        label="Discount"
        fullWidth
        multiline={false}
        rows={1}
        value={discount}
        flex={width < 600 ? 1 : undefined}
        setValue={setDiscount}
        placeholder="Enter Discount"
        margin="0 0 1rem 0"
      />
      <FormControlInput
        label="Net Price"
        fullWidth
        disabled
        multiline={false}
        rows={1}
        value={netPrice}
        flex={width < 600 ? 1 : undefined}
        setValue={setNetPrice}
        placeholder="Enter Net Price"
        margin="0 0 1rem 0"
      />
    </DivAtom>
  );
}

export default CostingOverallCost;
