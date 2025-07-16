import { Route } from 'react-router';
import { BrowserRouter, Routes } from 'react-router';
import Home from '../Components/Home/Home';
import NavBar from '../Components/Header/NavBar';
import LoginForm from '../Components/Form/LoginForm';
import { Toolbar } from '@mui/material';
import Service from '../Components/Services/Service';
import Footer from '../Components/Footer/Footer';


function ReactRoute() {
  return (
    <BrowserRouter>
     <Routes>
       <Route path='/' element={<><NavBar/><Toolbar /><Home/> <Service/> <Footer/></>}>
         <Route path='home' element={<><NavBar/><Toolbar /><Home/> <Service/> <Footer/></>}/>
       </Route>
       <Route path='/login' element={<><LoginForm/> </>}/>
     </Routes>
    </BrowserRouter>
  );
}

export default ReactRoute;
