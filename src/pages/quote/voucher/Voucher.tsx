import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { collectionGroup, getDocs } from 'firebase/firestore';
import _ from 'lodash';

import VoucherTable from '../../../organisms/quote/voucher/VoucherTable';
import DivAtom from '../../../atoms/DivAtom';
import { selectWithNavbarHeight } from '../../../redux/containerSizeSlice';
import { db } from '../../../firebase';
import { DASHBOARD_TASK_DATA } from '../../../data';
import { fetchingDataIndicatorStyles, voucherStyles } from '../../../styles';

function Voucher() {
  const height = useSelector(selectWithNavbarHeight);
  const [voucherData, setVoucherData] = useState<any>();

  useEffect(() => {
    const getInitialData = async () => {
      const vData = (await getDocs(collectionGroup(db, `Vouchers`))).docs;
      const vouchData = vData.map((dc) => dc.data());
      const vouchIds = vData.map((dc) => dc.id);
      vouchIds.forEach((id, i) => {
        vouchData[i].id = id;
      });

      const groupedVouchData = _.groupBy(vouchData, (voucher: { quoteNo: string }) => voucher.quoteNo);
      setVoucherData(groupedVouchData);
    };

    getInitialData();
  }, []);

  return (
    <DivAtom style={voucherStyles.container}>
      <DivAtom
        style={{
          ...voucherStyles.innerContainer,
          height: `${height}px`,
        }}
      >
        {voucherData ? (
          <DivAtom>
            <VoucherTable
              columns={['Voucher ID', 'Quotation Title', 'Status', '']}
              rows={DASHBOARD_TASK_DATA}
              voucherData={voucherData}
            />
          </DivAtom>
        ) : (
          <DivAtom style={fetchingDataIndicatorStyles.container}>
            <CircularProgress size={20} color="primary" />
          </DivAtom>
        )}
      </DivAtom>
    </DivAtom>
  );
}

export default Voucher;
