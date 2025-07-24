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
import UpdateProfile from './pages/updateProfile/UpdateProfile.jsx';
import { AuthContext, UserContext } from './contexts/AppContexts.js';

function App() {

  const { setUser } = useContext(UserContext);
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
        <Route path='/appointment' element={<Appointment />} />
        <Route path='/about' element={<About />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot' element={<ForgotPassword />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/update-profile' element={<UpdateProfile />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-center" />
    </div>

  )
}

export default App;