import React, { useState } from "react";
import UserForm from "../../formvalidations/form";
import calculate from "../../../util/date";

const Parentform = () => {
  const [data, setData] = useState({});
  const datarecievefromForm = (value) => {
    setData(value);
    const newdata = { ...data, age: calculate("age", "1992-01-30") };
    console.log(newdata);
  };

  console.log(data);
  return (
    <div>
      <UserForm search={datarecievefromForm}></UserForm>
    </div>
  );
};

export default Parentform;
