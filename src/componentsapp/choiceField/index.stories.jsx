import React, { useState } from 'react';

import ChoiceField from '.';


export default {
    title: 'Atomic Design/molecules/ChoiceField',
    component: ChoiceField,
};

const Template = (args) => {
    const [value, setValue] = useState("");

    return <ChoiceField {...args} value={value} onChange={(e) => setValue(e.target.value)} />
};


export const Default = Template.bind({});
Default.args = {
    label: "Gender",
    name: "gender",
    options: [
        {
            label: "Choose a option",
            value: ""
        },

        {
            label: "Male",
            value: "male"
        },

        {
            label: "Female",
            value: "female"
        },

        {
            label: "Prefer not to say",
            value: "Prefer not to say"
        },
    ]
};
