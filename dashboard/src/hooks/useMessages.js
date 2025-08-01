import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../contexts/AuthContext";
import { useEffect, useState, useContext } from "react";

const useMessages = () => {

    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { isAuth } = useContext(AuthContext);

    const fetchMessages = async () => {
        setIsLoading(true);

        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/message/getall`,
                { withCredentials: true }
            );

            if (res.data.success) {
                setMessages(res.data.data);
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Messages fetch failed");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isAuth) {
            fetchMessages();
        }
    }, [isAuth]);

    return { messages, isLoading, fetchMessages };
};

export default useMessages;