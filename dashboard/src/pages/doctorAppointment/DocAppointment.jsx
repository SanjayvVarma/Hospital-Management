import axios from "axios";
import { toast } from "react-toastify";
import "../appointments/appointment.scss";
import formatDate from "../../utils/date";
import Loader from "../../components/loader/Loader";
import AuthContext from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";

const DocAppointment = () => {

  const [statusData, setStatusData] = useState({});
  const [searchPatient, setSearchPatient] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { isAuth, user } = useContext(AuthContext);

  const handleChange = (appointmentId, field, value) => {
    setStatusData((prev) => ({
      ...prev,
      [appointmentId]: {
        ...prev[appointmentId],
        [field]: value,
      },
    }));
  };

  const fetchAppointments = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/appointment/doctor-appointment`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setAppointments(res.data.data);
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Doctor appointment fetch failed");
    } finally {
      setIsLoading(false)
    }
  };

  const handleStatusUpdate = async (appointmentId) => {
    const { status, rejectionReason } = statusData[appointmentId] || {};
    try {
      const res = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/appointment/update-status/${appointmentId}`,
        { status, rejectionReason },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Appointment Update successfully");
        setStatusData({});
        fetchAppointments();
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Appointment Update failed");
    }
  };

  useEffect(() => {
    if (isAuth && user.role === "Doctor") {
      fetchAppointments()
    }
  }, [isAuth]);

  const filterAppointment = appointments?.filter((item) =>
    item.firstName.toLowerCase().includes(searchPatient.toLowerCase()) ||
    item.phone.includes(searchPatient) ||
    item.uid.includes(searchPatient)
  );

  return (
    <div className="appointmentPage">
      {isLoading && <Loader text="Appointment fetching" message="please wait while fetch appointment....." />}
      <div className="appointmentPage__search">
        <input
          type="text"
          placeholder="search patient by name, mobile and Aadhaar"
          value={searchPatient}
          onChange={(e) => setSearchPatient(e.target.value)}
        />
      </div>

      <div className="appointmentPage__details">
        {filterAppointment.length === 0 && !isLoading && <p>No appointments found.</p>}

        {filterAppointment.map((item) => (
          <div key={item._id} className="appointmentPage__details__card">
            <p>Patient Name :- <span>{item.firstName} {item.lastName}</span></p>
            <p>Mobile Number :- <span>{item.phone}</span></p>
            <p>Email :- <span>{item.email}</span></p>
            <p>Aadhaar(UID) :- <span>{item.uid}</span></p>
            <p>Gender :- <span>{item.gender}</span></p>
            <p>DOB :- <span>{formatDate(item.dob)}</span></p>
            <p>Created :- <span>{formatDate(item.createdAt)}</span></p>
            <p>Appointment :- <span>{formatDate(item.appointmentDate)}</span></p>
            <p>Last Updated :- <span>{formatDate(item.updatedAt)}</span></p>
            <p>Visited :- <span>{item.hasVisited ? "Yes" : "No"}</span></p>
            <p>Address :- <span>{item.address}</span></p>
            <p>Status :- <span>{item.status}</span></p>
            <p>Remarks :- <span>{item.rejectionReason || "N/A"}</span></p>

            <div className="appointmentPage__details__card__status">
              <label>Update Status: </label>
              <select
                value={(statusData[item._id] || {}).status || ""}
                onChange={(e) => handleChange(item._id, "status", e.target.value)}
              >
                <option value="">{item.status}</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
                <option value="Completed">Completed</option>
              </select>

              {(statusData[item._id] || {}).status === "Rejected" && (
                <input
                  type="text"
                  placeholder="Enter rejection reason"
                  value={(statusData[item._id] || {}).rejectionReason || ""}
                  onChange={(e) => handleChange(item._id, "rejectionReason", e.target.value)}
                />
              )}

              <button
                className="appointmentPage__details__card__status__btn"
                onClick={() => handleStatusUpdate(item._id)}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DocAppointment;