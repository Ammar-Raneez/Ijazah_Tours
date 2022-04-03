import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import TaskTable from '../../organisms/dashboard/TaskTable';
import ButtonAtom from '../../atoms/ButtonAtom';
import DivAtom from '../../atoms/DivAtom';
import { DASHBOARD_TASK_DATA } from '../../data';
import { dashboardStyles } from '../../styles';

function Dashboard() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(window.innerHeight - 125);
    const heightListener = window.addEventListener('resize', () => {
      setHeight(window.innerHeight - 125);
    });

    const removeEventListeners = () => {
      window.removeEventListener('resize', heightListener as any);
    };

    return removeEventListeners();
  }, [height]);

  return (
    <DivAtom style={dashboardStyles.container}>
      <DivAtom
        style={{
          ...dashboardStyles.innerContainer,
          height: `${height}px`,
        }}
      >
        <DivAtom style={dashboardStyles.btnMainContainer}>
          <Link to="/quote/quotations/create/customer">
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
        <DivAtom>
          <TaskTable
            columns={['Task Name', 'Quotation Title', 'Status', '']}
            rows={DASHBOARD_TASK_DATA}
          />
        </DivAtom>
      </DivAtom>
    </DivAtom>
  );
}

export default Dashboard;
