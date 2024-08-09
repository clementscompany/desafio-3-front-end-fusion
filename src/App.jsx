
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import "bootstrap-icons/font/bootstrap-icons.scss";
import Register from './pages/register/Register';

function App() {
  return (
    <>
      <main>
       <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Login />}/>
            <Route exact path='/register' element={<Register />}/>
          </Routes>
       </BrowserRouter>
      </main>
    </>
  );
}

export default App
