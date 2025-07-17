import axios from 'axios';

export const getUserInfo = async (userInfo) => {
  const response = await axios.post(
    'https://oauth2.googleapis.com/token',
    new URLSearchParams({
      code: userInfo,
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      client_secret: import.meta.env.VITE_GOOGLE_SECRET,
      redirect_uri: `${window.location.origin}/oauthify-redirect`,
      grant_type: 'authorization_code',
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  const data = response.data;
  const token = data.access_token;
//   console.log('Token', token);

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://www.googleapis.com/oauth2/v3/userinfo',
    headers: {
      Authorization:
        'Bearer '+token,
    },
  };

  const userdetails = await axios
    .request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
//   console.log('userDetails', userdetails);
  return userdetails;
};
