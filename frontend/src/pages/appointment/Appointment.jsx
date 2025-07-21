import './appointment.scss';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/hero/Hero';
import { AuthContext, UserContext } from '../../contexts/AppContexts';
import AppointmentForm from '../../components/appointmentForm/AppointmentForm';

const Appointment = () => {
  const { isAuth } = useContext(AuthContext);
  const { user } = useContext(UserContext);

  return (
    <div>
      <Hero
        title={"Schedule Your Appointment | SkCare Medical Institute"}
        imageUrl={"/signin.png"}
      />
      {isAuth && user ? (
        <AppointmentForm />
      ) : (
        <div className="loginReminder">
          <h2>Access Denied</h2>
          <p>
            To book an appointment, you must be logged in to your account.
            Please <strong>log in</strong> to continue.
          </p>
          <p>If you don’t have an account, consider registering to access our full services.</p>
          <Link to='/login' className="loginReminder__btn">
            Go to Login Page
          </Link>
        </div>
      )}
    </div>
  )
}

export default Appointment;