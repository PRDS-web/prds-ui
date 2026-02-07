import axios from 'axios';

export const getUserInfo = async (userInfo) => {
  try{
    const response = await axios.get(`/api/v1/auth/sso?code=${userInfo.code}&type=${userInfo.type}`, { withCredentials: true });
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
    const response = await axios.get('/api/v1/user/getUserInfo', { withCredentials: true});
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
export const getAllEnquirie = async () =>{
  try{
    const response = await axios.get('/api/v1/enquiry/allEnquiries',{ withCredentials: true, cache: 'no-store' });
    console.log('Enquiries fetched successfully');
    return response.data;
  }
  catch(error){
      if(error.response == undefined || error.response == null) {
      // this means backend is not running or there is a network issue
      console.log('Network error or backend not running');
      return {
        message: 'Network error. Please check your connection.',
        title: 'Network Error',
        status: '500',
      };
    }
    console.error('Error fetching enquiries:', error.response);
    // Ensure we always return an error object with a message property
    const errorData = error.response.data;
    if (errorData && errorData.message) {
      return errorData;
    } else {
      // If backend doesn't provide a message, create a default one based on status
      let defaultMessage = 'Failed to fetch enquiries';
      if (error.response.status === 404) {
        defaultMessage = 'Enquiries not found or endpoint does not exist';
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
    const response = await axios.post('/api/v1/user/updateProfile', profileData, { withCredentials: true});
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
    const response = await axios.post('/api/v1/auth/register', userDetails);
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
    const response = await axios.post('/api/v1/auth/login', userDetails, { withCredentials: true });
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

      const response = await axios.get('/api/v1/auth/logout',{ withCredentials: true });
      console.log('User signed out successfully');
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

export const contactUs = async (contactDetails) => {
  try {
    const response = await axios.post('/api/v1/enquiry/contactUs', contactDetails);
    console.log('Contact form submitted successfully');
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
    console.error('Error submitting contact form:', error.response);

    // Ensure we always return an error object with a message property
    const errorData = error.response.data;
    if (errorData && errorData.message) {
      return errorData;
    } else {
      // If backend doesn't provide a message, create a default one based on status
      let defaultMessage = 'Failed to submit contact form';
      if (error.response.status === 404) {
        defaultMessage = 'Contact endpoint not found';
      } else if (error.response.status === 400) {
        defaultMessage = 'Invalid contact form data';
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

export const getAllUser = async () =>{
  try{
    const response = await axios.get('/api/v1/user/getAllUsers',{ withCredentials: true });
    return response.data;
  }catch(error){
     if(error.response == undefined || error.response == null) {
      // this means backend is not running or there is a network issue
      console.log('Network error or backend not running');
      return {
        message: 'Network error. Please check your connection.',
        title: 'Network Error',
        status: '500',
      };
    }
    console.error('Error submitting contact form:', error.response);

    // Ensure we always return an error object with a message property
    const errorData = error.response.data;
    if (errorData && errorData.message) {
      return errorData;
    } else {
      // If backend doesn't provide a message, create a default one based on status
      let defaultMessage = 'Failed to submit contact form';
      if (error.response.status === 404) {
        defaultMessage = 'Contact endpoint not found';
      } else if (error.response.status === 400) {
        defaultMessage = 'Invalid contact form data';
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

export const createJob = async (jobDetails) => {
  try {
    const response = await axios.post('/api/v1/jobs/createNewJob', jobDetails, { withCredentials: true });
    console.log('Job created successfully');
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
    console.error('Error creating job:', error.response);
    // Ensure we always return an error object with a message property
    const errorData = error.response.data;
    if (errorData && errorData.message) {
      return errorData;
    } else {
      // If backend doesn't provide a message, create a default one based on status
      let defaultMessage = 'Failed to create job';
      if (error.response.status === 404) {
        defaultMessage = 'Create job endpoint not found';
      } else if (error.response.status === 400) {
        defaultMessage = 'Invalid job details provided';
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
export const getJobs = async () => {
  try {
    const response = await axios.get('/api/v1/jobs/getAllJobs', { withCredentials: true });
    console.log('Job fetched successfully');
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
    console.error('Error fetching job:', error.response);
    // Ensure we always return an error object with a message property
    const errorData = error.response.data;
    if (errorData && errorData.message) {
      return errorData;
    } else {
      // If backend doesn't provide a message, create a default one based on status
      let defaultMessage = 'Failed to fetch job';
      if (error.response.status === 404) {
        defaultMessage = 'Fetch job endpoint not found';
      } else if (error.response.status === 400) {
        defaultMessage = 'Invalid job details provided';
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
export const updateJob = async (jobDetails) => {
  try {
    const response = await axios.put('/api/v1/jobs/updateJob', jobDetails, { withCredentials: true });
    console.log('Job updated successfully');
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
    console.error('Error updating job:', error.response);
    // Ensure we always return an error object with a message property
    const errorData = error.response.data;
    if (errorData && errorData.message) {
      return errorData;
    } else {
      // If backend doesn't provide a message, create a default one based on status
      let defaultMessage = 'Failed to update job';  
      if (error.response.status === 404) {
        defaultMessage = 'Update job endpoint not found';
      } else if (error.response.status === 400) {
        defaultMessage = 'Invalid job details provided';
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
export const forgotPassword = async (request) => {
  try {
    const response = await axios.post('/api/v1/auth/forgot-password', request);
    console.log('Password reset successfully');
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
    console.error('Error resetting password:', error.response);
    // Ensure we always return an error object with a message property
    const errorData = error.response.data;
    if (errorData && errorData.message) {
      return errorData;
    } 
    else {
      // If backend doesn't provide a message, create a default one based on status
      let defaultMessage = 'Failed to reset password';  
      if (error.response.status === 404) {
        defaultMessage = 'Reset password endpoint not found';
      } else if (error.response.status === 400) {
        defaultMessage = 'Invalid password details provided';
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
export const resetPassword = async (request) => {
  try {
    const response = await axios.post('/api/v1/auth/reset-password', request);
    console.log('Password reset successfully');
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
    console.error('Error resetting password:', error.response);
    // Ensure we always return an error object with a message property
    const errorData = error.response.data;
    if (errorData && errorData.message) {
      return errorData;
    }
    else {
      // If backend doesn't provide a message, create a default one based on status
      let defaultMessage = 'Failed to reset password';
      if (error.response.status === 404) {
        defaultMessage = 'Reset password endpoint not found';
      } else if (error.response.status === 400) {
        defaultMessage = 'Invalid password details provided';
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
export const verifyUserTokenApi = async (token) => {
  try {
    const response = await axios.post('/api/v1/auth//verify', { token });
    console.log('Token verified successfully');
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
    console.error('Error verifying token:', error.response);
    // Ensure we always return an error object with a message property
    const errorData = error.response.data;
    if (errorData && errorData.message) {
      return errorData;
    }
    else {
      // If backend doesn't provide a message, create a default one based on status
      let defaultMessage = 'Failed to verify token';
      if (error.response.status === 404) {
        defaultMessage = 'Verify token endpoint not found';
      } else if (error.response.status === 400) {
        defaultMessage = 'Invalid token provided';
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

export const applyForJob = async (applicationData) => {
  try {
    const response = await axios.post('/api/v1/jobs/applyJob', applicationData, { withCredentials: true });
    console.log('Job application submitted successfully');
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
    console.error('Error submitting job application:', error.response);
    // Ensure we always return an error object with a message property
    const errorData = error.response.data;
    if (errorData && errorData.message) {
      return errorData;
    }
    else {
      // If backend doesn't provide a message, create a default one based on status
      let defaultMessage = 'Failed to submit job application';
      if (error.response.status === 404) {
        defaultMessage = 'Job application endpoint not found';
      } else if (error.response.status === 400) {
        defaultMessage = 'Invalid application details provided';
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
export const appliedJobs = async () => {
  try {
    const response = await axios.get('/api/v1/jobs/getAppliedJobs', { withCredentials: true });
    console.log('Applied jobs fetched successfully');
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
    console.error('Error fetching applied jobs:', error.response);
    // Ensure we always return an error object with a message property
    const errorData = error.response.data;
    if (errorData && errorData.message) {
      return errorData;
    } else {
      // If backend doesn't provide a message, create a default one based on status
      let defaultMessage = 'Failed to fetch applied jobs';
      if (error.response.status === 404) {
        defaultMessage = 'Applied jobs endpoint not found';
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
export const getBankingInfo = async () => {
  try {
    const response = await axios.get('/api/v1/user/getBankDetails', { withCredentials: true });
    console.log('Banking information fetched successfully');
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
    console.error('Error fetching banking information:', error.response);
    // Ensure we always return an error object with a message property
    const errorData = error.response.data;
    if (errorData && errorData.message) {
      return errorData;
    }
    else {
      // If backend doesn't provide a message, create a default one based on status
      let defaultMessage = 'Failed to fetch banking information';
      if (error.response.status === 404) {
        defaultMessage = 'Banking information endpoint not found';
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

export const updateBankDetails = async (bankingData) => {
  try {
    const response = await axios.post('/api/v1/user/updateBankDetails', bankingData, { withCredentials: true });
    console.log('Banking details updated successfully');
    return response.data;
  } catch (error) {
    if (error.response == undefined || error.response == null) {
      return {
        message: 'Network error. Please check your connection.',
        title: 'Network Error',
        status: '500',
      };
    }
    const errorData = error.response.data;
    if (errorData && errorData.message) {
      return errorData;
    }
    let defaultMessage = 'Failed to update banking details';
    if (error.response.status === 404) defaultMessage = 'Update banking endpoint not found';
    return {
      message: defaultMessage,
      status: error.response.status,
      data: errorData
    };
  }
};

export const getBankingHistory = async () => {
  try {
    const response = await axios.get('/api/v1/user/getBankinghistory', { withCredentials: true });
    console.log('Banking history fetched successfully');
    return response.data;
  } catch (error) { 
    if (error.response == undefined || error.response == null) {
      // this means backend is not running or there is a network issue
      console.log('Network error or backend not running');
      return {
        message: 'Network error. Please check your connection.',
        title: 'Network Error',
        status: '500',
      };
    }
    const errorData = error.response.data;
    if (errorData && errorData.message) {
      return errorData;
    }
    let defaultMessage = 'Failed to fetch banking history';
    if (error.response.status === 404) defaultMessage = 'Banking history endpoint not found';
    return {
      message: defaultMessage,
      status: error.response.status,
      data: errorData
    };
  }
}