import React, { useEffect, useState } from "react";
import { ThemeProvider } from "../../components/ThemeContext";
import * as Unicons from "@iconscout/react-unicons";
import SideBar from "../../components/SideBar";
import AddUser from "../../components/AddUser";

import Footer from "../../components/Footer";
import UserList from "../../components/UserList";
import AdminHeader from "../../components/AdminHeader";
import { getServerSideProps } from "../../actions/initialData.action";

const AdminUsers = ({ users: initialUsers, userCount: initialUserCount }) => {
  const [isAddUserVisible, setAddUserVisible] = useState(false);
  const [users, setUsers] = useState(initialUsers);
  useEffect(() => {
    const initialData = async () => {
      try {
        const initial = await getServerSideProps();
        console.log(initial);
        setUsers(initial.initialData.users)
      } catch (error) {
        console.error('Error fetching initial data:', error.message);
      }
    };

    initialData();
  }, []);
  const handleAddUserClick = () => {
    setAddUserVisible(true);
  };

  const handleFormSubmit = async (newUserData) => {
    try {
      const response = await fetch("https://user-service-iflk.onrender.com/api/v1/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUsers([...users, data.user]);
      } else {
        console.error("Failed to add user:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding user:", error.message);
    }

    setAddUserVisible(false);
  };
  return (
    <>
      <ThemeProvider>
        <AdminHeader />
        <div className="d-flex col-12">
          <SideBar activeNavLink="users" className="vh-100 col-2" />
          <div className="card col-10 ms-md-3 mt-md-3">
            <div className="card-body">
              {isAddUserVisible ? (
                <AddUser
                  onCancel={() => setAddUserVisible(false)}
                  onSubmit={handleFormSubmit}
                />
              ) : (
                <div className="col-12">
                  <div className="d-flex justify-content-between m-3">
                  <h2>User List</h2>
                  <button
                    id="add-user"
                    className="btn btn-primary float-sm-end float-lg-end"
                    type="button"
                    onClick={handleAddUserClick}
                  >
                    <Unicons.UilPlus />
                    <Unicons.UilUser />
                  </button>
                  </div>
                 

                  <div className="user-list-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
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
        <Footer />
      </ThemeProvider>
    </>
  );
};




export default AdminUsers;
