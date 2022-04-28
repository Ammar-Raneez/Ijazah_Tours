import { useEffect, useState } from 'react';

import { CircularProgress } from '@material-ui/core';
import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ButtonAtom from '../../atoms/ButtonAtom';
import DivAtom from '../../atoms/DivAtom';
import { db } from '../../firebase';
import TaskTable from '../../organisms/dashboard/TaskTable';
import { selectWithoutNavbarHeight, selectWithoutNavbarWidth } from '../../redux/containerSizeSlice';
import { dashboardStyles, fetchingDataIndicatorStyles } from '../../styles';
import { widthHeightDynamicStyle } from '../../utils/helpers';
import { DashboardTask } from '../../utils/types';

function Dashboard() {
  const height = useSelector(selectWithoutNavbarHeight);
  const width = useSelector(selectWithoutNavbarWidth);

  const [dashboardData, setDashboardData] = useState<DashboardTask[]>();
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const getIntialDashboardData = async () => {
      const data = (await getDocs(collection(db, 'Dashboard Tasks'))).docs;
      const tasks = data.map((dc) => dc.data());
      const ids = data.map((dc) => dc.id);
      ids.forEach((id, i) => {
        tasks[i].id = id;
      });

      setDashboardData(tasks as DashboardTask[]);
    };

    getIntialDashboardData();
  }, []);

  const onUpdateTaskStatus = async () => {
    setIsUpdating(true);
    await updateTaskStatus();
    setIsUpdating(false);
  };

  const updateTaskStatus = async () => {
    dashboardData?.forEach(async (task) => {
      await setDoc(doc(db, 'Dashboard Tasks', task.id), {
        ...task,
        updatedAt: serverTimestamp(),
      });
    });
  };

  return (
    <DivAtom style={dashboardStyles.container}>
      <DivAtom
        style={{
          ...dashboardStyles.innerContainer,
          ...dashboardStyles.mainContainer,
          height: `${height}px`,
        }}
      >
        <DivAtom style={dashboardStyles.btnMainContainer}>
          <Link to="/library/guest/create">
            <ButtonAtom
              text="Create Customer"
              style={{
                ...dashboardStyles.btn,
                marginRight: '16px',
              }}
              onClick={() => null}
              size="large"
            />
          </Link>
        </DivAtom>
        {dashboardData ? (
          <>
            <DivAtom>
              <TaskTable
                columns={['Task Name', 'Quotation Title', 'Status', '']}
                dashboardData={dashboardData}
                setDashboardData={setDashboardData}
              />
            </DivAtom>
            <ButtonAtom
              endIcon={isUpdating && <CircularProgress size={20} color="inherit" />}
              size="large"
              disabled={isUpdating}
              text="Update"
              onClick={onUpdateTaskStatus}
              style={{
                ...dashboardStyles.addBtn,
                width: widthHeightDynamicStyle(width, 768, '100%', '18%'),
                marginTop: '1rem',
              }}
            />
          </>
        ) : (
          <DivAtom style={fetchingDataIndicatorStyles.container}>
            <CircularProgress size={20} color="primary" />
          </DivAtom>
        )}
      </DivAtom>
    </DivAtom>
  );
}

export default Dashboard;
