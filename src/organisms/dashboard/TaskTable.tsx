import { ChangeEvent, Fragment, useState } from 'react';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { v4 as uuid } from 'uuid';

import TableColumnCell from '../../molecules/TableColumnCell';
import TableRowButtonCell from '../../molecules/TableRowButtonCell';
import TableRowCheckboxCell from '../../molecules/TableRowCheckboxCell';
import { DashboardTask } from '../../utils/types';

interface TaskTableProps {
  columns: string[];
  dashboardData: DashboardTask[];
  setDashboardData: any;
}

interface RowProps {
  index: number;
  row: DashboardTask;
  dashboardData: DashboardTask[];
  setDashboardData: any;
}

function Row({
  row,
  index,
  dashboardData,
  setDashboardData,
}: RowProps) {
  const [rowChecked, setRowChecked] = useState(row.completed);

  const onChangeRowStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setRowChecked(e.target.checked);
    const temp = [...dashboardData];
    temp.splice(index, 1, { ...row, completed: e.target.checked });
    setDashboardData(temp);
  };

  return (
    <Fragment>
      <TableRow>
        <TableRowCheckboxCell
          name={row.status}
          checked={rowChecked}
          onChange={onChangeRowStatus}
          align="left"
        />
        <TableCell>{row.title}</TableCell>
        <TableRowButtonCell
          key={uuid()}
          onClick={() => null}
          align="left"
          btnWidth="8rem"
          btnSize="medium"
          btnBorderRadius="0.5rem"
          btnText={row.stage}
          btnColors={['#29CC97', '#ffffff']}
          btnDisabled
        />
      </TableRow>
    </Fragment>
  );
}

export default function TaskTable({
  columns,
  dashboardData,
  setDashboardData,
}: TaskTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableColumnCell key={uuid()} color="b5b5c3" column={column} />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dashboardData.map((row, index) => (
            <Row
              key={index}
              row={row}
              index={index}
              dashboardData={dashboardData}
              setDashboardData={setDashboardData}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
