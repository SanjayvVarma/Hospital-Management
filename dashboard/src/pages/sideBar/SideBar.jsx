import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TiHome } from 'react-icons/ti';
import { FaUserDoctor } from 'react-icons/fa6';
import { MdAddModerator } from 'react-icons/md';
import { IoPersonAddSharp } from 'react-icons/io5';
import { AiFillMessage } from 'react-icons/ai';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { GiHamburgerMenu } from 'react-icons/gi';
import DashboardContext from '../../contexts/DashboardContext.js';
import axios from 'axios';
import { toast } from 'react-toastify';


const SideBar = () => {

  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated, } = useContext(DashboardContext)

  const navigateTo = useNavigate();

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
        setIsAuthenticated(false);

      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };



  return (
    <>
      <nav
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className={show ? "show sidebar" : "sidebar"}
      >
        <div className="links">
          <TiHome onClick={gotoHomePage} />
          <FaUserDoctor onClick={gotoDoctorsPage} />
          <MdAddModerator onClick={gotoAddNewAdmin} />
          <IoPersonAddSharp onClick={gotoAddNewDoctor} />
          <AiFillMessage onClick={gotoMessagesPage} />
          <RiLogoutBoxFill onClick={handleLogout} />
        </div>
      </nav>
      <div
        className="wrapper"
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
      >
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  )
}

export default SideBar;
