import { ChangeEvent, MouseEvent } from 'react';
import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

import TableColumnCell from './TableColumnCell';
import { Order, LibraryHeadCell } from '../utils/types';

interface LibraryTableHeadProps {
  orderBy: string;
  numSelected: number;
  rowCount: number;
  classes: ClassNameMap<'root' | 'table' | 'paper' | 'visuallyHidden'>;
  headCells: LibraryHeadCell[];
  onRequestSort: (event: MouseEvent<HTMLSpanElement>, property: string) => void;
  onSelectAllClick: (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => void;
  order: Order;
}

function LibraryTableHead({
  classes,
  headCells,
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

  const spanOrderText = order === 'desc' ? 'sorted descending' : 'sorted ascending';

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell: any) => (
          <TableColumnCell
            color="#B5B5C3"
            key={headCell.id}
            align="left"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>{spanOrderText}</span>
              ) : null}
            </TableSortLabel>
          </TableColumnCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default LibraryTableHead;
