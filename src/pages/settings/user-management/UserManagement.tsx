import { useEffect, useState } from 'react';

import DivAtom from '../../../atoms/DivAtom';
import { SETTINGS_TEAM_MEMBER_DATA } from '../../../data';
import UMTeamMemberContainer from '../../../organisms/settings/user-management/UMTeamMemberContainer';
import { settingsStyles } from '../../../styles';

function UserManagement() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');

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
  }, [containerHeight]);

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
        <UMTeamMemberContainer
          width={containerWidth}
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
          teamMemberData={SETTINGS_TEAM_MEMBER_DATA}
        />
      </DivAtom>
    </DivAtom>
  );
}

export default UserManagement;
