import './profile.scss';
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/AppContexts";

const Profile = () => {

  const { user } = useContext(UserContext);

  return (
    <div className="profilePage">
      <div className="profilePage__container">
        <div className="profilePage__container__details">
          <p>
            FullName :- <span>{user.firstName} {user.lastName}</span>
          </p>
          <p>
            Mobile No. :- <span>{user.phone}</span>
          </p>
          <p>
            Email :- <span>{user.email}</span>
          </p>
          <p>
            Gender :- <span>{user.gender}</span>
          </p>
          <p>
            DOB :- <span>{new Date(user.dob).toLocaleDateString("en-GB")}</span>
          </p>
          <p>
            Aadhaar(UID) :- <span>{user.uid}</span>
          </p>
          <p>
            Address :- <span>{user.address}</span>
          </p>
        </div>
      </div>
      <div className="profilePage__btn">
        <Link to="/update-profile">Update Profile</Link>
      </div>
    </div>
  )
}

export default Profile;