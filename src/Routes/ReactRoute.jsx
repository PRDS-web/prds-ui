import { Route } from 'react-router';
import { BrowserRouter, Routes } from 'react-router';
import Home from '../Components/Home/Home';
import NavBar from '../Components/Header/NavBar';
import LoginForm from '../Components/Form/LoginForm';

function ReactRoute() {
  return (
    <BrowserRouter>
     <Routes>
       <Route path='/' element={<><NavBar/><Home/></>}/>
       <Route path='/login' element={<LoginForm/>}/>
     </Routes>
    </BrowserRouter>
  );
}

export default ReactRoute;
