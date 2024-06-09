import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import CircleLoader from "react-spinners/ClipLoader";
import axios from 'axios';
import { toast } from 'react-toastify';
import DashboardContext from '../../contexts/DashboardContext.js';

const Login = () => {

  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(DashboardContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://hospital-management-skck.onrender.com/api/v1/user/login", { email, password, confirmPassword, role: "Admin" }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      })
      toast.success(res.data.message)
      setUser(res.data.user)
      setIsAuthenticated(true)
      navigateTo("/")

    } catch (error) {
      toast.error(error.response.data.message)
    }
    setLoading(false)
  }

  if (isAuthenticated) {
    return <Navigate to={"/"} />
  }

  return (
    <>
      {
        loading ? <CircleLoader color="#ffffff" size={200} /> :
          <section className="container form-component">
            <img src="/logo.png" alt="logo" className="logo" />
            <h1 className="form-title">WELCOME TO ZEECARE</h1>
            <p>Only Admins Are Allowed To Access These Resources!</p>
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
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div style={{ justifyContent: "center", alignItems: "center" }}>
                <button type="submit">Login</button>
              </div>
            </form>
          </section>
      }
    </>
  )
}

export default Login;