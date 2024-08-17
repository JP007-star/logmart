// components/UserProfile.js
import React from 'react';
import { Avatar, Typography, Box, Divider, Grid, Card, CardContent, CardHeader } from '@mui/material';
import { styled } from '@mui/material/styles';


// Define styled components
const ProfileCard = styled(Card)(({ theme }) => ({
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(4),
    boxShadow: theme.shadows[5],
}));

const UserProfile = () => {

    const sessionData = JSON.parse(sessionStorage.getItem('user'));
    const user = sessionData ? sessionData : null;

    if (!user) {
        return <Typography variant="body1">Loading...</Typography>;
    }

  

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center',marginTop:'150px;', padding: 2 }}>

            <ProfileCard>
                <CardHeader
                    avatar={
                        <Avatar src={user.profilePicture} sx={{ width: 80, height: 80 }} />
                    }
                    title={user.fullName}
                    subheader={user.email}
                />
                <Divider />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">User ID:</Typography>
                            <Typography variant="body1">{user._id}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">Role:</Typography>
                            <Typography variant="body1">{user.role}</Typography>
                        </Grid>
                        {/* <Grid item xs={12}>
                            <Typography variant="h6">Joined:</Typography>
                            <Typography variant="body1">[Join Date]</Typography>
                        </Grid> */}
                    </Grid>
                </CardContent>
            </ProfileCard>
          
               
        </Box>
    );
};

export default UserProfile;
