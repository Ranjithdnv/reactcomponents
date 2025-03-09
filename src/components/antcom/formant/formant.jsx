import React, { Children, useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Tooltip,
  Checkbox,
  DatePicker,
  Radio,
  Modal,
  message,
} from "antd";
import { DownOutlined } from "@ant-design/icons"; // Import an icon

import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

import { MailOutlined } from "@ant-design/icons";
import { CalendarOutlined } from "@ant-design/icons";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Scrollbars from "react-custom-scrollbars-2";
import CustomDatePicker from "../../rancomponents/datewithcross/datecros";

const DynamicForm = ({
  openFormModal,
  fieldsSchema,
  ClassNameForInput,
  initialValues = {},
  ClassNameFromParent,
  children,
  setOpenFormModal,
}) => {
  const [form] = Form.useForm();

  const childrenArray = React.Children.toArray(children);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues]);

  const onFinish = (values) => {
    console.log("Form Submitted:", values);
  };
  const labelStyle = (label) => (
    <span style={{ color: "#16a34a", fontWeight: 600 }}>{label}</span>
  );
  const renderFormItem = (field, namePrefix = []) => {
    const { label, name, type, rules, options } = field;
    const fullName = [...namePrefix, name];

    switch (type) {
      case "text":
        return (
          <Form.Item
            key={name}
            label={labelStyle(label)}
            name={fullName}
            rules={rules}
            className="omg"
            shouldUpdate
            validateStatus="error"
            // help={
            //   <Tooltip title="Invalid input, please correct it!" color="red">
            //     <span style={{ color: "red" }}>Invalid input!</span>
            //   </Tooltip>
            // }
          >
            <Input className="  border-orange-500 focus:border-orange-700 focus:ring-blue-700" />
          </Form.Item>
        );
      case "password":
        return (
          <Form.Item
            className="omg"
            key={name}
            label={labelStyle(label)}
            name={fullName}
            rules={rules}
          >
            <Input.Password
              style={{
                borderColor: "orange",
              }}
              className={`rounded-md ${ClassNameForInput}`}
              onFocus={(e) => (e.target.style.borderColor = "green")}
              onBlur={(e) => (e.target.style.borderColor = "orange")}
              iconRender={(visible) =>
                visible ? (
                  <EyeOutlined style={{ color: "orange" }} /> // ✅ Green open eye
                ) : (
                  <EyeInvisibleOutlined style={{ color: "red" }} /> // ❌ Red closed eye
                )
              }
            />
          </Form.Item>
        );
      case "email":
        return (
          <Form.Item
            key={name}
            className="omg"
            label={labelStyle(label)}
            name={fullName}
            rules={[
              { type: "email", message: "Invalid email format" },
              ...(rules || []),
            ]}
          >
            <Input
              className={ClassNameForInput}
              prefix={<MailOutlined style={{ color: "orange" }} />} // ✅ Green email icon
            />
          </Form.Item>
        );

      case "checkbox":
        return (
          <Form.Item
            key={name}
            label={labelStyle(label)}
            name={fullName} // ✅ Ensure this matches your form structure
            valuePropName="checked"
            rules={[
              ...(rules || []),
              // {
              //   validator: (_, value) =>
              //     value
              //       ? Promise.resolve()
              //       : Promise.reject(new Error("You must accept the terms!")),
              // },
            ]}
            validateTrigger="onChange" // ✅ Ensures validation happens immediately
          >
            <Checkbox
              onChange={() => {
                // form.validateFields([fullName]); // ✅ Fix validation trigger
                console.log("Checkbox clicked");
              }}
            >
              Accept Terms
            </Checkbox>
          </Form.Item>

          // <Form.Item
          //   valuePropName="checked"
          //   label={labelStyle(label)}
          //   name={name}
          //   rules={[{ required: true, message: "You must accept the terms!" }]}
          //   validateTrigger="onBlur"
          // >
          //   <Checkbox />
          // </Form.Item>

          // <Form.Item
          //   name={name}
          //   valuePropName="checked"
          //   rules={[{ required: true, message: "You must accept the terms!" }]}
          //   help={
          //     <span className="text-red-500 text-sm">
          //       {form.getFieldError(name)?.[0]}
          //     </span>
          //   }
          //   validateStatus={form.getFieldError(name)?.length ? "error" : ""}
          // >
          //   <div className="h-full flex-col bg-black justify-center">
          //     {" "}
          //     <Checkbox>
          //       <span className="text-green-600 font-semibold">
          //         Accept Terms <span className="text-red-500">*</span>
          //       </span>
          //     </Checkbox>
          //     {rules?.[0]?.required && <span className="text-red-500"></span>}
          //   </div>
          // </Form.Item>
        );
      case "radio":
        return (
          <Form.Item
            key={name}
            label={labelStyle(label)}
            name={fullName}
            rules={rules}
          >
            <Radio.Group>
              {options?.map((opt) => (
                <Radio
                  key={opt.value}
                  value={opt.value}
                  className="custom-radio"
                >
                  {opt.label}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        );

      case "select":
        return (
          <Form.Item
            className="omg"
            key={name}
            label={labelStyle(label)}
            name={fullName}
            rules={rules}
          >
            <Select
              suffixIcon={<DownOutlined style={{ color: "orange" }} />}
              className="custom-select "
            >
              {options?.map((opt) => (
                <Select.Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        );
      case "date":
        return (
          //  --------------------------------------------------- DONT USE MORE OR PICKER FOR DATEPICKER ---------------------------------
          <Form.Item
            key={name}
            className="omg"
            label={labelStyle(label)}
            name={fullName}
            tooltip={{
              title: "click Year button and select year !",
              color: "red",
            }}
            rules={rules}
          >
            <DatePicker
              style={{ width: "100%" }}
              className="custom-datepicker"
              placeholder="Select Date"
              showToday={false}
              format="YYYY-MM-DD"
              //  renderExtraFooter={() => null} // Fix for deprecation
              suffixIcon={<CalendarOutlined style={{ color: "orange" }} />} // ✅ Add green calendar icon
            />
          </Form.Item>
        );
      case "list":
        return (
          <Form.List
            className="omg"
            key={name}
            label={labelStyle(label)}
            name={fullName}
          >
            {(fields, { add, remove }) => (
              // list will all place at one box if u convert fragment to div
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className="flex  gap-2 w-full">
                    <Form.Item
                      {...restField}
                      // if u add label big problem solve
                      label="item"
                      name={[name]}
                      className=" omg flex-grow mb-0"
                    >
                      <Input
                        placeholder={`${label} ${name + 1}`}
                        className="w-full"
                      />
                    </Form.Item>
                    <MinusCircleOutlined
                      className="text-red-500 cursor-pointer text-lg"
                      onClick={() => remove(name)}
                    />
                  </div>
                ))}
                <div className="flex flex-col items-center   ">
                  <div className="text-transparent  cursor-default text-base  ">
                    hh
                  </div>
                  <Button
                    type="default"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    className="w-full   custom-button"
                  >
                    Add {label}
                  </Button>
                </div>
              </>
            )}
          </Form.List>
        );
      default:
        return null;
    }
  };

  return (
    //  //                width desider       ----        103
    <div className="w-full p-8">
      <Modal
        title={<span style={{ color: "#4ade80" }}>Dynamic Form</span>}
        open={openFormModal}
        closable={() => setOpenFormModal(false)}
        onCancel={() => setOpenFormModal(false)}
        maskClosable={true}
        footer={null} // Hides default footer buttons
        width={700} // Adjust width as needed
      >
        {/* Scrollable content wrapper */}
        <Scrollbars
          className="flex justify-center"
          style={{ height: `calc(90vh - 150px)` }}
          autoHide
          autoHideTimeout={500}
          autoHideDuration={200}
          renderThumbVertical={({ style }) => (
            <div
              // className="!bg-brand"
              style={{
                ...style,
                backgroundColor: "orange", // scrollbarcolor
                opacity: 0.4,
                borderRadius: "8px",
                width: "4px",
                height: "40px",
              }}
            />
          )}
          renderTrackHorizontal={() => <div style={{ display: "none" }} />}
        >
          <div className="w-[95%]">
            <Form
              form={form}
              layout="vertical"
              scrollToFirstError
              onFinish={onFinish}
            >
              <div className={ClassNameFromParent}>
                {fieldsSchema.map((field) =>
                  renderFormItem(
                    field,
                    field.name.includes(".") ? field.name.split(".") : []
                  )
                )}
              </div>

              {/* Form Actions */}
              <div className="">
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                  <Button
                    style={{ marginLeft: 10 }}
                    onClick={() => form.resetFields()}
                  >
                    Reset
                  </Button>
                  <span
                    className="bg-transparent"
                    onClick={(e) => {
                      e.preventDefault();
                      children?.props?.onClick?.(e); // Call the original onClick if it exists
                    }}
                  >
                    {children}
                  </span>
                </Form.Item>
                <div className="m-2">{childrenArray[0]}</div>
              </div>
            </Form>
          </div>
        </Scrollbars>
      </Modal>
    </div>
  );
};

export default DynamicForm;
