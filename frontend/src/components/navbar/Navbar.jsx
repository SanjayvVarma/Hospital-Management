import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom"
import AuthenticatedContext from '../../contexts/AuthenticatedContext';
import { toast } from "react-toastify";
import { GiHamburgerMenu } from "react-icons/gi"
import axios from 'axios';
const Navbar = () => {

    const [show, setShow] = useState(false)
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthenticatedContext)
    const navigateTo = useNavigate()

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:8080/api/v1/user/patient/logout",
                { withCredentials: true }
            ).then((res) => {
                toast.success(res.data.message)
                setIsAuthenticated(false)
            })

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const goToLogin = async () => {
        navigateTo("/login")
    }


    return (
        <>
            <nav className={"container"}>
                <div className="logo">
                    <img src="/logo.png" alt="logo" className="logo-img" />
                </div>
                <div className={show ? "navLinks showmenu" : "navLinks"}>
                    <div className="links">
                        <NavLink to={"/"} onClick={() => setShow(!show)}> HOME </NavLink>
                        <NavLink to={"/appointment"} onClick={() => setShow(!show)}> APPOINTMENTS  </NavLink>
                        <NavLink to={"/about"} onClick={() => setShow(!show)}>  ABOUT US  </NavLink>
                    </div>
                    <div className='btn-dash'>
                   <Link to={"https://hospital-management-dashboardpage.vercel.app"}> <button className="logoutBtn btn">Dashboard</button></Link>
                    {isAuthenticated ?
                        (<button className="logoutBtn btn" onClick={handleLogout}> LOGOUT </button>) :
                        (<button className="loginBtn btn" onClick={goToLogin}> LOGIN  </button>)
                    }
                    </div>

                </div>
                <div className="hamburger" onClick={() => setShow(!show)}>
                    <GiHamburgerMenu />
                </div>
            </nav>
        </>
    )
}

export default Navbar
