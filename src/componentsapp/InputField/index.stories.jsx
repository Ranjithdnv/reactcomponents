import React, { useState } from 'react';

import InputField from '.';
import { HiAtSymbol } from "react-icons/hi2";


export default {
    title: 'Atomic Design/molecules/InputField',
    component: InputField,
};

const Template = (args) => {
    const [value, setValue] = useState("");

    return <InputField {...args} value={value} onChange={(e) => setValue(e.target.value)} />
};


export const Default = Template.bind({});
Default.args = {
    label: "Username",
    placeholder: "Enter the input",
    name: "name",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
    label: "Username",
    placeholder: "Enter the input",
    name: "name",
    icon: <HiAtSymbol className='h-5 w-5 fill-gray-500' />
};

