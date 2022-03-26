import { useEffect, useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  serverTimestamp,
  setDoc,
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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const [teamData, setTeamData] = useState<DocumentData[]>([]);

  const [openDialog, setOpenDialog] = useState(false);

  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const getInitialTeamData = async () => {
      const data = (await getDocs(collection(db, 'Team Members'))).docs.map((dc) => dc.data());
      setTeamData(data);
    };

    getInitialTeamData();
  }, [openDialog]);

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
    await setDoc(doc(db, 'Team Members', uuid()), {
      firstName,
      lastName,
      email,
      role,
      status: 'Registered',
      createdAt: serverTimestamp(),
    });

    await createUserWithEmailAndPassword(auth, email, password);
    clearInputs();
    setOpenDialog(false);
  };

  const clearInputs = () => {
    setFirstName('');
    setLastName('');
    setRole('');
    setPassword('');
    setEmail('');
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
            onClick={() => setOpenDialog(true)}
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
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          newFirstname={firstName}
          newLastname={lastName}
          newEmail={email}
          newRole={role}
          newPassword={password}
          onCreateMember={onCreateMember}
          setNewFirstname={setFirstName}
          setNewLastname={setLastName}
          setNewEmail={setEmail}
          setNewRole={setRole}
          setNewPassword={setPassword}
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
              ]}
              data={teamData as SettingsTeamMember[]}
            />
          )}
        </DivAtom>
      </DivAtom>
    </DivAtom>
  );
}

export default UserManagement;
