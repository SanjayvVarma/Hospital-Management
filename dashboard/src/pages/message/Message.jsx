import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";
import axios from "axios";
import DashboardContext from '../../contexts/DashboardContext';

const Message = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(DashboardContext);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get("https://hospital-management-skck.onrender.com/api/v1/message/getall", { withCredentials: true });
        setMessages(data.message);
      } catch (error) {
        console.log("ERROR OCCURED WHILE FETCHING MESSAGE", error);
      }
    };

    if (!isAuthenticated) {
      navigateTo("/login");
    } else {
      fetchMessages();
    }
  }, [isAuthenticated, navigateTo]);

  const handleDeleteMessage = async (messageId) => {
    try {
      const { data } = await axios.delete(`https://hospital-management-skck.onrender.com/api/v1/message/delete/${messageId}`, { withCredentials: true });
      setMessages((prevMessages) => prevMessages.filter((message) => message._id !== messageId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="page messages">
      <h1>MESSAGE: ({messages.length})</h1>
      <div className="banner">
        {messages && messages.length > 0 ? (
          messages.map((element) => {
            return (
              <div className="card" key={element._id}>
                <div className="details">
                  <p > First Name: <span>{element.firstName}</span> </p>
                  <p> Last Name: <span>{element.lastName}</span> </p>
                  <p>  Email: <span>{element.email}</span> </p>
                  <p>  Phone: <span>{element.phone}</span> </p>
                  <p>Message: <span>{element.message}</span> </p>
                </div>
                <button onClick={() => handleDeleteMessage(element._id)} className="delete-button">
                  <RiDeleteBinLine />
                </button>
              </div>
            );
          })) : (<h1>No Messages!</h1>)}
      </div>
    </section>
  )
}

export default Message;
