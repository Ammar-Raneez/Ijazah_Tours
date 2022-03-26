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
  btnText: string;
  newFirstname: string;
  newLastname: string;
  newRole: string;
  openDialog: boolean;
  onEditCreateMember: MouseEventHandler<HTMLButtonElement>;
  newPassword?: string;
  newEmail?: string;
  setOpenDialog: any;
  setNewFirstname: any;
  setNewLastname: any;
  setNewRole: any;
  setNewEmail?: any;
  setNewPassword?: any;
}

function UMTeamMemberDialog({
  btnText,
  newFirstname,
  newLastname,
  newEmail,
  newRole,
  newPassword,
  openDialog,
  setOpenDialog,
  setNewFirstname,
  setNewLastname,
  setNewEmail,
  setNewRole,
  setNewPassword,
  onEditCreateMember,
}: UMTeamMemberDialogProps) {
  return (
    <>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle style={formCreateMemberStyles.title}>{btnText}</DialogTitle>
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
          {newEmail === '' && (
            <>
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
                value={newPassword!}
                setValue={setNewPassword}
                placeholder="Enter Password"
                type="password"
              />
            </>
          )}
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
          <ButtonAtom
            starticon={<AddCircleOutlineOutlinedIcon />}
            text={btnText}
            disabled={
              newFirstname === ''
              || newLastname === ''
              || newEmail === ''
              || newRole === ''
            }
            onClick={(event) => onEditCreateMember(event)}
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
