import React from 'react'
import Hero from '../../components/hero/Hero';
import Biography from '../../components/biography/Biography';
import Departments from '../../components/departments/Departments';
import MessageForm from '../../components/messageForm/MessageForm';
 
const Home = () => {

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
