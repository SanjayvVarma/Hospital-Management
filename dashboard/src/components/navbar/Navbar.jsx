import "./navbar.scss";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext, useState } from 'react';
import { FaKey, FaUserDoctor } from "react-icons/fa6";
import AuthContext from '../../contexts/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaHome, FaRegEnvelope, FaTimes, FaUserShield } from 'react-icons/fa';

const Navbar = () => {

  const [show, setShow] = useState(false);
  const { setIsAuth, setUser, user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/logout`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        setUser({});
        setIsAuth(false);
        toast.success(res.data.message || "Logout successfully");
        navigate("/login");
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout Failed")
    }
  };

  return (
    <div className='sidebarPage'>
      <div className="sidebarPage__logo">
        <h1>{user.role} Dashboard</h1>
      </div>

      <div className='sidebarPage__navbar'>
        <div className={`sidebarPage__navbar__navLinks ${show ? "sidebarPage__navbar__showmenu" : ""}`}>

          <NavLink to="/" onClick={() => setShow(!show)}>
            <FaHome /><span>Home</span>
          </NavLink>
          {user.role === "Admin" &&
            <>
              <NavLink to="/add-doctor" onClick={() => setShow(!show)}>
                <FaUserDoctor /><span>Add Doctor</span>
              </NavLink>

              <NavLink to="/add-admin" onClick={() => setShow(!show)}>
                <FaUserShield /><span>Add Admin</span>
              </NavLink>
            </>
          }
          <NavLink to="/change-password" onClick={() => setShow(!show)}>
            <FaKey /><span>Change Password</span>
          </NavLink>

          <button onClick={handleLogOut}>Logout</button>
        </div>

        <div className='sidebarPage__navbar__menuicon'>
          <button onClick={() => setShow(!show)}>
            {show ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </div>

  )
}

export default Navbar; 