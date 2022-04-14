import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import {
  collection,
  collectionGroup,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import _ from 'lodash';

import VoucherTable from '../../../organisms/quote/voucher/VoucherTable';
import SupplierVoucher from '../../../organisms/quote/voucher/SupplierVoucher';
import DriverVoucher from '../../../organisms/quote/voucher/DriverVoucher';
import ItineraryVoucher from '../../../organisms/quote/voucher/ItineraryVoucher';
import TourConfirmationVoucher from '../../../organisms/quote/voucher/TourConfirmationVoucher';
import CashReceipt from '../../../organisms/quote/voucher/CashReceipt';
import DivAtom from '../../../atoms/DivAtom';
import ButtonAtom from '../../../atoms/ButtonAtom';
import { selectWithNavbarHeight, selectWithNavbarWidth } from '../../../redux/containerSizeSlice';
import { db } from '../../../firebase';
import { widthHeightDynamicStyle } from '../../../utils/helpers';
import { fetchingDataIndicatorStyles, voucherStyles } from '../../../styles';

function Voucher() {
  const width = useSelector(selectWithNavbarWidth);
  const height = useSelector(selectWithNavbarHeight);
  const [voucherData, setVoucherData] = useState<any>();
  const [isUpdating, setIsUpdating] = useState(false);

  const [isVoucherApproved, setIsVoucherApproved] = useState(false);

  useEffect(() => {
    const getInitialData = async () => {
      const vData = (await getDocs(collectionGroup(db, `Vouchers`))).docs;
      const vouchData = vData.map((dc) => dc.data());
      const vouchIds = vData.map((dc) => dc.id);
      vouchIds.forEach((id, i) => {
        vouchData[i].id = id;
      });

      const groupedVouchData = _.groupBy(
        vouchData,
        (voucher: { quoteNo: string }) => voucher.quoteNo,
      );

      setVoucherData(groupedVouchData);
    };

    getInitialData();
  }, [isVoucherApproved]);

  const onUpdateVoucherStatus = async () => {
    setIsUpdating(true);
    await updateVoucherQuotationStatus();
    setIsUpdating(false);
  };

  const updateVoucherQuotationStatus = async () => {
    Object.keys(voucherData).forEach(async (quoteNo) => {
      const quotationQuery = query(collection(db, 'Approval Quotations'), where('quoteNo', '==', Number(quoteNo)));
      const quotationSnapshot = await getDocs(quotationQuery);
      if (voucherData[quoteNo].every((voucher: { completed: boolean }) => (
        voucher.completed === true))
      ) {
        quotationSnapshot.forEach(async (snap) => {
          await setDoc(doc(db, 'Approval Quotations', snap.id), {
            ...snap.data(),
            status: 'COMPLETE',
          });
        });
      } else {
        quotationSnapshot.forEach(async (snap) => {
          await setDoc(doc(db, 'Approval Quotations', snap.id), {
            ...snap.data(),
            status: 'IN PROGRESS',
          });
        });
      }

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
            <Route path="/quote/voucher/supplier/:id">
              <SupplierVoucher
                setIsVoucherApproved={setIsVoucherApproved}
                voucherData={voucherData}
              />
            </Route>
            <Route path="/quote/voucher/driver/:id">
              <DriverVoucher
                setIsVoucherApproved={setIsVoucherApproved}
                voucherData={voucherData}
              />
            </Route>
            <Route path="/quote/voucher/itinerary/:id">
              <ItineraryVoucher
                setIsVoucherApproved={setIsVoucherApproved}
                voucherData={voucherData}
              />
            </Route>
            <Route path="/quote/voucher/tour-confirmation/:id">
              <TourConfirmationVoucher
                setIsVoucherApproved={setIsVoucherApproved}
                voucherData={voucherData}
              />
            </Route>
            <Route path="/quote/voucher/receipt/:id">
              <CashReceipt setIsVoucherApproved={setIsVoucherApproved} voucherData={voucherData} />
            </Route>
            <Route exact path="/quote/voucher">
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
                  ...voucherStyles.addBtn,
                  width: widthHeightDynamicStyle(width, 768, '100%', '18%'),
                  marginTop: '1rem',
                }}
              />
            </Route>
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
