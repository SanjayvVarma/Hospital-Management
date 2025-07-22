import './App.css';
import axios from 'axios';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import About from './pages/about/About';
import { useContext, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/navbar/Navbar';
import Register from './pages/register/Register';
import { Routes, Route } from "react-router-dom";
import Footer from './components/footer/Footer';
import Dashboard from './pages/dashboard/Dashboard';
import Appointment from './pages/appointment/Appointment';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import { AuthContext, UserContext } from './contexts/AppContexts.js';

function App() {

  const { user, setUser } = useContext(UserContext);
  const { isAuth, setIsAuth } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/current-user`,
          { withCredentials: true }
        );

        if (res.data.success) {
          setIsAuth(true);
          setUser(res.data.data);
        }

      } catch (error) {
        setIsAuth(false)
        setUser({})
      }
    }

    fetchUser();
  }, [isAuth])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route index path='/appointment' element={<Appointment />} />
        <Route index path='/about' element={<About />} />
        {/* <Route index path='/register' element={<Register />} /> */}
        <Route index path='/login' element={<Login />} />
        <Route index path='/forgot' element={<ForgotPassword />} />
        <Route index path='/dashboard' element={<Dashboard />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-center" />
    </div>

  )
}

export default App;