// src/App.js
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from "../../components/ThemeContext";
import AdminHeader from '../../components/AdminHeader';
import SideBar from '../../components/SideBar';
import { DashboardCounter } from '../../components/DashboardCounter';
import { SideBarMobile } from '../../components/SideBarMobile';
import { getServerSideProps } from '../../actions/initialData.action';
import Charts from '../../components/Charts';
import './style.css';

const AdminDashboardPage = () => {
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
        <div>
            <ThemeProvider>
                <AdminHeader />
                <div className="d-flex">
                    <div className={`sidebar-container ${isSidebarMinimized ? 'minimized' : ''}`}>
                        <SideBar activeNavLink="dashboard" onLogoClick={toggleSidebar} />
                    </div>
                    <div className={`content-area card ${isSidebarMinimized ? 'expanded' : ''}`}>
                        <div className="dash-div">
                            <DashboardCounter initialData={initialData} />
                            <Charts className="card" data={initialData} />
                        </div>
                    </div>
                </div>
                <SideBarMobile isSidebarMinimized={isSidebarMinimized} toggleSidebar={toggleSidebar} />
                <div className="container d-md-block">
                    <p className="text-center text-muted m-2">
                        © 2024 Copyright: JP made with Love
                        <img src="/images/heart.svg" height="20px" width="20px" alt="" />
                    </p>
                </div>
            </ThemeProvider>
        </div>
    );
};

export default AdminDashboardPage;
