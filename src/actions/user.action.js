import { userDNS } from "../config";

export const userSignIn = async (formData) => {
  try {
      const response = await fetch(userDNS+'/api/v1/signin', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      });

      // Extract data from the response
      const responseData = await response.json();

      const { token, user } = responseData;

      // Check if the token is present
      if (!token) {
          console.log(responseData);
          return responseData;
      }

      // Store the token and user data in session storage
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));

      // Navigate to the desired location
      window.location.href = '/admin/home';

      // Return the token and user data (optional)
      return { token, user };
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



  
const addUser = async (user) => {
  try {
    const formData = new FormData();
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('profilePicture', user.profilePicture);
    console.log(user);
    const response = await fetch(userDNS + '/api/v1/signup', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'An error occurred');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding user:', error.message);
    throw error;
  }
};

export default addUser;

  