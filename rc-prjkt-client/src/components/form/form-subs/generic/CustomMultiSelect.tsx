import React from 'react';
import Select, { OptionsType, OptionTypeBase, ValueType } from 'react-select';
import { FieldProps } from 'formik';
import {
    UserControl,
    Menu,
    Placeholder,
    UserMultiValueLabel,
    Option,
    multiStyles,
} from '../../../select/SelectComponents';
import { ObjectId } from 'mongoose';

export interface IUserFromClient {
    _id: ObjectId;
    rcId: number;
    image_path: string;
    first_name: string;
    last_name: string;
}

export interface ICollabOption {
    label: string;
    value: IUserFromClient;
}

interface CustomSelectProps extends FieldProps {
    options: OptionsType<ICollabOption>;
    initSelections?: OptionsType<ICollabOption>;
    isMulti?: boolean;
    placeholder?: string;
}

const CustomMultiSelect = ({
    placeholder,
    field,
    form,
    options,
    isMulti = true,
    initSelections,
}: CustomSelectProps): JSX.Element => {
    const onChange = (option: ValueType<ICollabOption, true>) => {
        form.setFieldValue(
            field.name,
            (option as ICollabOption[]).map((item: ICollabOption) => item.value),
        );
    };

    const getValue = () => {
        if (!field.value) {
            return isMulti ? [] : ('' as unknown as OptionTypeBase);
        }
    };

    return (
        <Select
            components={{ Control: UserControl, Menu, MultiValueLabel: UserMultiValueLabel, Placeholder, Option }}
            name={field.name}
            defaultValue={initSelections}
            value={field.value ? initSelections : getValue()}
            onChange={onChange}
            placeholder={placeholder}
            options={options}
            isMulti={isMulti}
            styles={multiStyles}
            isOptionSelected={(option) => {
                const valIds = field.value.map((val: IUserFromClient) => val._id);
                return valIds.includes(option.value._id);
            }}
            hideSelectedOptions={true}
        />
    );
};

export default CustomMultiSelect;
