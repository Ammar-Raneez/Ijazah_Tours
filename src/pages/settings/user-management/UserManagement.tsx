import { useEffect, useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import UMTeamMemberDialog from '../../../organisms/settings/user-management/UMTeamMemberDialog';
import ButtonAtom from '../../../atoms/ButtonAtom';
import DivAtom from '../../../atoms/DivAtom';
import H2Atom from '../../../atoms/H2Atom';
import { SETTINGS_TEAM_MEMBER_DATA } from '../../../data';
import { formCreateMemberStyles, libraryTableToolbarStyles, settingsStyles } from '../../../styles';
import UMTeamMemberTable from '../../../organisms/settings/user-management/UMTeamMemberTable';

function UserManagement() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');

  const [openDialog, setOpenDialog] = useState(false);

  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

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

  const onCreateMember = () => {
    // eslint-disable-next-line no-console
    console.log('Created member');
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
          newStatus={status}
          onCreateMember={onCreateMember}
          setNewFirstname={setFirstName}
          setNewLastname={setLastName}
          setNewEmail={setEmail}
          setNewRole={setRole}
          setNewStatus={setStatus}
        />
        <DivAtom style={{ marginTop: '1rem' }}>
          {SETTINGS_TEAM_MEMBER_DATA.length > 0 && (
            <UMTeamMemberTable
              columns={[
                'FIRST NAME',
                'LAST NAME',
                'EMAIL',
                'SINCE',
                'REGISTERED',
              ]}
              data={SETTINGS_TEAM_MEMBER_DATA}
            />
          )}
        </DivAtom>
      </DivAtom>
    </DivAtom>
  );
}

export default UserManagement;
