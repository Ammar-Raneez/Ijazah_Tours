import { MouseEventHandler } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import FormControlInput from '../../../molecules/FormControlInput';
import ButtonAtom from '../../../atoms/ButtonAtom';
import {
  formCreateMemberStyles,
  libraryTableToolbarStyles,
} from '../../../styles';

interface UMTeamMemberDialogProps {
  newFirstname: string;
  newLastname: string;
  newEmail: string;
  newRole: string;
  newStatus: string;
  newPassword: string;
  openDialog: boolean;
  onCreateMember: MouseEventHandler<HTMLButtonElement>;
  setOpenDialog: any;
  setNewFirstname: any;
  setNewLastname: any;
  setNewEmail: any;
  setNewRole: any;
  setNewStatus: any;
  setNewPassword: any;
}

function UMTeamMemberDialog({
  newFirstname,
  newLastname,
  newEmail,
  newRole,
  newStatus,
  newPassword,
  openDialog,
  setOpenDialog,
  setNewFirstname,
  setNewLastname,
  setNewEmail,
  setNewRole,
  setNewStatus,
  setNewPassword,
  onCreateMember,
}: UMTeamMemberDialogProps) {
  return (
    <>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle style={formCreateMemberStyles.title}>Add Team Member</DialogTitle>
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
            type="email"
          />
          <FormControlInput
            flex={1}
            label="Password"
            fullWidth
            multiline={false}
            rows={1}
            value={newPassword}
            setValue={setNewPassword}
            placeholder="Enter Password"
            type="password"
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
            text="Add Team Member"
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
    </>
  );
}

export default UMTeamMemberDialog;
