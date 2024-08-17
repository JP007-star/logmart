// src/App.js
import React from 'react';
import Header from '../../components/Header';
import { ThemeProvider } from "../../components/ThemeContext";
import Footer from '../../components/Footer';
import UserProfile from '../../components/UserProfile';


const ProfilePage = () => {
  
 

    return (
        <div >
        <ThemeProvider>
              
            <Header />
            
            <UserProfile/>
            <Footer />
          
            </ThemeProvider>
        </div>
    );
};

export default ProfilePage;
