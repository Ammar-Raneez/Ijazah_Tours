import {
  Fragment,
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import {
  createStyles,
  IconButton,
  makeStyles,
  useTheme,
  Theme,
} from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SpanAtom from '../atoms/SpanAtom';
import { libraryTableStyles } from '../styles';

const tablePaginationActionsStyle = makeStyles((theme: Theme) => createStyles({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
    marginRight: theme.spacing(0.5),
    display: 'flex',
  },
  activeUsers: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2.5),
  },
}));

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
  active?: number;
}

function TablePaginationActions({
  count,
  page,
  active,
  rowsPerPage,
  onPageChange,
}: TablePaginationActionsProps) {
  const classes = tablePaginationActionsStyle();
  const theme = useTheme();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    const widthListener = window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });

    const removeEventListeners = () => {
      window.removeEventListener('resize', widthListener as any);
    };

    return removeEventListeners();
  }, [width]);

  const handleBackButtonClick = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, page + 1);
  };

  return (
    <>
      <div className={classes.root}>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>

        {active && (
          <div
            style={width < 700 ? { display: 'none' } : {}}
            className={classes.activeUsers}
          >
            <SpanAtom text="ACTIVE CUSTOMERS: " style={libraryTableStyles.totalUsers} />
            <Fragment>&nbsp;</Fragment>
            <SpanAtom text={`${active}/`} style={libraryTableStyles.activeUsers} />
            <SpanAtom text={String(count)} style={libraryTableStyles.totalUsers} />
          </div>
        )}
      </div>
    </>
  );
}

export default TablePaginationActions;
