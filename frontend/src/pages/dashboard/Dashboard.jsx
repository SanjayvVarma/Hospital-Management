import './dashboard.scss';
import Home from "../home/Home";
import { useContext, useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import Profile from "../../components/dashboard/Profile";
import Appointments from "../../components/dashboard/Appointments";
import { AuthContext, UserContext } from "../../contexts/AppContexts";
import ChnagePassword from "../../components/dashboard/ChnagePassword";

const Dashboard = () => {

    const [components, setComponents] = useState('Profile');

    const { user } = useContext(UserContext);
    const { isAuth } = useContext(AuthContext);

    return (
        <div className="dashboard">
            {user && isAuth ? (
                <div className="dashboard__container">
                    <div className="dashboard__container__sidebar">
                        <Sidebar components={components} setComponents={setComponents} />
                    </div>

                    <div className="dashboard__container__components">
                        {
                            components === "Profile" ? (
                                <Profile />
                            ) : components === "Appointment" ? (
                                <Appointments />
                            ) : components === "ChangePassword" ? (
                                <ChnagePassword />
                            ) : (
                                <div>
                                    No components found
                                </div>
                            )
                        }
                    </div>
                </div>
            ) : (
                <Home />
            )}

        </div>
    )
}

export default Dashboard;