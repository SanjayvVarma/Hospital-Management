import AuthenticatedContextProvider from './contexts/AuthenticatedContextProvider';
import Home from './pages/home/Home';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Appointment from './pages/appointment/Appointment';
import About from './pages/about/About';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/navbar/Navbar';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import AuthenticatedContext from './contexts/AuthenticatedContext.js';
import Footer from './components/footer/Footer.jsx';

function App() {

  const { setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthenticatedContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://hospital-management-skck.onrender.com/api/v1/user/patient/me", { withCredentials: true })
        setIsAuthenticated(false)
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
    <AuthenticatedContextProvider>
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
    </AuthenticatedContextProvider>

  )
}

export default App
