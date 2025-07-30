import axios from "axios";
import "./dashboard.scss";
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import AuthContext from '../../contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';
import useAppointments from "../../hooks/useAppointment";
import Loader from "../../components/loader/Loader";

const Dashboard = () => {

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [messages, setMessages] = useState([]);

  const { appointments, isLoading } = useAppointments();

  const { isAuth, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/all-doctors`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setDoctors(res.data.data);
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Doctor fetch failed");
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/all-patient`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setPatients(res.data.data);
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Patients fetch failed");
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/message/getall`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setMessages(res.data.data);
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Messages fetch failed");
    }
  };

  useEffect(() => {
    if (isAuth) {
      fetchDoctors();
      fetchPatients();
      fetchMessages();
    }
  }, [isAuth]);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return (
    <div className="dashboardPage">
      {isLoading && <Loader />}
      <div className="dashboardPage__welcome">
        <img src={user.role === "Admin" ? "/admin.png" : "/doc.png"} alt="docImg" />
        <div className="dashboardPage__welcome__name">
          <div>
            <p>Hello,</p>
            <h5>{user && `${user.firstName} ${user.lastName}`}</h5>
          </div>
          <p>
            1. Welcome to your personalized dashboard — your control center for managing doctors, patients, and appointments with ease and clarity.
            <br />
            2. Stay on top of everything happening in your system — track real-time activity, view progress, and take meaningful actions in just a few clicks.
          </p>
        </div>
      </div>

      <div className="dashboardPage__details">
        <Link to="/appointment" className="dashboardPage__details__appointment">
          <p>Total Appointments</p>
          <h3>{appointments.length}</h3>
        </Link>

        <Link to="/doctors" className="dashboardPage__details__doctors">
          <p>Registered Doctors</p>
          <h3>{doctors.length}</h3>
        </Link>

        <Link to="/patients" className="dashboardPage__details__patients">
          <p>Registered Patients</p>
          <h3>{patients.length}</h3>
        </Link>

        <Link to="/message" className="dashboardPage__details__messages">
          <p>Messages</p>
          <h3>{messages.length}</h3>
        </Link>
      </div>
    </div>
  )
};

export default Dashboard;