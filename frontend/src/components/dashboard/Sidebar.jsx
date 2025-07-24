import "./sidebar.scss";
import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, UserContext } from "../../contexts/AppContexts";
import { FaBlog, FaKey, FaRegEdit, FaSignOutAlt, FaUser } from "react-icons/fa";

const Sidebar = ({ components, setComponents }) => {

    const { user, setUser } = useContext(UserContext);
    const { setIsAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const navItems = [
        { label: 'My Profile', value: 'Profile', icon: <FaUser /> },
        { label: 'Appointments', value: 'Appointment', icon: <FaBlog /> },
        { label: 'Change Password', value: 'ChangePassword', icon: <FaKey /> }
    ];

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
                navigate("/");
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Logout Failed")
        }
    };

    return (
        <div className="sidebarPage">
            <div className="sidebarPage__container">
                <h1>Welcome {user?.firstName || "Guest"}</h1>

                {navItems.map((item) => (
                    <button
                        key={item.value}
                        onClick={() => setComponents(item.value)}
                        className={`sidebarPage__container__btn ${components === item.value ? "active" : ""}`}
                    >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                    </button>
                ))}

                <Link to='/appointment' className="sidebarPage__container__btn">
                    <span> <FaRegEdit /></span>
                    <span>BookAppointment</span>
                </Link>

                <button className="sidebarPage__container__btn" onClick={handleLogOut}>
                    <span><FaSignOutAlt /> </span>
                    <span>Logout</span>
                </button>

            </div>
        </div>
    )
}

export default Sidebar;