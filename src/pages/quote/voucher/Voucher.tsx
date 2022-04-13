import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import {
  collectionGroup,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import _ from 'lodash';

import VoucherTable from '../../../organisms/quote/voucher/VoucherTable';
import DivAtom from '../../../atoms/DivAtom';
import ButtonAtom from '../../../atoms/ButtonAtom';
import { selectWithNavbarHeight, selectWithNavbarWidth } from '../../../redux/containerSizeSlice';
import { db } from '../../../firebase';
import { widthHeightDynamicStyle } from '../../../utils/helpers';
import { fetchingDataIndicatorStyles, quoteCreateQuoteStyles, voucherStyles } from '../../../styles';

function Voucher() {
  const width = useSelector(selectWithNavbarWidth);
  const height = useSelector(selectWithNavbarHeight);
  const [voucherData, setVoucherData] = useState<any>();
  const [isUpdating, setIsUpdating] = useState(false);

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

  const onUpdateVoucherStatus = async () => {
    setIsUpdating(true);
    await updateVoucherStatus();
    setIsUpdating(false);
  };

  const updateVoucherStatus = async () => {
    Object.keys(voucherData).forEach(async (quoteNo) => {
      await voucherData[quoteNo].forEach(async (voucher: any) => {
        const { id, ...v } = voucher;
        await setDoc(doc(db, 'Vouchers', quoteNo, 'Vouchers', id), v);
      });
    });
  };

  return (
    <DivAtom style={voucherStyles.container}>
      <DivAtom
        style={{
          ...voucherStyles.innerContainer,
          height: `${height}px`,
        }}
      >
        {voucherData ? (
          <>
            <DivAtom>
              <VoucherTable
                columns={['Voucher ID', 'Quotation Title', 'Status', '']}
                voucherData={voucherData}
                setVoucherData={setVoucherData}
              />
            </DivAtom>
            <ButtonAtom
              endIcon={isUpdating && <CircularProgress size={20} color="inherit" />}
              size="large"
              disabled={isUpdating}
              text="Update"
              onClick={onUpdateVoucherStatus}
              style={{
                ...quoteCreateQuoteStyles.addBtn,
                width: widthHeightDynamicStyle(width, 768, '100%', '18%'),
                marginTop: '1rem',
              }}
            />
          </>
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
