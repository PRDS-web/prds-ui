import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Components/Home/Home';
import NavBar from '../Components/Header/NavBar';
import LoginForm from '../Components/Form/LoginForm';
import { Toolbar } from '@mui/material';
import Service from '../Components/Services/Service';
import Footer from '../Components/Footer/Footer';
import { OAuthifyRedirect } from 'oauthify';
import Logout from '../Components/Form/Logout';
import Profile from '../Components/Profile/Profile';
import ProtectedRoute from '../Components/ProtectedRoute/ProtectedRoute.jsx';
import AboutUs from '../Components/AboutUs/AboutUs.jsx';
import Dashboard from '../Components/Dashboard/Dashboard.jsx';
import VerifyUser from '../Components/VerifyToken/verifyUser.jsx';
import ResetPassword from '../ResetPassword/resetPassword.jsx';

function ReactRoute() {
   

  return (
    <BrowserRouter>
     <Routes>
       <Route path='/' element={<><NavBar/><Home/> <Footer/></>}>
         <Route path='home' element={<><NavBar/><Toolbar /><Home/> <Footer/></>}/>
       </Route>
       <Route path='/login' element={<><LoginForm/> </>}/>
       <Route path='/oauthify-redirect' element={<OAuthifyRedirect />} />
       <Route path='/logout' element={<Logout/>}/>
       <Route path='/profile' element={
         <ProtectedRoute>
           <><NavBar/><Profile/> <Footer/></>
         </ProtectedRoute>
       }/>
       <Route path='/service' element={<><NavBar/><Service/><Footer/></>}/>
        <Route path='/about' element={<><NavBar/><AboutUs/><Footer/></>}/>
       <Route path='/dashboard' element={
         <ProtectedRoute>
           <><NavBar/> <Toolbar /><Dashboard/><Footer/></>
         </ProtectedRoute>
       }/>
       <Route path='/verify' element={<><NavBar/><VerifyUser/> <Footer/></>}/>
       <Route path='/reset-password' element={<><NavBar/><ResetPassword/> <Footer/></>}/>
     </Routes>
    </BrowserRouter>
  );
}

export default ReactRoute;
