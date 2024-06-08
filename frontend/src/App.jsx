import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import AuthenticatedContext from './contexts/AuthenticatedContext.js';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Appointment from './pages/appointment/Appointment';
import About from './pages/about/About';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Footer from './components/footer/Footer.jsx';
import './App.css';

function App() {

  const { setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthenticatedContext);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://hospital-management-skck.onrender.com/api/v1/user/patient/me", { withCredentials: true })
        setIsAuthenticated(true)
        setUser(res.data.user)
        console.log("patient logged in successfully");
      } catch (error) {
        setIsAuthenticated(false)
        setUser({})
        console.log("SOME ERROE");
      }
    }
    fetchUser();
  }, [isAuthenticated])

  return (
    <>
      <Navbar />
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route index path='/appointment' element={<Appointment />} />
        <Route index path='/about' element={<About />} />
        <Route index path='/register' element={<Register />} />
        <Route index path='/login' element={<Login />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-center" />
    </>

  )
}

export default App;