import React, { useContext } from 'react'
import AuthenticatedContext from '../../contexts/AuthenticatedContext.js'
import { useState } from 'react';
import { useNavigate, Link,  } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthenticatedContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:8080/api/v1/user/login", { email, password, confirmPassword, role: "Patient" }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      })
      toast.success(res.data.message)
      setIsAuthenticated(true)
      navigateTo("/")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  if (isAuthenticated) {
    return navigateTo("/");
  }

  return (
    <>
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
    </>
  )
}

export default Login
