import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";

const useAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { isAuth } = useContext(AuthContext);

    const fetchAppointments = async () => {
        setIsLoading(true)
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/appointment/all-appointment`,
                { withCredentials: true }
            );

            if (res.data.success) {
                setAppointments(res.data.data);
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Appointment fetch failed");
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        if (isAuth) {
            fetchAppointments();
        }
    }, [isAuth]);

    return { appointments, isLoading, fetchAppointments }
};

export default useAppointments;