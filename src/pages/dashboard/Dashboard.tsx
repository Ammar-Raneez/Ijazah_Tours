import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonAtom from '../../atoms/ButtonAtom';
import DivAtom from '../../atoms/DivAtom';
import { DASHBOARD_TASK_DATA } from '../../data';
import TaskTable from '../../organisms/dashboard/TaskTable';
import { dashboardStyles } from '../../styles';

function Dashboard() {
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    setContainerHeight(window.innerHeight - 125);
    const heightListener = window.addEventListener('resize', () => {
      setContainerHeight(window.innerHeight - 125);
    });

    const removeEventListeners = () => {
      window.removeEventListener('resize', heightListener as any);
    };

    return removeEventListeners();
  }, [containerHeight]);

  return (
    <DivAtom style={dashboardStyles.container}>
      <DivAtom
        style={{
          ...dashboardStyles.innerContainer,
          height: `${containerHeight}px`,
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
