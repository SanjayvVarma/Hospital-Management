import axios from 'axios'
import "./messageForm.scss";
import { useState } from 'react';
import Loader from '../loader/Loader';
import { toast } from 'react-toastify';

const MessageForm = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {

      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/message/send`,
        { firstName, lastName, email, phone, message },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Message Send Successfully");
        setFirstName('');
        setLastName('');
        setEmail('');
        setMessage('');
        setPhone('');
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Message Send Failed");
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="message-contaier">
      {isLoading && <Loader text='Message Sending' message='we are proccessing' />}
      <h2>Send Us A Message</h2>
      <form className='message-contaier__form' onSubmit={handleSubmit}>
        <div className="message-contaier__form__input">
          <input
            type="text"
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="message-contaier__form__input">
          <input
            type="text"
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder='phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <textarea
          rows={7}
          placeholder='Message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="message-contaier__form__text"
        > </textarea>

        <div className='message-contaier__form__btn'>
          <button type='submit'>Send</button>
        </div>
      </form>
    </div>
  )
}

export default MessageForm;