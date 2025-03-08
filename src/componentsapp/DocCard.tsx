import React from "react";
import tone from "../../assets/images/t1.jpg";
import { useDispatch } from "react-redux";
import { setDocData } from "../redux/appointmentSlice";
import { useNavigate } from "react-router-dom";
import MaleDoctor from "./maleDoctor.jpg";
import FemaleDoctor from "./femaleDoctor.jpg";

function DocCard(props: any) {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handleAppointment = () => {
    dispatch(setDocData(props?.data));
    navigate("book-appointment");
  };

  const backgroundImage = props.data.user.image
    ? props.data.user.image
    : props.data.user.gender === "Male"
    ? MaleDoctor
    : FemaleDoctor;

  return (
    <div className="bg-white docard h-60">
      <div className="w-full lg:max-w-full lg:flex doc-res h-full">
        <div
          className="flex-none w-36 md:w-48 h-full overflow-hidden text-center bg-cover rounded-t lg:h-auto lg:w-48 lg:rounded-t-none lg:rounded-l backImg doc-img-res"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
          title="Doctor's Photo"
        ></div>
        <div className="flex flex-col justify-between p-4 leading-normal bg-white rounded-b doc-data-res lg:rounded-b-none lg:rounded-r">
          <div className="mb-8">
            <div className="mb-2 text-xl font-bold text-gray-900 doctext">
              {props.data?.user.first_name}
            </div>
            <p className="text-base text-gray-700 backtxt line-clamp-4">
              {props.data?.experience}+ Years
            </p>
            <p className="text-base text-gray-700 backtxt">{props.data?.dob}</p>
            <p className="text-base text-gray-700 backtxt line-clamp-4">
              {props.data?.overview}
            </p>
            <button onClick={handleAppointment} className="button-app">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocCard;
