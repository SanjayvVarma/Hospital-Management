import axios from 'axios';
import { toast } from 'react-toastify';
import { TiHome } from 'react-icons/ti';
import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaHome, FaTimes } from 'react-icons/fa';
import { MdAddModerator } from 'react-icons/md';
import { IoPersonAddSharp } from 'react-icons/io5';
import { AiFillMessage } from 'react-icons/ai';
import { RiLogoutBoxFill } from 'react-icons/ri';
import AuthContext from '../../contexts/AuthContext';
import Login from '../login/Login';


const Sidebar = () => {

  const [show, setShow] = useState(false);
  const { isAuth, setIsAuth } = useContext(AuthContext)

  const navigate = useNavigate();

  const gotoHomePage = () => {
    navigateTo("/");
    setShow(!show);
  }

  const gotoDoctorsPage = () => {
    navigateTo("/doctors");
    setShow(!show);
  }

  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(!show);
  }

  const gotoAddNewDoctor = () => {
    navigateTo("/doctor/addnew");
    setShow(!show);
  }

  const gotoMessagesPage = () => {
    navigateTo("/messages");
    setShow(!show);
  }

  const handleLogout = async () => {
    await axios
      .get("https://hospital-management-skck.onrender.com/api/v1/user/admin/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuth(false);

      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div>
      {isAuth && (
        <div className={show ? "container__navLinks container__showmenu" : "container__navLinks"}>
          <div>
            <NavLink><FaHome /> <span>Home</span></NavLink>
            {/* <NavLink> <FaUserDoctor /> <span>Add Doctor</span></NavLink> */}
          </div>
          <div>
            {show ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar;