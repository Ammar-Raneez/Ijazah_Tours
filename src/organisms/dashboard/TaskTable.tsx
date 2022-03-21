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

import TableColumnCell from '../../molecules/TableColumnCell';
import TableRowButtonCell from '../../molecules/TableRowButtonCell';
import TableRowIconCell from '../../molecules/TableRowIconCell';
import TableRowCheckboxCell from '../../molecules/TableRowCheckboxCell';

interface TaskTableProps {
  columns?: string[];
  rows?: any[];
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

  return (
    <Fragment>
      <TableRow>
        <TableRowCheckboxCell
          name={row.name}
          checked={rowChecked}
          onChange={onChangeRowStatus}
          align="left"
        />
        <TableCell>{row.title}</TableCell>
        <TableRowButtonCell
          key={uuid()}
          onClick={() => null}
          align="left"
          btnwidth="8rem"
          btnsize="medium"
          btnborderradius="0.5rem"
          btntext={rowChecked ? 'A' : row.status}
          btncolors={['#29CC97', '#ffffff']}
          btndisabled
        />
        {row.subtasks ? (
          <TableRowIconCell
            align="left"
            size="small"
            onClick={() => setOpen(!open)}
            textcolor="#5344C2"
            padding="0"
          >
            {keyboardIcon}
          </TableRowIconCell>
        ) : (
          <TableCell>{''}</TableCell>
        )}
      </TableRow>
      {row.subtasks && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Table size="small" aria-label="subtasks">
                  <TableBody>
                    {row.subtasks.map((subtask: any, index: number) => (
                      <TableRow key={subtask.id}>
                        <TableRowCheckboxCell
                          name={subtask.title}
                          checked={subTasksChecked[index]}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeSubTaskStatus(e, index)}
                          align="left"
                        />
                        <TableRowButtonCell
                          key={uuid()}
                          onClick={() => null}
                          align="left"
                          btnwidth="8rem"
                          btnsize="medium"
                          btnborderradius="0.5rem"
                          btntext={subTasksChecked[index] ? 'COMPLETE' : 'TODO'}
                          btncolors={
                            subTasksChecked[index]
                              ? ['#29CC97', '#ffffff']
                              : ['#7879F1', '#ffffff']
                          }
                          btndisabled
                        />
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </Fragment>
  );
}

export default function TaskTable({ columns, rows }: TaskTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {columns!.map((column) => (
              <TableColumnCell key={uuid()} color="b5b5c3" column={column} />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows!.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
