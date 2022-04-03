import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { v4 as uuid } from 'uuid';

import UMTeamMemberTable from '../../../organisms/settings/user-management/UMTeamMemberTable';
import UMTeamMemberDialog from '../../../organisms/settings/user-management/UMTeamMemberDialog';
import ButtonAtom from '../../../atoms/ButtonAtom';
import DivAtom from '../../../atoms/DivAtom';
import H2Atom from '../../../atoms/H2Atom';
import { selectHeight, selectWidth } from '../../../redux/containerSizeSlice';
import { auth, db } from '../../../firebase';
import { FlexDirection, SettingsTeamMember } from '../../../utils/types';
import { widthHeightDynamicStyle } from '../../../utils/helpers';
import { TableToolbarStyles, settingsStyles } from '../../../styles';

function UserManagement() {
  const height = useSelector(selectHeight);
  const width = useSelector(selectWidth);

  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('');

  const [editId, setEditId] = useState('');
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editRole, setEditRole] = useState('');

  const [teamData, setTeamData] = useState<DocumentData[]>([]);

  const [showValidationErrorMessage, setShowValidationErrorMessage] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [openNewDialog, setNewOpenDialog] = useState(false);
  const [openEditDialog, setEditOpenDialog] = useState(false);

  useEffect(() => {
    const getInitialTeamData = async () => {
      const data = (await getDocs(collection(db, 'Team Members'))).docs;
      const members = data.map((dc) => dc.data());
      const ids = data.map((dc) => dc.id);
      ids.forEach((id, i) => {
        members[i].id = id;
      });

      setTeamData(members);
    };

    getInitialTeamData();
  }, [isDeleting, isUpdating, isCreating]);

  const onCreateMember = async () => {
    setShowValidationErrorMessage(false);
    if (newFirstName.trim() === '' || newLastName.trim() === ''
      || newEmail.trim() === '' || newRole.trim() === '') {
      setShowValidationErrorMessage(true);
      return;
    }

    setIsCreating(true);
    await setDoc(doc(db, 'Team Members', uuid()), {
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      role: newRole,
      status: 'ACTIVE',
      createdAt: serverTimestamp(),
    });

    await createUserWithEmailAndPassword(auth, newEmail, newPassword);
    clearInputs();
    setIsCreating(false);
    setNewOpenDialog(false);
  };

  const deleteTeamMember = async (row: SettingsTeamMember) => {
    // eslint-disable-next-line no-alert, no-restricted-globals
    const confirmDelete = confirm('Are you sure you want to delete this team member?');
    if (confirmDelete) {
      setIsDeleting(false);
      await deleteDoc(doc(db, 'Team Members', row.id));
      setIsDeleting(true);
    }
  };

  const onEditMember = async () => {
    setShowValidationErrorMessage(false);
    if (editFirstName.trim() === '' || editLastName.trim() === ''
      || editRole.trim() === '') {
      setShowValidationErrorMessage(true);
      return;
    }

    setIsUpdating(true);
    await updateDoc(doc(db, 'Team Members', editId), {
      firstName: editFirstName,
      lastName: editLastName,
      role: editRole,
      updatedAt: serverTimestamp(),
    });

    setIsUpdating(false);
    setEditOpenDialog(false);
  };

  const clearInputs = () => {
    setShowValidationErrorMessage(false);
    setNewFirstName('');
    setNewLastName('');
    setNewRole('');
    setNewPassword('');
    setNewEmail('');
  };

  const onEditTeamMemberClick = (row: SettingsTeamMember) => {
    setEditOpenDialog(true);
    setEditId(row.id);
    setEditFirstName(row.firstName);
    setEditLastName(row.lastName);
    setEditRole(row.role);
    setShowValidationErrorMessage(false);
  };

  return (
    <DivAtom style={settingsStyles.container}>
      <DivAtom
        style={{
          ...settingsStyles.innerContainer,
          height: `${height}px`,
        }}
      >
        <DivAtom
          style={{
            ...settingsStyles.multiFieldContainer,
            flexDirection: widthHeightDynamicStyle(width, 1000, 'column', 'row') as FlexDirection,
            marginTop: '1rem',
          }}
        >
          <H2Atom style={settingsStyles.title} text="Team Members" />
          <ButtonAtom
            startIcon={<AddCircleOutlineOutlinedIcon />}
            text="Add Team Member"
            onClick={() => setNewOpenDialog(true)}
            style={{
              ...TableToolbarStyles.addBtn,
              width: widthHeightDynamicStyle(width, 1000, '100%', 'auto'),
              height: '3rem',
              marginLeft: widthHeightDynamicStyle(width, 1000, 0, '1rem'),
              marginBottom: widthHeightDynamicStyle(width, 1000, '1rem', 0),
            }}
            size="large"
          />
        </DivAtom>
        {/* Create Team Member */}
        <UMTeamMemberDialog
          btnText="Create Team Member"
          showValidationErrorMessage={showValidationErrorMessage}
          isCreating={isCreating}
          openDialog={openNewDialog}
          setOpenDialog={setNewOpenDialog}
          newFirstname={newFirstName}
          newLastname={newLastName}
          newEmail={newEmail}
          newRole={newRole}
          newPassword={newPassword}
          onEditCreateMember={onCreateMember}
          setNewFirstname={setNewFirstName}
          setNewLastname={setNewLastName}
          setNewEmail={setNewEmail}
          setNewRole={setNewRole}
          setNewPassword={setNewPassword}
        />
        {/* Edit Team Member */}
        <UMTeamMemberDialog
          btnText="Edit Team Member"
          showValidationErrorMessage={showValidationErrorMessage}
          isCreating={isUpdating}
          openDialog={openEditDialog}
          setOpenDialog={setEditOpenDialog}
          newFirstname={editFirstName}
          newLastname={editLastName}
          newRole={editRole}
          onEditCreateMember={onEditMember}
          setNewFirstname={setEditFirstName}
          setNewLastname={setEditLastName}
          setNewRole={setEditRole}
        />
        <DivAtom style={{ marginTop: '1rem' }}>
          {teamData.length > 0 && (
            <UMTeamMemberTable
              columns={[
                'FIRST NAME',
                'LAST NAME',
                'EMAIL',
                'SINCE',
                'ROLE',
                'STATUS',
                '',
                '',
              ]}
              deleteTeamMember={deleteTeamMember}
              onEditTeamMemberClick={onEditTeamMemberClick}
              data={teamData as SettingsTeamMember[]}
            />
          )}
        </DivAtom>
      </DivAtom>
    </DivAtom>
  );
}

export default UserManagement;
