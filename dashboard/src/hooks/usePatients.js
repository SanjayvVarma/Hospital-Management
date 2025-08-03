import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";

const usePatients = () => {
    const [patients, setPatients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { isAuth, user } = useContext(AuthContext);

    const fetchPatients = async () => {
        setIsLoading(true);

        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/all-patient`,
                { withCredentials: true }
            );

            if (res.data.success) {
                setPatients(res.data.data);
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Patients fetch failed");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isAuth && user.role === "Admin") {
            fetchPatients();
        }
    }, [isAuth]);

    return { patients, isLoading, fetchPatients };
};

export default usePatients;