import { Route } from 'react-router';
import { BrowserRouter, Routes } from 'react-router';
import Home from './Components/Home/Home';
import NavBar from './Components/Header/NavBar';

function App() {
  return (
    <BrowserRouter>
     <Routes>
       <Route path='/' element={<><NavBar/><Home/></>}/>
     </Routes>
    </BrowserRouter>
  );
}

export default App
