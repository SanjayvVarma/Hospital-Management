import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import axios from "axios";
import { AiFillCloseCircle } from 'react-icons/ai';
import { GoCheckCircleFill } from 'react-icons/go'
import DashboardContext from '../../contexts/DashboardContext'
import { toast } from 'react-toastify';

const Dashboard = () => {

  const { isAuthenticated, user, setIsAuthenticated} = useContext(DashboardContext);
  const [appointments, setAppointments] = useState([]);
  const [doctorsRegistered, setDoctorsRegistered] = useState([]);
  

  useEffect(() => {
    const registeredDoctors = async () => {
      try {
        const { data } = await axios.get("https://hospital-management-skck.onrender.com/api/v1/user/doctors", { withCredentials: true })
        setDoctorsRegistered(data.doctors)
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    registeredDoctors()
  }, [])

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get("https://hospital-management-skck.onrender.com/api/v1/appointment/getall", { withCredentials: true })
        setAppointments(data.appointments)
      } catch (error) {
        setAppointments([])
        console.log("SAME ERROR OCCURED WHILE FETCHING APPOINTMENTS", error);
      }
    }
    fetchAppointments();

  }, [])


  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `https://hospital-management-skck.onrender.com/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };


  // const handleUpdateStatus = async (appointmentId, status) => {
  //   try {
  //     const { data } = await axios.put(
  //       `https://hospital-management-skck.onrender.com/api/v1/appointment/update/${appointmentId}`,
  //       { status },
  //       { withCredentials: true }
  //     );
  //     setAppointments((prevAppointments) =>
  //       prevAppointments.map((appointment) =>
  //         appointment._id === appointmentId
  //           ? { ...appointment, status }
  //           : appointment
  //       )
  //     );
  //     toast.success(data.message);
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   }
  // };

  
 if (!isAuthenticated) {
   return <Navigate to={"/login"} />
  } 

  return (
    <>
    
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/doc.png" alt="docImg" />
            <div className="content">
              <div>
                <p>Hello,</p>
                <h5>{user && `${user.firstName} ${user.lastName}`}</h5>
              </div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Facilis, nam molestias. Eaque molestiae ipsam commodi neque.
                Assumenda repellendus necessitatibus itaque.
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Appointments</p>
            <h3>{appointments.length}</h3>
          </div>
          <div className="thirdBox">
            <p>Registered Doctors</p>
            <h3>{doctorsRegistered.length}</h3>
          </div>
        </div>
        <div className="banner">
          <h5>Appointments</h5>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                    <td>{appointment.appointment_date.substring(0, 16)}</td>
                    <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                    <td>{appointment.department}</td>
                    <td>
                      <select
                        className={
                          appointment.status === "Pending"
                            ? "value-pending"
                            : appointment.status === "Accepted"
                              ? "value-accepted"
                              : "value-rejected"
                        }
                        value={appointment.status}
                        onChange={(e) =>
                          handleUpdateStatus(appointment._id, e.target.value)
                        }
                      >
                        <option value="Pending" className="value-pending">
                          Pending
                        </option>
                        <option value="Accepted" className="value-accepted">
                          Accepted
                        </option>
                        <option value="Rejected" className="value-rejected">
                          Rejected
                        </option>
                      </select>
                    </td>
                    <td>
                      {appointment.hasVisited === true ? (
                        <GoCheckCircleFill className="green" />
                      ) : (
                        <AiFillCloseCircle className="red" />
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No Appointments Found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>


  )
}

export default Dashboard;
