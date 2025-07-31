import "./doctors.scss";
import { useState } from 'react';
import formatDate from '../../utils/date';
import useDoctors from '../../hooks/useDoctors';
import Loader from '../../components/loader/Loader';

const Doctors = () => {

  const [searchDoctor, setSearchDoctor] = useState("");
  const { doctors, isloading } = useDoctors();

  const filterDoctor = doctors?.filter((doctor) =>
    doctor.firstName.toLowerCase().includes(searchDoctor.toLowerCase()) ||
    doctor.doctorDepartment.toLowerCase().includes(searchDoctor.toLowerCase()) ||
    doctor.phone.includes(searchDoctor)
  );

  return (
    <div className='doctorsPage'>
      {isloading && <Loader />}
      <div className='doctorsPage__search'>
        <input
          type="text"
          placeholder='search doctors by name, department, mobile number'
          value={searchDoctor}
          onChange={(e) => setSearchDoctor(e.target.value)}
        />
      </div>

      {filterDoctor.length > 0 ? (
        <div className="doctorsPage__grid">
          {filterDoctor.map((doctor) => (
            <div key={doctor._id} className='doctorsPage__grid__card'>
              <div className='doctorsPage__grid__card__image'>
                <img src={doctor.docAvatar} alt={doctor.firstName} />
              </div>
              <div className='doctorsPage__grid__card__details'>
                <p>Doctor Name :- <span>{doctor.firstName} {doctor.lastName}</span></p>
                <p>Email :- <span>{doctor.email}</span></p>
                <p>Mobile Number :- <span>{doctor.phone}</span></p>
                <p>Aadhaar(UID) :- <span>{doctor.uid}</span></p>
                <p>Gender :- <span>{doctor.gender}</span></p>
                <p>DOB :- <span>{formatDate(doctor.dob)}</span></p>
                <p>Department :- <span>{doctor.doctorDepartment}</span></p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="doctorsPage__empty">No Doctor Registered yet</p>
      )}
    </div>
  );
};

export default Doctors;