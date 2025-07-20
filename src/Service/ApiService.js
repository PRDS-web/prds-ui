import axios from 'axios';

export const getUserInfo = async (code) => {
  try{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/sso?code=${code}`, { withCredentials: true });
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