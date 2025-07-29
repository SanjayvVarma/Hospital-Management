import './login.scss';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Loader from '../../components/loader/Loader';
import AuthContext from '../../contexts/AuthContext.js';
import { useContext, useEffect, useState } from 'react';

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { isAuth, setIsAuth, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const loginPayload = { password, role };

      if (username.includes("@")) {
        loginPayload.email = username
      } else {
        loginPayload.phone = username
      }

      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login`,
        loginPayload,
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Logged In");
        setUser(res.data.data);
        setIsAuth(true);
        navigate("/");
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Login Failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <div className='loginPage'>
      {isLoading && <Loader text="Logging In" message="Please wait while we verify your credentials..." />}

      <div className='loginPage__logo'>
        <img src="/logo.png" alt="logo" />
        <h1>WELCOME TO SKCARE</h1>
        <p>Doctors And Admins Are Allowed To Access These Resources!</p>
      </div>

      <form onSubmit={handleLogin} className='loginPage__form'>
        <div className='loginPage__form__input'>
          <label>Email Or Phone</label>
          <input
            type="text"
            placeholder="Email Or Phone"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className='loginPage__form__input'>
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

        <div className='loginPage__form__role'>
          <label>Select Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="" disabled>Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Doctor">Doctor</option>
          </select>
        </div>

        <div className='loginPage__form__btn'>
          <button type="submit">Login</button>
        </div>
      </form>

    </div>
  )
}

export default Login;