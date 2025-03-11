import React, { useState } from "react";
import { Input, Checkbox, Radio, DatePicker, Select, List, Button } from "antd";
import {
  LockOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import "../main.scss";

const { Option } = Select;

const CompetitionForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    dateOfBirth: null,
    competitionCategory: "",
    agreeTerms: false,
    preferredMode: "",
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className=" mt-56">
      <div className="competition-form ">
        <h2>CSS Coding Tournament Registration</h2>

        {/* Username */}
        <Input
          prefix={<UserOutlined />}
          placeholder="Enter your username"
          className="custom-input"
          onChange={(e) => handleChange("username", e.target.value)}
        />

        {/* Password */}
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Enter your password"
          className="custom-input"
          onChange={(e) => handleChange("password", e.target.value)}
        />

        {/* Date Picker */}
        <DatePicker
          placeholder="Select Date of Birth"
          className="custom-input"
          onChange={(date) => handleChange("dateOfBirth", date)}
        />

        {/* Select Competition Category */}
        <Select
          placeholder="Select Competition Category"
          className="custom-input"
          onChange={(value) => handleChange("competitionCategory", value)}
        >
          <Option value="beginner">Beginner</Option>
          <Option value="intermediate">Intermediate</Option>
          <Option value="advanced">Advanced</Option>
        </Select>

        {/* Radio Button for Preferred Mode */}
        <Radio.Group
          onChange={(e) => handleChange("preferredMode", e.target.value)}
          className="custom-radio"
        >
          <Radio value="online">Online</Radio>
          <Radio value="offline">Offline</Radio>
        </Radio.Group>

        {/* Checkbox for Terms Agreement */}
        <Checkbox
          checked={formData.agreeTerms}
          onChange={(e) => handleChange("agreeTerms", e.target.checked)}
          className="custom-checkbox"
        >
          I agree to the terms & conditions
        </Checkbox>

        {/* Submit Button */}
        <Button type="primary" className="submit-btn">
          Register Now
        </Button>

        {/* Competition Perks List */}
        <List
          className="custom-list"
          header={<strong>What You'll Get</strong>}
          bordered
          dataSource={[
            "Exclusive CSS Challenges",
            "Win Prizes",
            "Certificate of Participation",
          ]}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </div>
    </div>
  );
};

export default CompetitionForm;
