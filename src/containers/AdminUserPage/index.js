import React, { useEffect, useState } from "react";
import { ThemeProvider } from "../../components/ThemeContext";
import * as Unicons from "@iconscout/react-unicons";
import SideBar from "../../components/SideBar";
import AddUser from "../../components/AddUser";
import UserList from "../../components/UserList";
import AdminHeader from "../../components/AdminHeader";
import { getServerSideProps } from "../../actions/initialData.action";
import { SideBarMobile } from "../../components/SideBarMobile";
import './style.css'; // Import the CSS file
import { userApi } from "../../config";

const AdminUsers = ({ users: initialUsers }) => {
  const [isAddUserVisible, setAddUserVisible] = useState(false);
  const [users, setUsers] = useState(initialUsers);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarMinimized(!isSidebarMinimized);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const initial = await getServerSideProps();
        setUsers(initial.initialData.users);
      } catch (error) {
        console.error('Error fetching initial data:', error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUserClick = () => {
    setAddUserVisible(true);
  };

  const handleFormSubmit = async (newUserData) => {
    try {
      const response = await fetch(userApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserData),
      });

      if (response.ok) {
        const data = await response.json();
        setUsers([...users, data.user]);
        setAddUserVisible(false);
      } else {
        console.error("Failed to add user:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding user:", error.message);
    }
  };

  return (
    <ThemeProvider>
      <AdminHeader />
      <div className="d-flex admin-users-container">
        <div className={`sidebar-container ${isSidebarMinimized ? 'minimized' : ''}`}>
          <SideBar activeNavLink="users" />
          <button onClick={toggleSidebar} className="toggle-sidebar-btn">
            {isSidebarMinimized ? '>' : '<'}
          </button>
        </div>
        <div className={`main-content ${isSidebarMinimized ? 'expanded' : ''}`}>
          <div className="card shadow-sm rounded mt-3">
            <div className="card-body">
              {isAddUserVisible ? (
                <AddUser
                  onCancel={() => setAddUserVisible(false)}
                  onSubmit={handleFormSubmit}
                />
              ) : (
                <div className="user-list-section">
                  <div className="row">
                    <h2>User List</h2>
                    <button
                      id="add-user"
                      className="btn btn-secondary"
                      type="button"
                      onClick={handleAddUserClick}
                    >
                      <Unicons.UilPlus /> Add User
                    </button>
                  </div>
                  <div className="user-list-container">
                    {users && users.length > 0 ? (
                      <UserList users={users} />
                    ) : (
                      <p>No users available.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <SideBarMobile />
      <footer className="text-center text-muted mt-3 mb-2">
        © 2024 Copyright: JP made with Love 
        <img src="/images/heart.svg" height="20px" width="20px" alt="" />
      </footer>
    </ThemeProvider>
  );
};

export default AdminUsers;
