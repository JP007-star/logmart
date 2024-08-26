import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import { Biller } from "../../components/Biller";
import { DashboardCounter } from "../../components/DashboardCounter";
import AdminHeader from "../../components/AdminHeader";
import { ThemeProvider } from "../../components/ThemeContext";
import { getServerSideProps } from "../../actions/initialData.action";
import './style.css'; // Import the updated CSS file
import { SideBarMobile } from "../../components/SideBarMobile";

const AdminHome = () => {
  const [initialData, setInitialData] = useState({ products: [], users: [], orders: [] });
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const initial = await getServerSideProps();
        setInitialData(initial.initialData);
      } catch (error) {
        console.error('Error fetching initial data:', error.message);
      }
    };

    fetchInitialData();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarMinimized(prev => !prev);
  };

  return (
    <ThemeProvider>
      <AdminHeader />
      <div className="d-flex admin-dashboard-container">
        <div className={`sidebar-container ${isSidebarMinimized ? 'minimized' : ''}`}>
          <SideBar activeNavLink="home" onLogoClick={toggleSidebar} />
        </div>
        <div className={`content-area card  ${isSidebarMinimized ? 'expanded' : ''}`}>
          <div className="home-div">
            <DashboardCounter initialData={initialData} />
            <Biller initialData={initialData} />
          </div>
        </div>
      </div>
      <SideBarMobile isSidebarMinimized={isSidebarMinimized} toggleSidebar={toggleSidebar} />
      <div className="fixed-bottom bg-light  d-md-block">
        <p className="text-center text-muted">
          © 2024 Copyright: JP made with Love 
          <img src="/images/heart.svg" height="20px" width="20px" alt="" />
        </p>
      </div>
    </ThemeProvider>
  );
};

export default AdminHome;
