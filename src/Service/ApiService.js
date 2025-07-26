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
    return error.response.data;
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
    return error.response.data;
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
    return error.response.data;
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
    return error.response.data;
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
    return error.response.data;
  }
}