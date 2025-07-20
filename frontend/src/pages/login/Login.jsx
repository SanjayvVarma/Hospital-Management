import axios from 'axios';
import { useState } from 'react';
import { useContext } from 'react'
import { toast } from 'react-toastify';
import { useNavigate, Link, } from 'react-router-dom';
import { AuthContext, UserContext } from '../../contexts/AppContexts.js';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(UserContext);
  const { setIsAuth } = useContext(AuthContext);
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login`,
        { email, password, role: "Patient" },
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsAuth(true);
        setUser(res.data.data)
        toast.success(res.data.message);
        navigateTo("/");
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {
        <div className="container form-component login-form">
          <h2>Sign In</h2>
          <p>Please Login To Continue</p>
          <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat culpa voluptas expedita itaque ex, totam ad quod error? </p>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              style={{
                gap: "10px",
                justifyContent: "flex-end",
                flexDirection: "row",
              }}
            >
              <p style={{ marginBottom: 0 }}>Not Registered?</p>
              <Link
                to={"/register"}
                style={{ textDecoration: "none", color: "#271776ca" }}
              >
                Register Now
              </Link>
            </div>
            <div
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      }
    </>
  )
}

export default Login;
