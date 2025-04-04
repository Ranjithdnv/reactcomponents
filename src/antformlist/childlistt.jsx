// import React from "react";
// import {
//   Form,
//   Select,
//   DatePicker,
//   Button,
//   Input,
//   message,
//   Row,
//   Col,
// } from "antd";
// import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

// const { Option } = Select;

// const ReusableFormList = ({
//   formFields,
//   form,
//   optionsData,
//   listName,
//   onSubmit,
// }) => {
//   // const [form] = Form.useForm();

//   const handleDependencyChange = (index, fieldName, value) => {
//     if (fieldName === "surgeryType") {
//       form.setFieldsValue({
//         [listName]: form
//           .getFieldValue(listName)
//           .map((item, i) =>
//             i === index ? { ...item, suggestedDoctor: undefined } : item
//           ),
//       });
//     }
//   };

//   // const validateAndAdd = async (add, fields, listName) => {
//   //   if (fields.length === 0) {
//   //     add();
//   //     return;
//   //   }

//   //   try {
//   //     await form.validateFields(
//   //       fields
//   //         .map(({ name }) => [
//   //           [listName, name, "surgeryType"],
//   //           [listName, name, "suggestedDoctor"],
//   //           [listName, name, "date"],
//   //         ])
//   //         .flat()
//   //     );
//   //     add();
//   //   } catch (error) {
//   //     message.error(
//   //       "Please fill all required fields before adding a new entry."
//   //     );
//   //   }
//   // };

//   const validateAndAdd = async (add, fields, listName) => {
//     if (fields.length === 0) {
//       add();
//       return;
//     }

//     // Get all field values
//     const listValues = form.getFieldValue(listName) || [];

//     // Check if any field is empty in the last added entry
//     const hasEmptyField = listValues.some((entry, index) => {
//       return formFields.some((field) => {
//         // Skip validation for non-required fields
//         if (!field.required) return false;
//         return !entry[field.name]; // Check if field is empty
//       });
//     });

//     if (hasEmptyField) {
//       message.error(
//         "Please fill all required fields before adding a new entry."
//       );
//       return;
//     }

//     try {
//       await form.validateFields(); // Validate entire form
//       add();
//     } catch (error) {
//       message.error("Please correct the errors before adding a new entry.");
//     }
//   };

//   const handleFormSubmit = async () => {
//     try {
//       const values = await form.validateFields();
//       onSubmit(values); // Send data to parent component
//     } catch (error) {
//       message.error("Please correct the errors before submitting.");
//     }
//   };

//   return (
//     <Form
//       form={form}
//       layout="vertical"
//       autoComplete="off"
//       initialValues={{ [listName]: [{}] }}
//       onFinish={handleFormSubmit} // Trigger submission
//     >
//       <Form.List name={listName}>
//         {(fields, { add, remove }) => (
//           <div>
//             {fields.map(({ key, name, ...restField }) => (
//               <Row gutter={[16, 16]} key={key}>
//                 {formFields.map((field) => (
//                   <Col xs={24} sm={8} key={field.name}>
//                     <Form.Item
//                       {...restField}
//                       name={[name, field.name]}
//                       label={field.label}
//                       labelCol={{ span: 16 }}
//                       wrapperCol={{ span: 24 }}
//                       rules={
//                         field.required
//                           ? [
//                               {
//                                 required: true,
//                                 message: `Please enter ${field.label}`,
//                               },
//                             ]
//                           : []
//                       }
//                     >
//                       {field.type === "input" && (
//                         <Input
//                           placeholder={`Enter ${field.label}`}
//                           disabled={
//                             field.dependsOn &&
//                             !form.getFieldValue([
//                               listName,
//                               name,
//                               field.dependsOn,
//                             ])
//                           }
//                         />
//                       )}

//                       {field.type === "select" && (
//                         <Select
//                           placeholder={`Select ${field.label}`}
//                           onChange={(value) =>
//                             handleDependencyChange(name, field.name, value)
//                           }
//                           disabled={
//                             field.dependsOn &&
//                             !form.getFieldValue([
//                               listName,
//                               name,
//                               field.dependsOn,
//                             ])
//                           }
//                         >
//                           {(
//                             optionsData[field.name]?.(
//                               form.getFieldValue([
//                                 listName,
//                                 name,
//                                 field.dependsOn,
//                               ])
//                             ) || []
//                           ).map((option) => (
//                             <Option key={option.value} value={option.value}>
//                               {option.label}
//                             </Option>
//                           ))}
//                         </Select>
//                       )}

//                       {field.type === "date" && (
//                         <DatePicker
//                           style={{ width: "100%" }}
//                           disabled={
//                             field.dependsOn &&
//                             !form.getFieldValue([
//                               listName,
//                               name,
//                               field.dependsOn,
//                             ])
//                           }
//                         />
//                       )}
//                     </Form.Item>
//                   </Col>
//                 ))}

