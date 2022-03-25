import { MouseEventHandler, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import UMTeamMemberTable from './UMTeamMemberTable';
import FormControlInput from '../../../molecules/FormControlInput';
import ButtonAtom from '../../../atoms/ButtonAtom';
import DivAtom from '../../../atoms/DivAtom';
import H2Atom from '../../../atoms/H2Atom';
import {
  formCreateMemberStyles,
  libraryTableToolbarStyles,
} from '../../../styles';

interface UMTeamMemberContainerProps {
  width: number;
  newFirstname: string;
  newLastname: string;
  newEmail: string;
  newRole: string;
  newStatus: string;
  onCreateMember: MouseEventHandler<HTMLButtonElement>;
  setNewFirstname: any;
  setNewLastname: any;
  setNewEmail: any;
  setNewRole: any;
  setNewStatus: any;
  teamMemberData: any;
}

function UMTeamMemberContainer({
  width,
  newFirstname,
  newLastname,
  newEmail,
  newRole,
  newStatus,
  setNewFirstname,
  setNewLastname,
  setNewEmail,
  setNewRole,
  setNewStatus,
  teamMemberData,
  onCreateMember,
}: UMTeamMemberContainerProps) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <DivAtom
        style={{
          ...formCreateMemberStyles.multiFieldContainer,
          flexDirection: width < 1000 ? 'column' : 'row',
          marginTop: '1rem',
        }}
      >
        <H2Atom style={formCreateMemberStyles.title} text="Team Members" />
        <ButtonAtom
          starticon={<AddCircleOutlineOutlinedIcon />}
          text="Add Team Member"
          onClick={() => setOpenDialog(true)}
          style={{
            ...libraryTableToolbarStyles.addBtn,
            width: width < 1000 ? '100%' : 'auto',
            height: '3rem',
            marginLeft: width < 1000 ? '0px' : '1rem',
            marginBottom: width < 1000 ? '1rem' : '0',
          }}
          size="large"
        />
      </DivAtom>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          <H2Atom style={formCreateMemberStyles.title} text="Add Team Member" />
        </DialogTitle>
        <DialogContent
          style={formCreateMemberStyles.multiFieldDialogContainer}
        >
          <FormControlInput
            flex={1}
            label="First Name"
            fullWidth
            multiline={false}
            rows={1}
            value={newFirstname}
            setValue={setNewFirstname}
            placeholder="Enter First Name"
          />
          <FormControlInput
            flex={1}
            label="Last Name"
            fullWidth
            multiline={false}
            rows={1}
            value={newLastname}
            setValue={setNewLastname}
            placeholder="Enter Last Name"
          />
          <FormControlInput
            flex={1}
            label="Email"
            fullWidth
            multiline={false}
            rows={1}
            value={newEmail}
            setValue={setNewEmail}
            placeholder="Enter Email"
          />
          <FormControlInput
            flex={1}
            label="Role"
            fullWidth
            multiline={false}
            rows={1}
            value={newRole}
            setValue={setNewRole}
            placeholder="Enter Role"
          />
          <FormControlInput
            flex={1}
            label="Status"
            fullWidth
            multiline={false}
            rows={1}
            value={newStatus}
            setValue={setNewStatus}
            placeholder="Enter Status"
          />
          <ButtonAtom
            starticon={<AddCircleOutlineOutlinedIcon />}
            text={width < 1000 ? 'Add Rate' : 'Add'}
            disabled={
              newFirstname === ''
              || newLastname === ''
              || newEmail === ''
              || newRole === ''
              || newStatus === ''
            }
            onClick={(event) => onCreateMember(event)}
            style={{
              ...libraryTableToolbarStyles.addBtn,
              marginTop: '1rem',
            }}
            size="large"
          />
        </DialogContent>
      </Dialog>
      <DivAtom style={{ marginTop: '1rem' }}>
        {teamMemberData.length > 0 && (
          <UMTeamMemberTable
            columns={[
              'FIRST NAME',
              'LAST NAME',
              'EMAIL',
              'SINCE',
              'REGISTERED',
            ]}
            data={teamMemberData}
          />
        )}
      </DivAtom>
    </>
  );
}

export default UMTeamMemberContainer;
