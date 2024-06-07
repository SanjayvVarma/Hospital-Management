import React, { useContext, useEffect, useState } from 'react';
import axios from "axios"
import DashboardContext from '../../contexts/DashboardContext'
import { useNavigate } from 'react-router-dom';

const Message = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(DashboardContext);

  const navigateTo = useNavigate()

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get("https://hospital-management-skck.onrender.com/api/v1/message/getall", { withCredentials: true, })
        setMessages(data.message)
      } catch (error) {
        console.log("ERROR OCCURED WILE FETCHING MESSAGE", error);
      }
    }

    fetchMessages()
  })

  if (!isAuthenticated) {
    navigateTo("/login")
  }

  return (
    <section className="page messages">
      <h1>MESSAGE</h1>
      <div className="banner">
        {messages && messages.length > 0 ? (
          messages.map((element) => {
            return (
              <div className="card" key={element._id}>
                <div className="details">
                  <p>
                    First Name: <span>{element.firstName}</span>
                  </p>
                  <p>
                    Last Name: <span>{element.lastName}</span>
                  </p>
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    Message: <span>{element.message}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Messages!</h1>
        )}
      </div>
    </section>
  )
}

export default Message
