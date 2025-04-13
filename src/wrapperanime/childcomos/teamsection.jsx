// components/TeamSection.jsx
import React from "react";
import MotionItem from "../wrapperanime";

const teamMembers = [
  { name: "Alice", role: "Frontend Developer" },
  { name: "Bob", role: "Backend Engineer" },
  { name: "Charlie", role: "UI/UX Designer" },
  { name: "Alice", role: "Frontend Developer" },
  { name: "Bob", role: "Backend Engineer" },
  { name: "Charlie", role: "UI/UX Designer" },
  { name: "Alice", role: "Frontend Developer" },
  { name: "Bob", role: "Backend Engineer" },
  { name: "Charlie", role: "UI/UX Designer" },
  { name: "Alice", role: "Frontend Developer" },
  { name: "Bob", role: "Backend Engineer" },
  { name: "Charlie", role: "UI/UX Designer" },
  { name: "Alice", role: "Frontend Developer" },
  { name: "Bob", role: "Backend Engineer" },
  { name: "Charlie", role: "UI/UX Designer" },
  { name: "Alice", role: "Frontend Developer" },
  { name: "Bob", role: "Backend Engineer" },
  { name: "Charlie", role: "UI/UX Designer" },
  { name: "Alice", role: "Frontend Developer" },
  { name: "Bob", role: "Backend Engineer" },
  { name: "Charlie", role: "UI/UX Designer" },
  { name: "Alice", role: "Frontend Developer" },
  { name: "Bob", role: "Backend Engineer" },
  { name: "Charlie", role: "UI/UX Designer" },
  { name: "Alice", role: "Frontend Developer" },
  { name: "Bob", role: "Backend Engineer" },
  { name: "Charlie", role: "UI/UX Designer" },
  { name: "Alice", role: "Frontend Developer" },
  { name: "Bob", role: "Backend Engineer" },
  { name: "Charlie", role: "UI/UX Designer" },
  { name: "Alice", role: "Frontend Developer" },
  { name: "Bob", role: "Backend Engineer" },
  { name: "Charlie", role: "UI/UX Designer" },
  { name: "Alice", role: "Frontend Developer" },
  { name: "Bob", role: "Backend Engineer" },
  { name: "Charlie", role: "UI/UX Designer" },
];

const TeamSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <MotionItem animation="fadeIn">
        <h2 className="text-3xl font-bold text-center mb-10">Meet Our Team</h2>
      </MotionItem>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <MotionItem key={index} animation="slideLeft" delay={index * 0}>
            <MotionItem key={index} animation="slideUp" delay={index * 0}>
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>{" "}
            </MotionItem>
            <img
              src="https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Colorful Flower"
              className="w-full h-54 object-cover rounded-md mb-4"
            />
          </MotionItem>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <MotionItem key={index} animation="flipY" delay={index * 0}>
            <MotionItem key={index} animation="slideUp" delay={index * 0}>
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>{" "}
            </MotionItem>
            <img
              src="https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Colorful Flower"
              className="w-full h-54 object-cover rounded-md mb-4"
            />
          </MotionItem>
        ))}
      </div>{" "}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div>
            {" "}
            <MotionItem key={index} animation="flipX" delay={index * 0}>
              <MotionItem key={index} animation="slideUp" delay={index * 0}>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>{" "}
              </MotionItem>
              <img
                src="https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Colorful Flower"
                className="w-full h-54 object-cover rounded-md mb-4"
              />
            </MotionItem>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div>
            {" "}
            <MotionItem key={index} animation="rotateXY180" delay={index * 0}>
              <MotionItem key={index} animation="slideUp" delay={index * 0}>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              </MotionItem>
              <img
                src="https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Colorful Flower"
                className="w-full h-54 object-cover rounded-md mb-4"
              />
            </MotionItem>
          </div>
        ))}
      </div>{" "}
      <div className="grid grid-cols-1 mt-14 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div>
            {" "}
            <MotionItem key={index} animation="hueRotate" delay={index * 0}>
              <MotionItem key={index} animation="slideUp" delay={index * 0}>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              </MotionItem>
              <img
                src="https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Colorful Flower"
                className="w-full h-54 object-cover rounded-md mb-4"
              />
            </MotionItem>
          </div>
        ))}
      </div>{" "}
      <div className="grid grid-cols-1 mt-14 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div>
            {" "}
            <MotionItem key={index} animation="scaleIn" delay={index * 0.04}>
              <MotionItem key={index} animation="slideUp" delay={index * 0}>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              </MotionItem>
              <img
                src="https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Colorful Flower"
                className="w-full h-54 object-cover rounded-md mb-4"
              />
              <p className="text-gray-600">{member.role}</p>
            </MotionItem>
          </div>
        ))}
      </div>{" "}
    </div>
  );
};

export default TeamSection;
