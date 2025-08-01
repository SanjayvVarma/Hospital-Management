import "./message.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import formatDate from "../../utils/date";
import { useNavigate } from 'react-router-dom';
import useMessages from "../../hooks/useMessages";
import Loader from "../../components/loader/Loader";
import AuthContext from '../../contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';

const Message = () => {

  const navigate = useNavigate();
  const { isAuth } = useContext(AuthContext);
  const { messages, fetchMessages } = useMessages();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id) => {
    setIsLoading(true);

    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/message/delete/${id}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Message deleted successfully");
        fetchMessages();
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "message delete failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  return (
    <div className="messagePage">
      {isLoading && <Loader text="Deleting" />}
      {messages && messages.length > 0 ? (
        messages.map((message) => (
          <div key={message._id} className="messagePage__card">
            <div className="messagePage__card__details">
              <p>First Name :- <span>{message.firstName} {message.lastName}</span></p>
              <p>Email :- <span>{message.email}</span></p>
              <p>Phone :- <span>{message.phone}</span></p>
              <p>Sent On :- <span>{formatDate(message.createdAt)}</span></p>
              <p>Message :- <span>{message.message}</span></p>
            </div>
            <button
              className="messagePage__card__btn"
              onClick={() => handleDelete(message._id)}
            >
              <FaTrash />
            </button>
          </div>
        ))
      ) : (
        <h1>No Messages!</h1>
      )}
    </div>
  )
}

export default Message;