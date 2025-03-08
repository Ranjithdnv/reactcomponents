import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import MaleDoctor from './maleDoctor.jpg';
import FemaleDoctor from './femaleDoctor1.jpg';
import { setDocData, setHospital } from '../redux/appointmentSlice';

function FormCard({ doctorData, selectedSpecialization, getBookEvent, call }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    //console.log("hos Specialization:", selectedSpecialization);
  }, [selectedSpecialization]);

  const docProfileHandler = (doctorData, selectedSpecialization) => {
    //console.log("send", selectedSpecialization)
    dispatch(setDocData(doctorData));
    dispatch(setHospital(selectedSpecialization));
    console.log(call, 'call');
    if (call) {
      getBookEvent();
    } else {
      navigate('/book-appointment');
    }
  };

  const Image = doctorData.user.gender === 'Male' ? MaleDoctor : FemaleDoctor;

  return (
    <div key={doctorData.name + doctorData.id}>
      <div className="form-card rounded-xl shadow-xl mb-7">
        <div className="relative w-full">
          <img src={Image} alt="Doctor" className="w-[20rem] h-36 object-fit rounded-lg" />
        </div>
        <div className="mt-4">
          <form className="w-full max-w-sm">
            <div className="flex-wrap mb-2 md:flex md:items-center form-sec">
              <div className="md:w-1/3 text-left">
                <label
                  className="block pr-4 mb-1 text-[#04816A] md:text-right md:mb-0"
                  htmlFor="inline-full-name"
                >
                  Name
                </label>
              </div>
              <div className="md:w-2/3">
                <span className="text text-right dark:text-[#242424]">
                  {doctorData.user.first_name ?? ''} {doctorData.user.last_name ?? ''}
                </span>
              </div>
            </div>
            <div className="mb-2 md:flex md:items-center form-sec">
              <div className="md:w-1/3 text-left">
                <label
                  className="block pr-4 mb-1 text-[#04816A] md:text-right md:mb-0"
                  htmlFor="inline-degree"
                >
                  Degree
                </label>
              </div>
              <div className="md:w-2/3">
                <span className="text text-right dark:text-[#242424]">
                  {doctorData?.degree?.name ?? ''}
                </span>
              </div>
            </div>
            <div className="mb-2 md:flex md:items-center form-sec">
              <div className="md:w-1/3 text-left">
                <label
                  className="block pr-4 mb-1 text-[#04816A] md:text-right md:mb-0"
                  htmlFor="inline-specialization"
                >
                  Specialization
                </label>
              </div>
              <div className="md:w-2/3">
                <span className="text text-right dark:text-[#242424]">
                  {doctorData.specialization?.name ?? ''}
                </span>
              </div>
            </div>
          </form>
        </div>
        <div className="flex gap-2 mt-4 border-0">
          {/* <div className="profile-btn rounded-lg">
            <Link className="text-white" to={"/book-appointment"}  onClick={() => docProfileHandler(doctorData, selectedSpecialization)}>
              View Profile
            </Link>
          </div> */}
          <div
            className={`px-4 py-1.5 appointment-btn cursor-pointer rounded-lg w-full text-[16px] font-medium transition-all`}
            onClick={() => docProfileHandler(doctorData, selectedSpecialization)}
          >
            Book
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormCard;
