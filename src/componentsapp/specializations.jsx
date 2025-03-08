import React, { useState } from 'react';
import { SearchOutlined, UserOutlined, BankOutlined, TeamOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import DrImage from '../assets/images/div.elementor-widget-wrap 1.png';
import files from '../assets/images/files.png';
import call from '../assets/images/call.png';
import HospitalImg from '../assets/images/6513449 1.png';
import Why1 from '../assets/images/why1.png';
import Why2 from '../assets/images/why2.png';
import Why3 from '../assets/images/why3.png';
import Why4 from '../assets/images/why4.png';
import Why5 from '../assets/images/why5.png';
import Why6 from '../assets/images/why6.png';
import AboutUsHero from '../modules/AboutUs/AboutUsHero';
import decoLeft from '../assets/images/decoLeft.png';
import decoRight from '../assets/images/decoRight.png';
import leftZigZag from '../assets/images/leftZigZagPurple.png';
import rightZigZag from '../assets/images/rightZigZagGreen.png';
import IllustrationImg from '../assets/images/Our Speciality.png';
import Cardiology from '../assets/images/Cardiology.png';
import Otology from '../assets/images/Otology.png';
import Neurology from '../assets/images/Neurology.png';
import Physiotherapy from '../assets/images/Physiotherapy.png';
import Urologist from '../assets/images/Urologist.png';
import ClinicalGenetics from '../assets/images/Clinical Genetics.png';
import Gastrologist from '../assets/images/Gastrologist.png';
import DrugTherapy from '../assets/images/Drug Therapy.png';
import Rheumatologist from '../assets/images/Rheumatologist.png';
import Nephrology from '../assets/images/Nephrology.png';
import InfectionDisease from '../assets/images/Infection Disease.png';
import Rhinology from '../assets/images/Rhinology.png';
import Hematologist from '../assets/images/Hematologist.png';
import Anesthesia from '../assets/images/Anesthesia.png';
import GeneralPractitioner from '../assets/images/General Practitioner.png';
import Ophthalmology from '../assets/images/Ophthalmology.png';
import Orthopedic from '../assets/images/Orthopedic.png';
import Pulmonologist from '../assets/images/Pulmonologist.png';
import Pathologist from '../assets/images/Pathologist.png';
import Psychiatrist from '../assets/images/Psychiatrist.png';

const Specialization = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleFaqClick = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen">
      {/* Header Section with Background */}
      <div className=" mt-16 bg-[#F8FAFC] text-left ml-20">
        <div className="container mx-auto px-12 py-3">
          {/* <h1 className="text-[48px] font-bold text-center">
            Schedule Your <span className="text-[#8B5CF6]">Free</span>{' '}
            <span className="text-[#22C55E]">Demo</span> ...!
          </h1> */}
          {/* <span className="font-bold"> {'<'} Back</span> */}
        </div>
      </div>
      <div className="bg-[#F8FAFC]  mb-8">
        <div className="container mx-auto px-16 py-4">
          <h1 className="text-[48px] font-bold text-center">Specializations</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-16">
        <div className="max-w-7xl mx-auto">
          {/* Explore MedFidelity Section */}
          <div className="mb-24">
            <p className="text-gray-600 text-xl leading-relaxed mt-8">
              MedFidelity specializes in improving hospital healthcare systems by providing
              innovative technology and expert-driven solutions to optimize patient care and
              operational efficiency.
            </p>
          </div>
          <img src={leftZigZag} className="absolute left-0 w-20" />
          <img src={decoRight} className="absolute  right-0 top-96 w-28" />
          <img src={rightZigZag} className="absolute  right-0 top-[100%] w-28" />
          {/* Form Section */}
          <div className="max-w-4xl mx-auto bg-white p-12 mb-16">
            <img
              src={IllustrationImg}
              alt="Medical Technology"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Specialization Grid */}
          <div className="grid grid-cols-5 gap-6 mb-12">
            {/* Row 1 */}
            <div className="flex flex-col  items-center p-4 border-2 border-[#E8E5F7] rounded-lg cursor-pointer hover:shadow-lg hover:scale-105 hover:border-[#3c00be] transition-all duration-300">
              <img src={Cardiology} alt="Cardiology" className="w-12 h-12 mb-2" />
              <span className="text-sm">Cardiology</span>
            </div>
            <div className="flex flex-col items-center p-4 border-2 border-[#E8E5F7] rounded-lg cursor-pointer hover:shadow-lg hover:scale-105 hover:border-[#3c00be] transition-all duration-300">
              <img src={Physiotherapy} alt="Physiotherapy" className="w-12 h-12 mb-2" />
              <span className="text-sm">Physiotherapy</span>
            </div>
            <div className="flex flex-col items-center p-4 border-2 border-[#E8E5F7] rounded-lg cursor-pointer hover:shadow-lg hover:scale-105 hover:border-[#3c00be] transition-all duration-300">
              <img src={Neurology} alt="Neurology" className="w-12 h-12 mb-2" />
              <span className="text-sm">Neurology</span>
            </div>
            <div className="flex flex-col items-center p-4 border-2 border-[#E8E5F7] rounded-lg cursor-pointer hover:shadow-lg hover:scale-105 hover:border-[#3c00be] transition-all duration-300">
              <img src={Otology} alt="Otology" className="w-12 h-12 mb-2" />
              <span className="text-sm">Otology</span>
            </div>
            <div className="flex flex-col items-center p-4 border-2 border-[#E8E5F7] rounded-lg cursor-pointer hover:shadow-lg hover:scale-105 hover:border-[#3c00be] transition-all duration-300">
              <img src={Rhinology} alt="Rhinology" className="w-12 h-12 mb-2" />
              <span className="text-sm">Rhinology</span>
            </div>

            {/* Row 2 */}
            <div className="flex flex-col items-center p-4 border-2 border-[#E8E5F7] rounded-lg cursor-pointer hover:shadow-lg hover:scale-105 hover:border-[#3c00be] transition-all duration-300">
              <img src={Ophthalmology} alt="Ophthalmology" className="w-12 h-12 mb-2" />
              <span className="text-sm">Ophthalmology</span>
            </div>
            <div className="flex flex-col items-center p-4 border-2 border-[#E8E5F7] rounded-lg cursor-pointer hover:shadow-lg hover:scale-105 hover:border-[#3c00be] transition-all duration-300">
              <img
                src={GeneralPractitioner}
                alt="General Practitioner"
                className="w-12 h-12 mb-2"
              />
              <span className="text-sm">General Practitioner</span>
            </div>
            <div className="flex flex-col items-center p-4 border-2 border-[#E8E5F7] rounded-lg cursor-pointer hover:shadow-lg hover:scale-105 hover:border-[#3c00be] transition-all duration-300">
              <img src={Orthopedic} alt="Orthopedic" className="w-12 h-12 mb-2" />
              <span className="text-sm">Orthopedic</span>
            </div>
            <div className="flex flex-col items-center p-4 border-2 border-[#E8E5F7] rounded-lg cursor-pointer hover:shadow-lg hover:scale-105 hover:border-[#3c00be] transition-all duration-300">
              <img src={Hematologist} alt="Hematologist" className="w-12 h-12 mb-2" />
              <span className="text-sm">Hematologist</span>
            </div>
            <div className="flex flex-col items-center p-4 border-2 border-[#E8E5F7] rounded-lg cursor-pointer hover:shadow-lg hover:scale-105 hover:border-[#3c00be] transition-all duration-300">
              <img src={Anesthesia} alt="Anesthesia" className="w-12 h-12 mb-2" />
              <span className="text-sm">Anesthesia</span>
            </div>

            {/* Row 3 */}
            <div className="flex flex-col items-center p-4 border-2 border-[#E8E5F7] rounded-lg cursor-pointer hover:shadow-lg hover:scale-105 hover:border-[#3c00be] transition-all duration-300">
              <img src={Pulmonologist} alt="Pulmonologist" className="w-12 h-12 mb-2" />
              <span className="text-sm">Pulmonologist</span>
            </div>
            <div className="flex flex-col items-center p-4 border-2 border-[#E8E5F7] rounded-lg cursor-pointer hover:shadow-lg hover:scale-105 hover:border-[#3c00be] transition-all duration-300">
              <img src={Pathologist} alt="Pathologist" className="w-12 h-12 mb-2" />
              <span className="text-sm">Pathologist</span>
            </div>
            <div className="flex flex-col items-center p-4 border-2 border-[#E8E5F7] rounded-lg cursor-pointer hover:shadow-lg hover:scale-105 hover:border-[#3c00be] transition-all duration-300">
              <img src={Psychiatrist} alt="Psychiatrist" className="w-12 h-12 mb-2" />
              <span className="text-sm">Psychiatrist</span>
            </div>
            <div className="flex flex-col items-center p-4 border-2 border-[#E8E5F7] rounded-lg cursor-pointer hover:shadow-lg hover:scale-105 hover:border-[#3c00be] transition-all duration-300">
              <img src={Urologist} alt="Urologist" className="w-12 h-12 mb-2" />
              <span className="text-sm">Urologist</span>
            </div>
            <div className="flex flex-col items-center p-4 border-2 border-[#E8E5F7] rounded-lg cursor-pointer hover:shadow-lg hover:scale-105 hover:border-[#3c00be] transition-all duration-300">
              <img src={ClinicalGenetics} alt="Clinical Genetics" className="w-12 h-12 mb-2" />
              <span className="text-sm">Clinical Genetics</span>
            </div>

            {/* Row 4 */}
            <div className="flex flex-col items-center p-4 border-2 border-[#E8E5F7] rounded-lg cursor-pointer hover:shadow-lg hover:scale-105 hover:border-[#3c00be] transition-all duration-300">
              <img src={Rheumatologist} alt="Rheumatologist" className="w-12 h-12 mb-2" />
              <span className="text-sm">Rheumatologist</span>
            </div>
            <div className="flex flex-col items-center p-4 border-2 border-[#E8E5F7] rounded-lg cursor-pointer hover:shadow-lg hover:scale-105 hover:border-[#3c00be] transition-all duration-300">
              <img src={Nephrology} alt="Nephrology" className="w-12 h-12 mb-2" />
              <span className="text-sm">Nephrology</span>
            </div>
            <div className="flex flex-col items-center p-4 border-2 border-[#E8E5F7] rounded-lg cursor-pointer hover:shadow-lg hover:scale-105 hover:border-[#3c00be] transition-all duration-300">
              <img src={InfectionDisease} alt="Infection Disease" className="w-12 h-12 mb-2" />
              <span className="text-sm">Infection Disease</span>
            </div>
            <div className="flex flex-col items-center p-4 border-2 border-[#E8E5F7] rounded-lg cursor-pointer hover:shadow-lg hover:scale-105 hover:border-[#3c00be] transition-all duration-300">
              <img src={Gastrologist} alt="Gastrologist" className="w-12 h-12 mb-2" />
              <span className="text-sm">Gastrologist</span>
            </div>
            <div className="flex flex-col items-center p-4 border-2 border-[#E8E5F7] rounded-lg cursor-pointer hover:shadow-lg hover:scale-105 hover:border-[#3c00be] transition-all duration-300">
              <img src={DrugTherapy} alt="Drug Therapy" className="w-12 h-12 mb-2" />
              <span className="text-sm">Drug Therapy</span>
            </div>
          </div>

          <div className="">
            <Link to="/doctors">
              <button className="bg-[#362163] mt-6  py-6 px-20 text-white rounded-lg   shadow-[4px_3px_49px_9px_rgba(0,_0,_0,_0)] shadow-[#8C57FFA3]  transition-colors text-xl font-bold">
                BOOK AN APPOINTMENT
              </button>
            </Link>
          </div>

          <img src={decoLeft} className="absolute left-0 top-[90%] w-32" />
        </div>
      </div>
      <AboutUsHero />
      <div className="mb-6 max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-[20px] border border-[3px] border-[#03A9F4] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
          <div>
            <h3 className="text-[32px] font-bold text-[#111827]">Ready to get started ?</h3>
            <p className="text-[#111827] text-[20px] text-left mt-0.5">
              Your Health Our Priority....!
            </p>
          </div>
          <Link to="/doctors">
            <button className="bg-[#3c00be] hover:bg-[#3c00be] text-white px-10 py-4 rounded-[28px] text-[18px] tracking-wide font-medium transition-all duration-300 whitespace-nowrap ">
              CREATE APPOINTMENT NOW!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Specialization;
