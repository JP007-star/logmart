// components/UserProfile.js
import React from 'react';
import { useAuth } from '../hooks/useAuth'; // Adjust path as necessary
import { Avatar, Typography, Box } from '@mui/material';

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
      <Avatar src={user.profilePicture} sx={{ width: 56, height: 56, marginRight: 2 }} />
      <div>
        <Typography variant="h6">{user.fullName}</Typography>
        <Typography variant="body2">{user.email}</Typography>
      </div>
    </Box>
  );
};

export default UserProfile;
