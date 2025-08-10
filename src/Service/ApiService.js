import axios from 'axios';

export const getUserInfo = async (userInfo) => {
  try{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/sso?code=${userInfo.code}&type=${userInfo.type}`, { withCredentials: true });
    console.log('User information fetched successfully:');

    return response.data.user;
  } catch (error) {
    console.error('Error fetching user information:', error.response);
    if(error.response == undefined || error.response == null) {
      // this means backend is not running or there is a network issue
      console.log('Network error or backend not running');
      return {
        message: 'Network error. Please check your connection.',
        title: 'Network Error',
        status: '500',
      };
    }
    console.error('Error fetching user information');
    
    // Ensure we always return an error object with a message property
    const errorData = error.response.data;
    if (errorData && errorData.message) {
      return errorData;
    } else {
      // If backend doesn't provide a message, create a default one based on status
      let defaultMessage = 'Failed to fetch user information';
      if (error.response.status === 404) {
        defaultMessage = 'User not found or endpoint does not exist';
      } else if (error.response.status === 400) {
        defaultMessage = 'Invalid request';
      } else if (error.response.status === 401) {
        defaultMessage = 'Unauthorized. Please login again';
      } else if (error.response.status === 403) {
        defaultMessage = 'Access denied';
      } else if (error.response.status >= 500) {
        defaultMessage = 'Server error. Please try again later';
      }
      
      return {
        message: defaultMessage,
        status: error.response.status,
        data: errorData
      };
    }
  }
};

export const getProfileInfo = async () => {
  try{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/getUserInfo`, { withCredentials: true});
    console.log('Profile information fetched successfully:');
    return response.data.user;
  }catch (error) {
    if(error.response == undefined || error.response == null) {
      // this means backend is not running or there is a network issue
      console.log('Network error or backend not running');
      return {
        message: 'Network error. Please check your connection.',
        title: 'Network Error',
        status: '500',
      };
    }
    console.error('Error fetching profile information', error);
    
    // Ensure we always return an error object with a message property
    const errorData = error.response.data;
    if (errorData && errorData.message) {
      return errorData;
    } else {
      // If backend doesn't provide a message, create a default one based on status
      let defaultMessage = 'Failed to fetch profile';
      if (error.response.status === 404) {
        defaultMessage = 'Profile not found or endpoint does not exist';
      } else if (error.response.status === 400) {
        defaultMessage = 'Invalid request';
      } else if (error.response.status === 401) {
        defaultMessage = 'Unauthorized. Please login again';
      } else if (error.response.status === 403) {
        defaultMessage = 'Access denied';
      } else if (error.response.status >= 500) {
        defaultMessage = 'Server error. Please try again later';
      }
      
      return {
        message: defaultMessage,
        status: error.response.status,
        data: errorData
      };
    }
  }
}

