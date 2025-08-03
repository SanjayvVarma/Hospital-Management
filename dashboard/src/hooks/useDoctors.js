import axios from "axios";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";

const useDoctors = () => {

    const [doctors, setDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { isAuth, user } = useContext(AuthContext);

    const fetchDoctors = async () => {
        setIsLoading(true);

        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/all-doctors`,
                { withCredentials: true }
            );

            if (res.data.success) {
                setDoctors(res.data.data);
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Doctors fetch failed");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isAuth && user.role === "Admin") {
            fetchDoctors();
        }
    }, [isAuth]);

    return { doctors, isLoading, fetchDoctors }
}

export default useDoctors;