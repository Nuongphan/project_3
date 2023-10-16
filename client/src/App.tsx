import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import ForgotPassword from './Pages/Forgotpassword/Forgotpassword';
import ResetPassword from './Pages/ResetPassword/ResetPassword';


function App() {
  return (
    <div className="App">
     <Routes>
      <Route path="/" element={ <Login />}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/forgotpassword" element={<ForgotPassword/>}/>
      <Route path="/resetpassword" element={<ResetPassword/>}/>
      <Route path="/home" element={ <Home />}/>
      
    
     </Routes>
    </div>
  );
}

export default App;
