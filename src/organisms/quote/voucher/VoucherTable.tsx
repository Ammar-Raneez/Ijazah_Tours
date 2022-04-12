/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, Fragment, useState } from 'react';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import { v4 as uuid } from 'uuid';

import TableColumnCell from '../../../molecules/TableColumnCell';
import TableRowButtonCell from '../../../molecules/TableRowButtonCell';
import TableRowIconCell from '../../../molecules/TableRowIconCell';
import TableRowCheckboxCell from '../../../molecules/TableRowCheckboxCell';

interface VoucherTableProps {
  columns?: string[];
  voucherData: any[];
}

function Row({ row }: any) {
  const [open, setOpen] = useState(false);
  const [rowChecked, setRowChecked] = useState(row.status === 'A');
  const [subTasksChecked, setSubTasksChecked] = useState(
    row.subtasks
      ? row.subtasks.map((subtask: any) => subtask.status === 'COMPLETE')
      : [],
  );

  const keyboardIcon = open ? (
    <KeyboardArrowDownIcon />
  ) : (
    <KeyboardArrowLeftIcon />
  );

  const onChangeRowStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setRowChecked(e.target.checked);
  };

  const onChangeSubTaskStatus = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const temp = [...subTasksChecked];
    temp[index] = e.target.checked;
    setSubTasksChecked(temp);
  };

  const getOverallRowStatus = () => {
    let status = 'COMPLETE';
    row.forEach((voucher: any) => {
      if (voucher.status !== 'COMPLETE') {
        status = 'TODO';
      }
    });

    return status;
  };

  const getStatusBtnColors = () => (
    getOverallRowStatus() === 'COMPLETE' ? ['#29CC97', '#ffffff'] : ['#7879F1', '#ffffff']
  );

  return (
    <Fragment>
      <TableRow>
        <TableRowCheckboxCell
          name={row[0].mainVId}
          checked={rowChecked}
          onChange={onChangeRowStatus}
          align="left"
        />
        <TableCell>{row[0].quotationTitle}</TableCell>
        <TableRowButtonCell
          key={uuid()}
          onClick={() => null}
          align="left"
          btnWidth="8rem"
          btnSize="medium"
          btnBorderRadius="0.5rem"
          btnText={getOverallRowStatus()}
          btnColors={getStatusBtnColors()}
          btnDisabled
        />
        <TableRowIconCell
          align="left"
          size="small"
          onClick={() => setOpen(!open)}
          textColor="#5344C2"
          padding="0"
        >
          {keyboardIcon}
        </TableRowIconCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="vouchers">
                <TableHead>
                  <TableRow>
                    <TableColumnCell key={uuid()} color="black" column="Voucher ID" />
                    <TableColumnCell key={uuid()} color="black" column="Voucher Title" />
                    <TableColumnCell key={uuid()} color="black" column="Status" />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.map((voucher: any, index: number) => (
                    <TableRow key={voucher.id}>
                      <TableRowCheckboxCell
                        name={voucher.vId}
                        checked={subTasksChecked[index]}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeSubTaskStatus(e, index)}
                        align="left"
                      />
                      <TableCell>{voucher.title}</TableCell>
                      <TableRowButtonCell
                        key={uuid()}
                        onClick={() => null}
                        align="left"
                        btnWidth="8rem"
                        btnSize="medium"
                        btnBorderRadius="0.5rem"
                        btnText={voucher.status}
                        btnColors={
                          subTasksChecked[index]
                            ? ['#29CC97', '#ffffff']
                            : ['#7879F1', '#ffffff']
                        }
                        btnDisabled={voucher.status === 'COMPLETE'}
                      />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default function VoucherTable({ columns, voucherData }: VoucherTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {columns!.map((column) => (
              <TableColumnCell key={uuid()} color="black" column={column} />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(voucherData).map((row: any) => (
            <Row key={row} row={voucherData[row]} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
