import './navbar.scss';
import { useContext, useState } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexts/AppContexts';

const Navbar = () => {

    const [show, setShow] = useState(false);
    const { isAuth } = useContext(AuthContext);

    return (
        <div>
            <nav className="container">
                <div className="container__logo">
                    <img src="/logo.png" alt="logo" className="container__logo__img" />
                </div>

                <div className={show ? "container__navLinks container__showmenu" : "container__navLinks"}>

                    <div className="container__navLinks__links">
                        <NavLink to="/" onClick={() => setShow(!show)}>Home</NavLink>
                        <NavLink to="/appointment" onClick={() => setShow(!show)}>Appointments</NavLink>
                        <NavLink to="/about" onClick={() => setShow(!show)}>About Us</NavLink>
                    </div>

                    <div className='container__navLinks__btn'>
                        {isAuth ? (
                            <NavLink to="/dashboard" onClick={() => setShow(!show)} className="container__navLinks__btn__dashBtn">Dashboard</NavLink>
                        ) : (
                            <NavLink to="/login" onClick={() => setShow(!show)} className="container__navLinks__btn__loginBtn" >LOGIN</NavLink>
                        )}
                    </div>

                </div>

                <div className="container__hamburger" onClick={() => setShow(!show)}>
                    {show ? <FaTimes /> : <FaBars />}
                </div>
            </nav>
        </div>
    )
}

export default Navbar;