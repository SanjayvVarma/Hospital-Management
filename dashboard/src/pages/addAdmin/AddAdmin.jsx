import "./addAdmin.scss";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import AuthContext from '../../contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';

const AddAdmin = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [uid, setUid] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const isValidForm = firstName && lastName && email && phone && uid && dob && gender && password && conPassword && password === conPassword;

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setUid('');
    setDob('');
    setGender('');
    setPassword('');
    setConPassword('');
  };

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/addnew-admin`,
        { firstName, lastName, email, phone, uid, dob, gender, password },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        toast.success(res.data.message || "New Admin Add Successfully");
        navigate("/");
        resetForm();
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "New Admin Add failed")
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!isAuth) {
      navigate("/login")
    }
  }, [isAuth, navigate]);

  return (
    <div className="adminPage">
      {isLoading && <Loader text="Adding new admin" message="Please wait while verify your details" />}
      <h1>ADD NEW ADMIN</h1>

      <form className="adminPage__form" onSubmit={handleAddNewAdmin}>
        <div className="adminPage__form__row">
          <div className="adminPage__form__input">
            <label>First Name</label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="adminPage__form__input">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className="adminPage__form__row">
          <div className="adminPage__form__input">
            <label>Email</label>
            <input
              type="email"
              placeholder="enter valid email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="adminPage__form__input">
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

        <div className="adminPage__form__row">
          <div className="adminPage__form__input">
            <label>Aadhaar(UID)</label>
            <input
              type="text"
              placeholder="UID (e.g. Aadhaar number)"
              value={uid}
              pattern="\d{12}"
              maxLength={12}
              onChange={(e) => setUid(e.target.value)}
            />
          </div>

          <div className="adminPage__form__input">
            <label>DOB</label>
            <input
              type="date"
              placeholder="Date of Birth"
              max={new Date().toISOString().split("T")[0]}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
        </div>

        <div className="adminPage__form__row">
          <div className="adminPage__form__input">
            <label>Select Gender</label>
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

          <div className="adminPage__form__input">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="adminPage__form__input">
          <label>Confirm Password</label>
          <input
            type="text"
            placeholder="confirm Password"
            value={conPassword}
            onChange={(e) => setConPassword(e.target.value)}
          />
          {password !== conPassword && conPassword && (
            <p>Passwords do not match.</p>
          )}
        </div>

        <div className="adminPage__form__btn">
          <button
            type="submit"
            disabled={!isValidForm}
          >
            Register New Admin
          </button>
        </div>
      </form>

    </div>
  )
}

export default AddAdmin;