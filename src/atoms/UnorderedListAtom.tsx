import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DivAtom from './DivAtom';

interface UnorderedListAtomProps {
  type: string;
  allChildren: { id: string, val: string }[];
  onEditItem: (type: string, id: string) => void;
  onDeleteItem: (type: string, id: string) => void;
}

function UnorderedListAtom({
  type,
  allChildren,
  onEditItem,
  onDeleteItem,
}: UnorderedListAtomProps) {
  return (
    <ul>
      {allChildren.map((val) => (
        <DivAtom style={{ display: 'flex', alignItems: 'center' }}>
          <li style={{ width: '150px' }} key={val.id}>{val.val}</li>
          <IconButton onClick={() => onEditItem(type, val.id)}>
            <EditOutlinedIcon />
          </IconButton>
          <IconButton onClick={() => onDeleteItem(type, val.id)}>
            <DeleteOutlinedIcon />
          </IconButton>
        </DivAtom>
      ))}
    </ul>
  );
}

export default UnorderedListAtom;
