import axios from "axios";
import "./appointment.scss";
import Loader from "../loader/Loader";
import { toast } from "react-toastify";
import formatDate from "../../utils/date";
import { useEffect, useState } from "react";

const Appointments = () => {

  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAppointment = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/appointment/patient-appointment`,
          { withCredentials: true }
        );

        if (res.data.success) {
          setAppointments(res.data.data)
        }

      } catch (error) {
        toast.error(error?.response?.data?.message || "Appointment fetch failed")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAppointment();
  }, []);

  return (
    <div className="appointmentPage">
      {isLoading && <Loader text="Appointment fetching" message="please wait while fetch appointment....." />}

      <div className="appointmentPage__table">
        <table>
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Created</th>
              <th>Appointment</th>
              <th>Reschedule</th>
              <th>Doctor Name</th>
              <th>Department</th>
              <th>Status</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{formatDate(item.createdAt)}</td>
                <td>{formatDate(item.appointmentDate)}</td>
                <td>{formatDate(item.updatedAt)}</td>
                <td>{item.doctor.firstName} {item.doctor.lastName}</td>
                <td>{item.department}</td>
                <td>{item.status}</td>
                <td>{item.rejectionReason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Appointments;