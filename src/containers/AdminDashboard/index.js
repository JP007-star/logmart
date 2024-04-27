import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import { Biller } from "../../components/Biller";
import { DashboardCounter } from "../../components/DashboardCounter";
import AdminHeader from "../../components/AdminHeader";
import { ThemeProvider } from "../../components/ThemeContext";
import { getServerSideProps } from "../../actions/initialData.action";

const AdminDashboard = () => {
  const [initialData, setInitialData] = useState({ products: [], users: [] });

  useEffect(() => {
    const initialData = async () => {
      try {
        const initial = await getServerSideProps();
        console.log(initial);
        setInitialData(initial.initialData);
      } catch (error) {
        console.error('Error fetching initial data:', error.message);
      }
    };

    initialData();
  }, []);

  const [isSidebarMinimized] = useState(false);

  return (
    <ThemeProvider>
      <AdminHeader />
      <div className="d-flex h-100">
        <SideBar
          activeNavLink="home"
          className={`vh-75 col-1 ${isSidebarMinimized ? ' sidebar-minimized' : ''}`}
        />
        <div className={`card m-2 col-11`}>
          <div className="card-body">
            <DashboardCounter initialData={initialData} />
            <Biller initialData={initialData} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AdminDashboard;