export const updateProfileInfo = async (profileData) => {
  try{
    console.log('updateProfileInfo called with:', profileData);
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/updateProfile`, profileData, { withCredentials: true});
    console.log('Profile updated successfully:', response.data);
    return response.data.user;
  }catch (error) {
    console.log('updateProfileInfo caught error:', error);
    if(error.response == undefined || error.response == null) {
      // this means backend is not running or there is a network issue
      console.log('Network error or backend not running');
      return {
        message: 'Network error. Please check your connection.',
        title: 'Network Error',
        status: '500',
      };
    }
    console.error('Error updating profile information', error);
    console.log('Error response:', error.response);
    
    // Ensure we always return an error object with a message property
    const errorData = error.response.data;
    if (errorData && errorData.message) {
      console.log('Returning error with message from backend:', errorData);
      return errorData;
    } else {
      // If backend doesn't provide a message, create a default one based on status
      let defaultMessage = 'Failed to update profile';
      if (error.response.status === 404) {
        defaultMessage = 'Profile not found or endpoint does not exist';
      } else if (error.response.status === 400) {
        defaultMessage = 'Invalid profile data provided';
      } else if (error.response.status === 401) {
        defaultMessage = 'Unauthorized. Please login again';
      } else if (error.response.status === 403) {
        defaultMessage = 'Access denied';
      } else if (error.response.status >= 500) {
        defaultMessage = 'Server error. Please try again later';
      }
      
      const errorResponse = {
        message: defaultMessage,
        status: error.response.status,
        data: errorData
      };
      console.log('Returning default error response:', errorResponse);
      return errorResponse;
    }
  }
}

export const signUpUser = async (userDetails) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, userDetails);
    console.log('User signed up successfully');
    return response.data;
  } catch (error) {
    if(error.response == undefined || error.response == null) {
      // this means backend is not running or there is a network issue
      console.log('Network error or backend not running');
      return {
        message: 'Network error. Please check your connection.',
        title: 'Network Error',
        status: '500',
      };
    }
    console.error('Error signing up user:', error.response);
    
    // Ensure we always return an error object with a message property
    const errorData = error.response.data;
    if (errorData && errorData.message) {
      return errorData;
    } else {
      // If backend doesn't provide a message, create a default one based on status
      let defaultMessage = 'Failed to sign up user';
      if (error.response.status === 404) {
        defaultMessage = 'Sign up endpoint not found';
      } else if (error.response.status === 400) {
        defaultMessage = 'Invalid user details provided';
      } else if (error.response.status === 401) {
        defaultMessage = 'Unauthorized';
      } else if (error.response.status === 403) {
        defaultMessage = 'Access denied';
      } else if (error.response.status >= 500) {
        defaultMessage = 'Server error. Please try again later';
      }
      
      return {
        message: defaultMessage,
        status: error.response.status,
        data: errorData
      };
    }
  }
}

export const loginUser = async (userDetails) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, userDetails, { withCredentials: true });
    console.log('User signed in successfully');
    return response.data;
  } catch (error) {
    if(error.response == undefined || error.response == null) {
      // this means backend is not running or there is a network issue
      console.log('Network error or backend not running');
      return {
        message: 'Network error. Please check your connection.',
        title: 'Network Error',
        status: '500',
      };
    }
    console.error('Error signing up user:', error.response);
    
    // Ensure we always return an error object with a message property
    const errorData = error.response.data;
    if (errorData && errorData.message) {
      return errorData;
    } else {
      // If backend doesn't provide a message, create a default one based on status
      let defaultMessage = 'Failed to login user';
      if (error.response.status === 404) {
        defaultMessage = 'Login endpoint not found';
      } else if (error.response.status === 400) {
        defaultMessage = 'Invalid login credentials';
      } else if (error.response.status === 401) {
        defaultMessage = 'Invalid credentials';
      } else if (error.response.status === 403) {
        defaultMessage = 'Access denied';
      } else if (error.response.status >= 500) {
        defaultMessage = 'Server error. Please try again later';
      }
      
      return {
        message: defaultMessage,
        status: error.response.status,
        data: errorData
      };
    }
  }
}

export const logoutUser = async () =>{
  try{

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/logout`,{ withCredentials: true });
     console.log('User signed in successfully');
     return response.data;
  } catch (error) {
    if(error.response == undefined || error.response == null) {
      // this means backend is not running or there is a network issue
      console.log('Network error or backend not running');
      return {
        message: 'Network error. Please check your connection.',
        title: 'Network Error',
        status: '500',
      };
    }
    console.error('Error signing up user:', error.response);
    
    // Ensure we always return an error object with a message property
    const errorData = error.response.data;
    if (errorData && errorData.message) {
      return errorData;
    } else {
      // If backend doesn't provide a message, create a default one based on status
      let defaultMessage = 'Failed to logout user';
      if (error.response.status === 404) {
        defaultMessage = 'Logout endpoint not found';
      } else if (error.response.status === 400) {
        defaultMessage = 'Invalid logout request';
      } else if (error.response.status === 401) {
        defaultMessage = 'Unauthorized';
      } else if (error.response.status === 403) {
        defaultMessage = 'Access denied';
      } else if (error.response.status >= 500) {
        defaultMessage = 'Server error. Please try again later';
      }
      
      return {
        message: defaultMessage,
        status: error.response.status,
        data: errorData
      };
    }
  }
}