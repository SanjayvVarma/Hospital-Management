import './register.scss';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import Loader from '../../components/loader/Loader';

const Register = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [uid, setUid] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const isFormValid = firstName && email && phone && uid && dob && gender && password && confirmPassword && address && password === confirmPassword

  const handleRegistration = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/register-patient`,
        { firstName, lastName, email, phone, uid, dob, gender, address, password, role: "Patient" },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Patient Registered Successfully");
        navigate("/login");
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Patient Registered failed")
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registrationPage">
      {isLoading && <Loader text='Registering Your Account' message='Please wait while we securely create your profile...' />}
      <h2>Sign Up</h2>
      <p>Join Our Health Community Today</p>

      <form className="registrationPage__form" onSubmit={handleRegistration}>

        <div className="registrationPage__form__input">
          <div>
            <label>First Name</label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

        </div>

        <div className="registrationPage__form__input">
          <div>
            <label>Email</label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label>Mobile Number</label>
            <input
              type="tel"
              placeholder="Mobile Number"
              value={phone}
              pattern="[0-9]{10}"
              maxLength={10}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

        </div>

        <div className="registrationPage__form__input">

          <div>
            <label>UID</label>
            <input
              type="text"
              placeholder="UID (e.g. Aadhaar number)"
              value={uid}
              pattern="\d{12}"
              maxLength={12}
              onChange={(e) => setUid(e.target.value)}
            />
          </div>

          <div>
            <label>Address</label>
            <input
              placeholder='Address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="registrationPage__form__input">
          <div>
            <label>Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Transgender">Transgender</option>
            </select>
          </div>

          <div>
            <label>Date of Birth</label>
            <input
              type='date'
              placeholder="Date of Birth"
              max={new Date().toISOString().split("T")[0]}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

        </div>

        <div className="registrationPage__form__input">

          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label>Confirm Password</label>
            <input
              type="text"
              placeholder="confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {password !== confirmPassword && confirmPassword && (
            <p className="registrationPage__form__input__error">Passwords do not match.</p>
          )}
        </div>

        <div className='registrationPage__form__btn'>
          <button disabled={!isFormValid} type="submit">Register</button>
        </div>

        <div className='registrationPage__form__already'>
          <p>Already Registered?</p>
          <Link to="/login">Login Now</Link>
        </div>
      </form>

    </div>
  )
}

export default Register;