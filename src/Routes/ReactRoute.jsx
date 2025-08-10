import { Route } from 'react-router';
import { BrowserRouter, Routes } from 'react-router';
import Home from '../Components/Home/Home';
import NavBar from '../Components/Header/NavBar';
import LoginForm from '../Components/Form/LoginForm';
import { Toolbar } from '@mui/material';
import Service from '../Components/Services/Service';
import Footer from '../Components/Footer/Footer';
import { OAuthifyRedirect } from 'oauthify';
import Logout from '../Components/Form/Logout';
import Profile from '../Components/Profile/Profile';
import ProtectedRoute from '../Components/ProtectedRoute/ProtectedRoute';

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
     </Routes>
    </BrowserRouter>
  );
}

export default ReactRoute;
