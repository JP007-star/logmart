import React, { useEffect, useState } from "react";
import { ThemeProvider } from "../../components/ThemeContext";
import * as Unicons from "@iconscout/react-unicons";
import SideBar from "../../components/SideBar";
import AddUser from "../../components/AddUser";
import UserList from "../../components/UserList";
import AdminHeader from "../../components/AdminHeader";
import { getServerSideProps } from "../../actions/initialData.action";
import { SideBarMobile } from "../../components/SideBarMobile";

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
          <div className="d-none d-md-block col-md-2">
            <SideBar activeNavLink="users" />
          </div>
          <div className="card col-12 col-md-10 ms-md-3 mt-md-3">
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
        <SideBarMobile/>
        <div className="container d-md-block">
        <p className="text-center text-muted m-2" >
          © 2024 Copyright: JP made with Love 
          <img src="/images/heart.svg" height="20px" width="20px" alt="" />
        </p>
      </div>
      </ThemeProvider>
    </>
  );
};

export default AdminUsers;
