import React from 'react'
import Hero from '../../components/hero/Hero';
import Biography from '../../components/biography/Biography';
import Departments from '../../components/departments/Departments';
import MessageForm from '../../components/messageForm/MessageForm';

import { useContext, useEffect } from 'react';
import axios from 'axios';
import AuthenticatedContext from '../../contexts/AuthenticatedContext';
 
const Home = () => {

  const { setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthenticatedContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://hospital-management-skck.onrender.com/api/v1/user/patient/me", { withCredentials: true })
        setIsAuthenticated(true)
        setUser(res.data.user)
        console.log("patient logged in successfully");
      } catch (error) {
        setIsAuthenticated(false)
        setUser({})
        console.log("SOME ERROE");
      }
    }
    fetchUser();
  }, [isAuthenticated])


  return (
    <>
      <Hero title={"Welcome to ZeeCare Medical Institute | Your Trusted Healthcare provider"} imageUrl={"/hero.png"} />
      <Biography imageUrl={"/about.png"} />
      <Departments />
      <MessageForm />
    </>
  )
}

export default Home;
