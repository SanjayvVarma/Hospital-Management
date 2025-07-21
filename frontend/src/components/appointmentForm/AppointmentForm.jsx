import axios from 'axios';
import './appointment.scss';
import Loader from '../loader/Loader';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DOCTOR_DEPARTMENT } from '../../utils/constants';

const AppointmentForm = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [uid, setUid] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [department, setDepartment] = useState("");
    const [doctor, setDoctor] = useState("");
    const [address, setAddress] = useState("");
    const [hasVisited, setHasVisited] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/all-doctors`,
                    { withCredentials: true }
                );

                if (res.data.success) {
                    setDoctors(res.data.data)
                }

            } catch (error) {
                toast.error(error?.response?.data.message || "Doctors fetch failed");
            } finally {
                setIsLoading(false);
            }
        }
        fetchDoctors();
    }, [department]);

    useEffect(() => {
        setDoctor("");
    }, [department]);

    const handleAppointment = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/appointment/create`,
                { firstName, lastName, email, phone, uid, dob, gender, appointmentDate, department, doctor, hasVisited, address },
                { withCredentials: true, headers: { "Content-Type": "application/json" } }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/");
                setFirstName('');
                setLastName('');
                setEmail('');
                setPhone('');
                setUid('');
                setDob('');
                setGender('');
                setAppointmentDate('');
                setAddress('');
                setDepartment('');
                setDoctor('');
                setHasVisited(false);
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Appointment Send Failed");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="appointment">
            <h2>Appointment</h2>
            {isLoading && <Loader />}

            <form className='appointment__form' onSubmit={handleAppointment}>
                <div className='appointment__form__input'>
                    <div>
                        <label>First Name</label>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Last Name</label>
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>

                <div className='appointment__form__input'>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Mobile Number</label>
                        <input
                            type="tel"
                            placeholder="Mobile Number"
                            value={phone}
                            pattern="[0-9]{10}"
                            maxLength={10}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>

                <div className='appointment__form__input'>
                    <div>
                        <label>UID</label>
                        <input
                            type="text"
                            placeholder="UID (e.g. Aadhaar number)"
                            value={uid}
                            pattern="\d{12}"
                            maxLength={12}
                            onChange={(e) => setUid(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Date of Birth</label>
                        <input
                            type='date'
                            placeholder="Date of Birth"
                            max={new Date().toISOString().split("T")[0]}
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>
                </div>

                <div className='appointment__form__input'>
                    <div>
                        <label>Gender</label>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="" disabled>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Transgender">Transgender</option>
                        </select>
                    </div>

                    <div>
                        <label>Appointment Date</label>
                        <input
                            type="date"
                            placeholder='Appointment Date'
                            value={appointmentDate}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => setAppointmentDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className='appointment__form__input'>
                    <div>
                        <label>Select Department</label>
                        <select
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        >
                            <option value="" disabled>Select Department</option>
                            {DOCTOR_DEPARTMENT.map((depart, idx) => (
                                <option key={idx} value={depart}>{depart}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Select Doctor</label>
                        <select
                            value={doctor}
                            onChange={(e) => setDoctor(e.target.value)}
                            disabled={!department}
                        >
                            <option value="" disabled>Select Doctor</option>
                            {
                                doctors
                                    .filter((doctor) => doctor.doctorDepartment === department)
                                    .map((doctor, idx) => (
                                        <option key={doctor._id} value={doctor._id}>{doctor.firstName} {doctor.lastName}</option>
                                    ))
                            }
                        </select>
                    </div>
                </div>

                <div className='appointment__form__text'>
                    <label>Address</label>
                    <textarea
                        placeholder='Address'
                        rows="5"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className='appointment__form__checkbox' >
                    <label>
                        <input
                            type="checkbox"
                            checked={hasVisited}
                            onChange={(e) => setHasVisited(e.target.checked)}
                        />
                        Have you visited before?
                    </label>
                </div>

                <div className='appointment__form__btn'>
                    <button>GET APPOINTMENT</button>
                </div>

            </form >

        </div>
    )
}

export default AppointmentForm;