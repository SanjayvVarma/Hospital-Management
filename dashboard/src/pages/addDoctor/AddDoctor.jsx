import axios from "axios";
import "./addDoctor.scss";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loader from "../../components/loader/Loader";
import AuthContext from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { DOCTOR_DEPARTMENT } from "../../utils/constants";

const AddDoctor = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [uid, setUid] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  const navigate = useNavigate();
  const { isAuth } = useContext(AuthContext)

  const isValidForm = firstName && email && phone && uid && dob && gender && password && conPassword && password === conPassword

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("uid", uid);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("docAvatar", docAvatar);

      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/addNew-doctor`,
        formData,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" }, }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setUid("");
        setDob("");
        setGender("");
        setPassword("");
        setDoctorDepartment("");
        setDocAvatar();
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Doctor registered failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login")
    }
  }, [isAuth, navigate]);

  return (
    <div className="docAddPage">
      {isLoading && <Loader text="Registering" message="please wait while we verify your details...." />}
      <h1>REGISTER A NEW DOCTOR</h1>

      <form className="docAddPage__form" onSubmit={handleAddNewDoctor}>
        <div className="docAddPage__form__avatar">
          <img
            src={docAvatarPreview ? `${docAvatarPreview}` : "/docHolder.jpg"}
            alt="Doctor Avatar"
          />
          <input type="file" accept="image/*" onChange={handleAvatar} />
        </div>

        <div className="docAddPage__form__details">

          <div className="docAddPage__form__details__input">
            <label>First Name</label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="docAddPage__form__details__input">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="docAddPage__form__details__input">
            <label>Email</label>
            <input
              type="email"
              placeholder="enter valid email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="docAddPage__form__details__input">
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

          <div className="docAddPage__form__details__input">
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

          <div className="docAddPage__form__details__input">
            <label>DOB</label>
            <input
              type="date"
              placeholder="Date of Birth"
              max={new Date().toISOString().split("T")[0]}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          <div className="docAddPage__form__details__input">
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

          <div className="docAddPage__form__details__input">
            <label>Select Department</label>
            <select
              value={doctorDepartment}
              onChange={(e) => setDoctorDepartment(e.target.value)}
            >
              <option value="" disabled>Select Department</option>
              {
                DOCTOR_DEPARTMENT.map((depart, i) => (
                  <option key={i} value={depart}>{depart}</option>
                ))
              }
            </select>
          </div>

          <div className="docAddPage__form__details__input">
            <label>Password</label>
            <div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>
          </div>

          <div className="docAddPage__form__details__input">
            <label>Confirm Password</label>
            <div>
              <input
                type={showConPassword ? "text" : "password"}
                placeholder="Password"
                value={conPassword}
                onChange={(e) => setConPassword(e.target.value)}
              />
              <button
                type='button'
                onClick={() => setShowConPassword(!showConPassword)}
              >
                {showConPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>
            {password !== conPassword && conPassword && (
              <p className="docAddPage__form__details__input__error">Passwords do not match.</p>
            )}
          </div>

          <div className="docAddPage__form__details__btn">
            <button
              type="submit"
              disabled={!isValidForm}
            >
              Register New Doctor
            </button>
          </div>
        </div>
      </form>

    </div>
  )
}

export default AddDoctor;