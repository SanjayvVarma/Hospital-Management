import axios from "axios";
import "./appointment.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import formatDate from "../../utils/date";
import Loader from "../../components/loader/Loader";
import useAppointments from "../../hooks/useAppointment";

const Appointments = () => {

    const [statusData, setStatusData] = useState({});
    const { appointments, isLoading, fetchAppointments } = useAppointments();

    const handleChange = (appointmentId, field, value) => {
        setStatusData((prev) => ({
            ...prev,
            [appointmentId]: {
                ...prev[appointmentId],
                [field]: value,
            },
        }));
    };

    const handleDelete = async (appointmentId) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/appointment/delete/${appointmentId}`,
                { withCredentials: true }
            );

            if (res.data.success) {
                toast.success(res.data.message || "Appointment delete successfully");
                fetchAppointments();
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Appointment delete failed");
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
                fetchAppointments();
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Appointment Update failed");
        }
    };

    return (
        <div className="appointmentPage">
            {isLoading && <Loader text="Appointment fetching" message="please wait while fetch appointment....." />}

            <div className="appointmentPage__details">
                {appointments.length === 0 && !isLoading && <p>No appointments found.</p>}

                {appointments.map((item) => (
                    <div key={item._id} className="appointmentPage__details__card">
                        <p>Patient Name :- <span>{item.firstName} {item.lastName}</span></p>
                        <p>Mobile Number :- <span>{item.phone}</span></p>
                        <p>Email :- <span>{item.email}</span></p>
                        <p>Aadhaar(UID) :- <span>{item.uid}</span></p>
                        <p>Gender :- <span>{item.gender}</span></p>
                        <p>DOB :- <span>{formatDate(item.dob)}</span></p>
                        <p>Doctor Name :- <span>{item.doctor?.firstName} {item.doctor?.lastName}</span></p>
                        <p>Created :- <span>{formatDate(item.createdAt)}</span></p>
                        <p>Appointment :- <span>{formatDate(item.appointmentDate)}</span></p>
                        <p>Last Updated :- <span>{formatDate(item.updatedAt)}</span></p>
                        <p>Department :- <span>{item.department}</span></p>
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

                        <button
                            className="appointmentPage__details__card__btn"
                            onClick={() => handleDelete(item._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Appointments;