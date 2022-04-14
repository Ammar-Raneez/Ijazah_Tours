import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ButtonAtom from '../../atoms/ButtonAtom';
import DivAtom from '../../atoms/DivAtom';
import { DASHBOARD_TASK_DATA } from '../../data';
import TaskTable from '../../organisms/dashboard/TaskTable';
import { selectWithoutNavbarHeight } from '../../redux/containerSizeSlice';
import { dashboardStyles } from '../../styles';

function Dashboard() {
  const height = useSelector(selectWithoutNavbarHeight);

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
