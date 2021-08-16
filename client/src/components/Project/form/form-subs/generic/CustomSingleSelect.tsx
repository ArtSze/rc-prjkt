import React from 'react';
import Select, { OptionsType, ValueType } from 'react-select';
import { FieldProps } from 'formik';

interface IActiveOption {
    value: boolean;
    label: string;
}

interface CustomSelectProps extends FieldProps {
    options: OptionsType<IActiveOption>;
}

const CustomSingleSelect = ({ field, form, options, ...props }: CustomSelectProps) => {
    const onChange = (option: ValueType<IActiveOption, false>) => {
        form.setFieldValue(field.name, (option as IActiveOption).value);
    };

    const getValue = () => {
        if (!field.value) {
            return options[0];
        } else {
            options.find((option) => option.value === field.value);
        }
    };

    return <Select value={getValue()} onChange={onChange} options={options} />;
};

export default CustomSingleSelect;
