import { useEffect, useState } from 'react';
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
import { auth, db } from '../../../firebase';
import { formCreateMemberStyles, libraryTableToolbarStyles, settingsStyles } from '../../../styles';
import { SettingsTeamMember } from '../../../utils/types';

function UserManagement() {
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
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [openNewDialog, setNewOpenDialog] = useState(false);
  const [openEditDialog, setEditOpenDialog] = useState(false);

  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

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
  }, [isDeleting, isEditing, isCreating]);

  useEffect(() => {
    setContainerHeight(window.innerHeight - 180);
    setContainerWidth(window.innerWidth);

    const widthListener = window.addEventListener('resize', () => {
      setContainerWidth(window.innerWidth);
    });
    const heightListener = window.addEventListener('resize', () => {
      setContainerHeight(window.innerHeight - 180);
    });

    const removeEventListeners = () => {
      window.removeEventListener('resize', heightListener as any);
      window.removeEventListener('resize', widthListener as any);
    };

    return removeEventListeners();
  }, [containerWidth, containerHeight]);

  const onCreateMember = async () => {
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

  const onEditTeamMemberClick = (row: SettingsTeamMember) => {
    setEditOpenDialog(true);
    setEditId(row.id);
    setEditFirstName(row.firstName);
    setEditLastName(row.lastName);
    setEditRole(row.role);
  };

  const onEditMember = async () => {
    setIsEditing(true);
    await updateDoc(doc(db, 'Team Members', editId), {
      firstName: editFirstName,
      lastName: editLastName,
      role: editRole,
      updatedAt: serverTimestamp(),
    });
    setIsEditing(false);
    setEditOpenDialog(false);
  };

  const clearInputs = () => {
    setNewFirstName('');
    setNewLastName('');
    setNewRole('');
    setNewPassword('');
    setNewEmail('');
  };

  return (
    <DivAtom style={settingsStyles.container}>
      <DivAtom
        style={{
          ...settingsStyles.innerContainer,
          height: `${containerHeight}px`,
        }}
      >
        <DivAtom
          style={{
            ...formCreateMemberStyles.multiFieldContainer,
            flexDirection: containerWidth < 1000 ? 'column' : 'row',
            marginTop: '1rem',
          }}
        >
          <H2Atom style={formCreateMemberStyles.title} text="Team Members" />
          <ButtonAtom
            starticon={<AddCircleOutlineOutlinedIcon />}
            text="Add Team Member"
            onClick={() => setNewOpenDialog(true)}
            style={{
              ...libraryTableToolbarStyles.addBtn,
              width: containerWidth < 1000 ? '100%' : 'auto',
              height: '3rem',
              marginLeft: containerWidth < 1000 ? '0px' : '1rem',
              marginBottom: containerWidth < 1000 ? '1rem' : '0',
            }}
            size="large"
          />
        </DivAtom>
        <UMTeamMemberDialog
          btnText="Create Team Member"
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
        <UMTeamMemberDialog
          btnText="Edit Team Member"
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
