import DivAtom from '../../../../../atoms/DivAtom';
import FormControlInput from '../../../../../molecules/FormControlInput';
import { quoteCreateQuoteStyles } from '../../../../../styles';

interface CostingTransportProps {
  width: number;
  rate: string;
  days: string;
  transport: string;
  setRate: any;
  setDays: any;
  setTransport: any;
}

function CostingTransport({
  width,
  rate,
  days,
  transport,
  setRate,
  setDays,
  setTransport,
}: CostingTransportProps) {
  return (
    <DivAtom
      style={{
        ...quoteCreateQuoteStyles.multiFieldContainer,
        ...quoteCreateQuoteStyles.tableContainer,
        flexDirection: width < 600 ? 'column' : 'row',
      }}
    >
      <DivAtom
        style={{
          display: 'flex',
          flexDirection: width < 600 ? 'column' : 'row',
        }}
      >
        <FormControlInput
          label="Rate"
          fullWidth
          multiline={false}
          rows={1}
          value={rate}
          setValue={setRate}
          placeholder="Enter Rate"
          flex={width < 600 ? 1 : undefined}
          margin={width < 600 ? '0 0 1rem 0' : '0 1rem 1rem 0'}
        />
        <FormControlInput
          label="Days"
          fullWidth
          disabled
          multiline={false}
          rows={1}
          value={days}
          flex={width < 600 ? 1 : undefined}
          setValue={setDays}
          placeholder="Enter Days"
          margin={width < 600 ? '0 0 1rem 0' : '0'}
        />
      </DivAtom>
      <DivAtom
        style={{
          display: 'flex',
          flexDirection: width < 600 ? 'column' : 'row',
        }}
      >
        <FormControlInput
          label="Transport"
          fullWidth
          multiline={false}
          rows={1}
          value={transport}
          setValue={setTransport}
          flex={width < 600 ? 1 : undefined}
          placeholder="Enter Transport"
        />
      </DivAtom>
    </DivAtom>
  );
}

export default CostingTransport;
