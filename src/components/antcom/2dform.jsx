import React, { useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Checkbox,
  DatePicker,
  Radio,
  Modal,
} from "antd";
import {
  DownOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  MailOutlined,
  CalendarOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  CloseOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import Scrollbars from "react-custom-scrollbars-2";
import UnifiedComponent from "../rancomponents/higherorder/allinputs";

const DynamicForm = ({
  openFormModal,
  modalTop = 100,
  modalWidth = 700,
  scrollheight = "50vh",
  fieldsSchema,
  centered = false,
  ClassNameForInput,
  initialValues = {},
  ClassNameFromParent,
  children,
  setOpenFormModal,
}) => {
  const [form] = Form.useForm();
  const onFinishFailed = ({ errorFields }) => {
    if (errorFields.length > 0) {
      const firstErrorField = document.querySelector(
        `[name="${errorFields[0].name.join(".")}"]`
      );

      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const selectedDate = form.getFieldValue(name);
  const isValidDate = selectedDate && moment(selectedDate).isValid();
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues]);

  const onFinish = (values) => console.log("Form Submitted:", values);

  const labelStyle = (label) => (
    <span style={{ color: "#16a34a", fontWeight: 600 }}>{label}</span>
  );

  const renderFormItem = (field, namePrefix = []) => {
    const { label, name, type, rules, options } = field;
    const fullName = [...namePrefix, name];

    const formItemProps = {
      key: name,
      label: labelStyle(label),
      name: fullName,
      rules,
    };

    switch (type) {
      case "text":
        return (
          <Form.Item {...formItemProps}>
            <UnifiedComponent
              placeholder="Enter your name..."
              required={false}
              type="input"
            />
          </Form.Item>
        );
      case "password":
        return (
          <Form.Item {...formItemProps}>
            <Input.Password
              className={`rounded-md ${ClassNameForInput}`}
              iconRender={(visible) =>
                visible ? (
                  <EyeOutlined style={{ color: "orange" }} />
                ) : (
                  <EyeInvisibleOutlined style={{ color: "red" }} />
                )
              }
            />
          </Form.Item>
        );
      case "email":
        return (
          <Form.Item
            {...formItemProps}
            rules={[{ type: "email" }, ...(rules || [])]}
          >
            <Input
              className={ClassNameForInput}
              prefix={<MailOutlined style={{ color: "orange" }} />}
            />
          </Form.Item>
        );
      case "checkbox":
        return (
          <Form.Item
            {...formItemProps}
            valuePropName="checked"
            validateTrigger="onChange"
            shouldUpdate
          >
            <Checkbox
              onChange={() => {
                form.validateFields([fullName]); // ✅ Fix validation trigger
                console.log("Checkbox clicked");
              }}
            />
          </Form.Item>
        );
      case "radio":
        return (
          <Form.Item {...formItemProps}>
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
          <Form.Item {...formItemProps}>
            <UnifiedComponent
              type="select"
              mode="multiple"
              // value={selectedOptions}
              itemsClassname="text-blue-500 border-blue-500"
              xIconClassname="!text-red-500 !text-base"
              options={options}
            />
          </Form.Item>
        );
      case "date":
        return (
          <Form.Item
            {...formItemProps}
            tooltip={{
              title: "Click Year button and select year!",
              color: "red",
            }}
          >
            <DatePicker
              style={{ width: "100%", position: "relative" }}
              className="custom-datepicker"
              placeholder="Select Date"
              showToday={false}
              format="YYYY-MM-DD"
              allowClear
              suffixIcon={
                <CalendarOutlined className="text-orange-500 hover:hidden pointer-events-none" />
              }
              onChange={(date) => {
                if (!date) {
                  form.setFieldsValue({ [name]: null });
                }
              }}
            />
          </Form.Item>
        );
      case "list":
        return (
          <Form.List key={name} name={fullName}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className="flex gap-2 w-full">
                    <Form.Item
                      {...restField}
                      label="Item"
                      name={[name]}
                      className="flex-grow mb-0"
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
                    // hh //{" "}
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
    <div className="w-full p-8 custom-scrollbar">
      <Modal
        title={<span style={{ color: "#4ade80" }}>Dynamic Form</span>}
        open={openFormModal}
        onCancel={() => setOpenFormModal(false)}
        maskClosable={true}
        footer={null}
        width={modalWidth}
        style={{ top: modalTop }}
        centered={centered}
        closeIcon={
          <CloseOutlined
            className="text-orange-400 text-lg transition-transform duration-300 ease-in-out hover:rotate-180"
            style={{ color: "orange" }}
          />
        }
      >
        <Scrollbars
          className="flex justify-center custom-scrollbar"
          style={{ height: scrollheight }}
          autoHide
          autoHideTimeout={500}
          autoHideDuration={200}
          renderThumbVertical={({ style }) => (
            <div
              // className="!bg-brand"
              style={{
                ...style,
                backgroundColor: "red", // scrollbarcolor
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
              onFinishFailed={onFinishFailed}
            >
              <div className={ClassNameFromParent}>
                {fieldsSchema.map((field) =>
                  renderFormItem(
                    field,
                    field.name.includes(".") ? field.name.split(".") : []
                  )
                )}
              </div>
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
              </Form.Item>
              {children && <div className="m-2">{children}</div>}
            </Form>
          </div>
        </Scrollbars>
      </Modal>
    </div>
  );
};

export default DynamicForm;
