import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import { Biller } from "../../components/Biller";
import { DashboardCounter } from "../../components/DashboardCounter";
import AdminHeader from "../../components/AdminHeader";
import { ThemeProvider } from "../../components/ThemeContext";
import { getServerSideProps } from "../../actions/initialData.action";
import './style.css'; // Import the CSS file
import { SideBarMobile } from "../../components/SideBarMobile";

const AdminHome = () => {
  const [initialData, setInitialData] = useState({ products: [], users: [] });
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
    setIsSidebarMinimized(!isSidebarMinimized);
  };

  return (
    <ThemeProvider>
      <AdminHeader />
      <div className="admin-dashboard-container">
        <div className={`sidebar-container ${isSidebarMinimized ? 'minimized' : ''}`}>
          <SideBar activeNavLink="home" />
          <button onClick={toggleSidebar} className="toggle-sidebar-btn">
            {isSidebarMinimized ? '>' : '<'}
          </button>
        </div>
        <div className={`content-area card m-2 ${isSidebarMinimized ? 'expanded' : ''}`}>
          <div>
            <DashboardCounter initialData={initialData} />
            <Biller initialData={initialData} />
          </div>
        </div>
        <SideBarMobile isSidebarMinimized={isSidebarMinimized} toggleSidebar={toggleSidebar} />
      </div>
      <footer className="footer">
      © 2024 Copyright: JP made with Love 
      <img src="/images/heart.svg" height="20px" width="20px" alt="" />
      
      </footer>
    </ThemeProvider>
  );
};

export default AdminHome;
