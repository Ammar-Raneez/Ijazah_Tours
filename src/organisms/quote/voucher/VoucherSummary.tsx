import DivAtom from '../../../atoms/DivAtom';
import SpanAtom from '../../../atoms/SpanAtom';
import { voucherStyles } from '../../../styles';

interface VoucherSummaryProps {
  type: string;
  vData: any;
}

function VoucherSummary({ type, vData }: VoucherSummaryProps) {
  const DITCContainer = () => (
    <DivAtom style={voucherStyles.voucherTemplate.summaryDetails.mainContainer}>
      <DivAtom>
        <p style={voucherStyles.voucherTemplate.summaryDetails.detailContainer}>
          <SpanAtom
            text={type === 'driver' ? 'Driver Name' : 'Ref Num'}
            style={voucherStyles.voucherTemplate.summaryDetails.label}
          />
          <SpanAtom
            text={type === 'driver' ? vData.driverDetails.name : vData.guestDetails.refNum}
            style={voucherStyles.voucherTemplate.summaryDetails.detail}
          />
        </p>
        {type !== 'driver' && (
          <p style={voucherStyles.voucherTemplate.summaryDetails.detailContainer}>
            <SpanAtom
              text="Country"
              style={voucherStyles.voucherTemplate.summaryDetails.label}
            />
            <SpanAtom
              text={vData.guestDetails.nationality}
              style={voucherStyles.voucherTemplate.summaryDetails.detail}
            />
          </p>
        )}
        <p style={voucherStyles.voucherTemplate.summaryDetails.detailContainer}>
          <SpanAtom
            text={type === 'driver' ? 'Driver Address' : 'Guest Name'}
            style={voucherStyles.voucherTemplate.summaryDetails.label}
          />
          <SpanAtom
            text={type === 'driver' ? vData.driverDetails.address : vData.guestDetails.name}
            style={voucherStyles.voucherTemplate.summaryDetails.detail}
          />
        </p>
      </DivAtom>

      <DivAtom>
        <p style={voucherStyles.voucherTemplate.summaryDetails.detailContainer}>
          <SpanAtom
            text="Arrival"
            style={voucherStyles.voucherTemplate.summaryDetails.label}
          />
          <SpanAtom
            text={vData.guestDetails.arrival}
            style={voucherStyles.voucherTemplate.summaryDetails.detail}
          />
        </p>
        <p style={voucherStyles.voucherTemplate.summaryDetails.detailContainer}>
          <SpanAtom
            text="Departure"
            style={voucherStyles.voucherTemplate.summaryDetails.label}
          />
          <SpanAtom
            text={vData.guestDetails.departure}
            style={voucherStyles.voucherTemplate.summaryDetails.detail}
          />
        </p>
        {type === 'driver' && (
          <p style={voucherStyles.voucherTemplate.summaryDetails.detailContainer}>
            <SpanAtom
              text="Days"
              style={voucherStyles.voucherTemplate.summaryDetails.label}
            />
            <SpanAtom
              text={vData.guestDetails.daysAndNights.split('-')[0]}
              style={voucherStyles.voucherTemplate.summaryDetails.detail}
            />
          </p>
        )}
      </DivAtom>
    </DivAtom>
  );

  return (
    <DITCContainer />
  );
}

export default VoucherSummary;
