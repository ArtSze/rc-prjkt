import React, { useState } from 'react';
import { OptionsType, OptionTypeBase, ValueType } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { FieldProps } from 'formik';
import { TagControl, Menu, Placeholder, TagMultiValueLabel, multiStyles } from '../../../select/SelectComponents';
import { ObjectId } from 'mongoose';

export interface ITagFromClient {
    _id?: ObjectId;
    value: string;
}

export interface ITagOption {
    label: string;
    value: ITagFromClient;
}

export interface CustomSelectProps extends FieldProps {
    options: OptionsType<ITagOption>;
    initSelections?: OptionsType<ITagOption>;
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
    const [creatableOptions, setCreatableOptions] = useState(options);

    const onChange = (option: ValueType<ITagOption | ITagOption[], true>) => {
        form.setFieldValue(
            field.name,
            (option as ITagOption[]).map((item: ITagOption) => item.value),
        );
    };

    const onCreateOption = (string: string) => {
        const newValue = {
            label: string,
            value: {
                value: string,
            },
        };
        setCreatableOptions([...creatableOptions, newValue]);
        form.setFieldValue(field.name, [...field.value, newValue.value]);
    };

    const getValue = () => {
        if (!field.value) {
            return isMulti ? [] : ('' as unknown as OptionTypeBase);
        }
    };

    return (
        <CreatableSelect
            components={{ Control: TagControl, Menu, MultiValueLabel: TagMultiValueLabel, Placeholder }}
            name={field.name}
            defaultValue={initSelections}
            value={field.value ? initSelections : getValue()}
            onChange={onChange}
            onCreateOption={onCreateOption}
            placeholder={placeholder}
            options={creatableOptions}
            isMulti={isMulti}
            isClearable
            styles={multiStyles}
            hideSelectedOptions={true}
            isOptionSelected={(option) => {
                const valIds = field.value.map((val: ITagFromClient) => val._id);
                return valIds.includes(option.value._id);
            }}
        />
    );
};

export default CustomMultiSelect;
