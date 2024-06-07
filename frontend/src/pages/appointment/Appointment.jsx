import React from 'react'
import AppointmentForm from '../../components/appointmentForm/AppointmentForm'
import Hero from '../../components/hero/Hero'

const Appointment = () => {
  return (
    <>
      <Hero
        title={"Schedule Your Appointment | ZeeCare Medical Institute"}
        imageUrl={"/signin.png"}
      />
      <AppointmentForm/>
    </>
  )
}

export default Appointment
