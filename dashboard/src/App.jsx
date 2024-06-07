import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import DashboardProvider from "./contexts/DashboardProvider";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import AddNewDoctor from "./pages/addNewDoctor/AddNewDoctor";
import AddNewAdmin from "./pages/addNewAdmin/AddNewAdmin";
import Message from "./pages/message/Message";
import Doctors from "./pages/doctors/Doctors";
import SideBar from "./pages/sideBar/SideBar";
import DashboardContext from "./contexts/DashboardContext.js";
import "./App.css";

const App = () => {

  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(DashboardContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/user/admin/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <DashboardProvider>
       <SideBar />
      <Routes>
        <Route index path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor/addnew" element={<AddNewDoctor />} />
        <Route path="/admin/addnew" element={<AddNewAdmin />} />
        <Route path="/messages" element={<Message />} />
        <Route path="/doctors" element={<Doctors />} />
      </Routes>
      <ToastContainer position="top-center" />
    </DashboardProvider>
  );
};

export default App;
