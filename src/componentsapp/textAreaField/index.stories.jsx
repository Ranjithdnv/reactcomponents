import React, { useState } from 'react';

import TextAreaField from '.';
import { HiAtSymbol } from "react-icons/hi2";


export default {
    title: 'Atomic Design/molecules/TextAreaField',
    component: TextAreaField,
};

const Template = (args) => {
    const [value, setValue] = useState("");

    return <TextAreaField {...args} value={value} onChange={(e) => setValue(e.target.value)} />
};


export const Default = Template.bind({});
Default.args = {
    label: "Address",
    placeholder: "Enter the input",
    name: "address",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
    label: "Address",
    placeholder: "Enter the input",
    name: "address",
    icon: <HiAtSymbol className='h-5 w-5 fill-gray-500' />
};

