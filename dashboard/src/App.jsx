import "./App.css";
import axios from "axios";
import Login from "./pages/login/Login";
import { useContext, useEffect } from "react";
import Message from "./pages/message/Message";
import Doctors from "./pages/doctors/Doctors";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from "react-router-dom";
import AddAdmin from "./pages/addAdmin/AddAdmin";
import Dashboard from "./pages/dashboard/Dashboard";
import AddDoctor from "./pages/addDoctor/AddDoctor";
import AuthContext from "./contexts/AuthContext.js";
import Navbar from "./components/navbar/Navbar.jsx";
import ChangePassword from "./pages/changePassword/ChangePassword.jsx";

const App = () => {

  const { isAuth, setIsAuth, setUser } = useContext(AuthContext);

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
        setIsAuth(false);
        setUser({});
      }
    };

    fetchUser();
  }, [isAuth]);

  return (
    <div>
      {isAuth && <Navbar />}
      <div>
        <Routes>
          <Route index path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          {/* <Route path="/add-admin" element={<AddAdmin />} /> */}
          {/* <Route path="/messages" element={<Message />} /> */}
          {/* <Route path="/doctors" element={<Doctors />} /> */}
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default App;