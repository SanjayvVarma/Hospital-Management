import './login.scss';
import axios from 'axios';
import { useState } from 'react';
import { useContext } from 'react'
import { toast } from 'react-toastify';
import { useNavigate, Link, } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { AuthContext, UserContext } from '../../contexts/AppContexts.js';

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const { setUser } = useContext(UserContext);
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const loginPayload = { password, role: "Patient" };

      if (username.includes("@")) {
        loginPayload.email = username;
      } else {
        loginPayload.phone = username;
      }

      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login`,
        loginPayload,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsAuth(true);
        setUser(res.data.data)
        toast.success(res.data.message);
        navigate("/");
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Login Failed");
    } finally {
      setIsLoading(false)
    }
  }

  return (

    <div className="loginForm">
      {isloading && <Loader text="Logging In" message="Please wait while we verify your credentials..." />}

      <div className="loginForm__container">
        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to book appointments and manage your profile.</p>

        <form className="loginForm__form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email or Phone"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="loginForm__form__actions">
            <p>Don’t have an account? <Link to="/register">Register here</Link></p>
             <Link to="/forgot">Forgot Password</Link>
          </div>

          <button type="submit" className="loginForm__form__btn">Login</button>
        </form>
      </div>
    </div>

  )
}

export default Login;