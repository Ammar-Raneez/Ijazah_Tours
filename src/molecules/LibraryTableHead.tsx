import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import { ChangeEvent, MouseEvent } from 'react';
import { Order } from '../utils/helpers';
import TableColumnCell from './TableColumnCell';

const headCells = [
  { id: 'name', label: 'NAME' },
  { id: 'desc', label: 'DESCRIPTION' },
  { id: 'rate', numeric: true, label: 'RATE' },
  { id: 'location', numeric: true, label: 'LOCATION' },
  { id: 'ratings', numeric: true, label: 'RATINGS' },
  { id: 'group', label: 'GROUP' },
  { id: '...', label: '' },
  { id: '...1', label: '' },
  { id: '...2', label: '' },
];

interface LibraryTableHeadProps {
  orderBy: string;
  numSelected: number;
  rowCount: number;
  classes: any;
  onRequestSort: (event: MouseEvent<HTMLSpanElement>, property: string) => void;
  onSelectAllClick: (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  order: Order;
}

function LibraryTableHead({
  classes,
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
}: LibraryTableHeadProps) {
  const createSortHandler = (property: string) => (event: MouseEvent<HTMLSpanElement>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableColumnCell
            color="#B5B5C3"
            key={headCell.id}
            align={
              headCell.id === 'group'
                ? 'center'
                : headCell.numeric
                  ? 'right'
                  : 'left'
            }
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableColumnCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default LibraryTableHead;
