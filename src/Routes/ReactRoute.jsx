import { Route } from 'react-router';
import { BrowserRouter, Routes } from 'react-router';
import Home from '../Components/Home/Home';
import NavBar from '../Components/Header/NavBar';
import LoginForm from '../Components/Form/LoginForm';
import { Toolbar } from '@mui/material';
import Service from '../Components/Services/Service';
import { GoogleOAuthProvider } from '@react-oauth/google';


function ReactRoute() {
  return (
    <GoogleOAuthProvider clientId="878291443758-qioqtcdm6b1slv28rs164u0ckppb58ia.apps.googleusercontent.com">
    <BrowserRouter>
     <Routes>
       <Route path='/' element={<><NavBar/><Toolbar /><Home/> <Service/></>}>
         <Route path='home' element={<><NavBar/><Toolbar /><Home/> <Service/></>}/>
       </Route>
       <Route path='/login' element={<><NavBar/><Toolbar /><LoginForm/> </>}/>
     </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default ReactRoute;