//                 <Col xs={24} sm={1}>
//                   <MinusCircleOutlined
//                     style={{
//                       fontSize: "20px",
//                       color: "red",
//                       cursor: "pointer",
//                     }}
//                     onClick={() => remove(name)}
//                   />
//                 </Col>
//               </Row>
//             ))}
//             <Button
//               type="dashed"
//               onClick={() => validateAndAdd(add, fields, listName)}
//               icon={<PlusCircleOutlined />}
//               style={{ marginTop: "8px" }}
//             >
//               Add Entry
//             </Button>
//           </div>
//         )}
//       </Form.List>
//       {/* <Button type="primary" htmlType="submit" style={{ marginTop: "16px" }}>
//         Submit
//       </Button> */}
//     </Form>
//   );
// };

// export default ReusableFormList;
import React from "react";
import {
  Form,
  Select,
  DatePicker,
  Button,
  Input,
  InputNumber,
  message,
  Row,
  Col,
} from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

const ReusableFormList = ({
  formFields,
  form,
  optionsData,
  listName,
  onSubmit,
}) => {
  const handleDependencyChange = (index, fieldName, value) => {
    if (fieldName === "surgeryType") {
      form.setFieldsValue({
        [listName]: form
          .getFieldValue(listName)
          .map((item, i) =>
            i === index ? { ...item, suggestedDoctor: undefined } : item
          ),
      });
    }
  };
  const validateAndAdd = async (add, fields, listName) => {
    if (fields.length === 0) {
      add();
      return;
    }

    const listValues = form.getFieldValue(listName) || [];

    const hasEmptyField = listValues.some((entry) => {
      if (!entry || typeof entry !== "object") return true; // <-- Fix here

      return formFields.some((field) => {
        if (!field.required) return false;
        return !entry[field.name]; // safe now
      });
    });

    if (hasEmptyField) {
      message.error(
        "Please fill all required fields before adding a new entry."
      );
      return;
    }

    try {
      // await form.validateFields();
      add();
    } catch (error) {
      message.error("Please correct the errors before adding a new entry.");
    }
  };

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values); // Send data to parent component
    } catch (error) {
      message.error("Please correct the errors before submitting.");
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      autoComplete="off"
      initialValues={{ [listName]: [{}] }}
      onFinish={handleFormSubmit}
    >
      <Form.List name={listName}>
        {(fields, { add, remove }) => (
          <div>
            {fields.map(({ key, name, ...restField }) => (
              <Row gutter={[24, 24]} key={key}>
                {formFields.map((field) => (
                  <Col
                    xs={24}
                    sm={field.sm || 6}
                    //  sm={field.type === "input" ? 12 : 6} // Increase span if it's a select field
                    key={field.name}
                  >
                    <Form.Item
                      shouldUpdate={(prevValues, currentValues) =>
                        prevValues !== currentValues
                      }
                      noStyle
                    >
                      {() => {
                        const currentList = form.getFieldValue(listName) || [];
                        const currentItem = currentList[name] || {};

                        const isDisabled =
                          field.dependsOn && !currentItem[field.dependsOn];

                        return (
                          <Form.Item
                            {...restField}
                            name={[name, field.name]}
                            label={field.label}
                            rules={
                              field.required
                                ? [
                                    {
                                      required: true,
                                      message: `Please enter ${field.label}`,
                                    },
                                  ]
                                : []
                            }
                          >
                            {field.type === "input" && (
                              <Input
                                placeholder={`Enter ${field.label}`}
                                disabled={isDisabled}
                              />
                            )}
                            {field.type === "number" && (
                              <InputNumber
                                style={{ width: "100%" }}
                                placeholder={`Enter ${field.label}`}
                                disabled={isDisabled}
                              />
                            )}
                            {field.type === "select" && (
                              <Select
                                placeholder={`Select ${field.label}`}
                                onChange={(value) =>
                                  handleDependencyChange(
                                    name,
                                    field.name,
                                    value
                                  )
                                }
                                disabled={isDisabled}
                              >
                                {(
                                  optionsData[field.name]?.(
                                    currentItem[field.dependsOn]
                                  ) || []
                                ).map((option) => (
                                  <Option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </Option>
                                ))}
                              </Select>
                            )}
                            {field.type === "date" && (
                              <DatePicker
                                style={{ width: "100%" }}
                                disabled={isDisabled}
                              />
                            )}
                          </Form.Item>
                        );
                      }}
                    </Form.Item>
                  </Col>
                ))}

                <Col xs={24} sm={1}>
                  <div className=" flex h-full items-center">
                    {" "}
                    <MinusCircleOutlined
                      style={{
                        fontSize: "20px",
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={() => remove(name)}
                    />
                  </div>
                </Col>
              </Row>
            ))}

            <Button
              type="dashed"
              onClick={() => validateAndAdd(add, fields, listName)}
              icon={<PlusCircleOutlined />}
              style={{ marginTop: "8px" }}
            >
              Add Entry
            </Button>
          </div>
        )}
      </Form.List>
    </Form>
  );
};

export default ReusableFormList;
