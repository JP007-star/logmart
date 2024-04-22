// ForgotPasswordForm.js

import { useState } from 'react';
import { TextField, Button, Typography, Box, Link } from '@mui/material';

const ForgotPasswordForm = ({ onSignInClick }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleForgotPassword = async () => {
        // Your forgot password logic here
    };

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Forgot Password
            </Typography>
            <TextField
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            {error && <Typography variant="body2" color="error">{error}</Typography>}
            <Box mt={2} textAlign="center">
                <Button variant="contained" color="primary" onClick={handleForgotPassword}>
                    Reset Password
                </Button>
                <Box mt={2}>
                    <Typography>
                        Remembered your password? <Link onClick={onSignInClick}>Sign In</Link>
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default ForgotPasswordForm;
