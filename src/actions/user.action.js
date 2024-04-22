export const userSignIn = async (formData) => {
    try {
        const response = await fetch('http://localhost:9001/api/v1/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        // Extract token from response
        const responseData = await response.json();
        

        const token = responseData.token;

        if (!token) {
            console.log(responseData);
            return responseData;
        }

        // Store the token in session storage
        sessionStorage.setItem('token', token);

        // Navigate to the desired location
        window.location.href = '/admin/user/users';

        // Return the token (optional)
        return token;
    } catch (error) {
        // Check if there's a response from the server containing an error message
        if (error instanceof Response && error.headers.get('Content-Type')?.startsWith('application/json')) {
            // If the error response is JSON, return the response data
            return await error.json();
        } else {
            // If not, return a generic error message
            return 'Failed to sign in: ' + error.message;
        }
    }
};
