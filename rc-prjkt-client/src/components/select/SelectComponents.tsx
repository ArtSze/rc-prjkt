/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { Avatar, Hidden, Typography } from '@material-ui/core';
import { components, OptionTypeBase, StylesConfig } from 'react-select';
import { FaUser, FaTag, FaTags } from 'react-icons/fa';
import { MdSort } from 'react-icons/md';

export const Option = (props: any): JSX.Element => {
    const style = {
        display: 'flex',
        alignItems: 'center',
    };
    return (
        <components.Option {...props}>
            <div style={style}>
                <Avatar
                    alt={props.label}
                    src={props.value.image_path}
                    variant="circle"
                    style={{
                        width: '24px',
                        height: '24px',
                        marginLeft: '2px',
                        marginRight: '5px',
                    }}
                />
                <Typography variant="body2">{props.children}</Typography>
            </div>
        </components.Option>
    );
};

export const Menu = (props: any): JSX.Element => {
    return (
        <components.Menu {...props}>
            <Typography variant="body2">{props.children}</Typography>
        </components.Menu>
    );
};

export const SingleValue = (props: any): JSX.Element => {
    return (
        <components.SingleValue {...props}>
            <Typography variant="body2">{props.children}</Typography>
        </components.SingleValue>
    );
};

export const Placeholder = (props: any): JSX.Element => {
    return (
        <components.Placeholder {...props}>
            <Typography variant="body2">{props.selectProps.placeholder}</Typography>
        </components.Placeholder>
    );
};

export const SortControl = (props: any): JSX.Element => {
    const style = { height: '16px', alignSelf: 'center', marginLeft: '10px', cursor: 'pointer' };
    return (
        <components.Control {...props}>
            <span style={style}>
                <MdSort />
            </span>
            {props.children}
        </components.Control>
    );
};

export const UserControl = (props: any): JSX.Element => {
    const style = {
        height: '16px',
        alignSelf: 'center',
        marginLeft: '10px',
        cursor: 'pointer',
    };
    return (
        <components.Control {...props}>
            <Hidden xsDown>
                <span style={style}>
                    <FaUser />
                </span>
            </Hidden>
            {props.children}
        </components.Control>
    );
};

export const TagControl = (props: any): JSX.Element => {
    const style = { height: '16px', alignSelf: 'center', marginLeft: '10px', cursor: 'pointer' };
    return (
        <components.Control {...props}>
            <Hidden xsDown>
                <span style={style}>
                    <FaTags />
                </span>
            </Hidden>
            {props.children}
        </components.Control>
    );
};

export const UserSingleValue = (props: any): JSX.Element => {
    const style = {
        margin: '3px',
        padding: '3px',
        borderRadius: '16px',
        backgroundColor: 'rgb(230, 230, 230)',
        display: 'flex',
        alignItems: 'center',
    };
    return (
        <components.SingleValue {...props}>
            <div style={style}>
                <Avatar
                    alt={props.data.value.first_name}
                    src={props.data.value.image_path}
                    variant="circle"
                    style={{
                        width: '24px',
                        height: '24px',
                        marginLeft: '2px',
                        marginRight: '3px',
                    }}
                />
                <Typography style={{ marginRight: '5px', padding: '1px' }} variant="body2">
                    {props.children}
                </Typography>
            </div>
        </components.SingleValue>
    );
};
export const UserMultiValueLabel = (props: any): JSX.Element => {
    const style = {
        display: 'flex',
        alignItems: 'center',
    };
    return (
        <components.MultiValueLabel {...props}>
            <div style={style}>
                <Avatar
                    alt={props.data.value.first_name}
                    src={props.data.value.image_path}
                    variant="circle"
                    style={{
                        width: '24px',
                        height: '24px',
                        marginLeft: '2px',
                        marginRight: '3px',
                    }}
                />
                <Typography style={{ padding: '1px' }} variant="body2">
                    {props.data.label}
                </Typography>
            </div>
        </components.MultiValueLabel>
    );
};

export const TagMultiValueLabel = (props: any): JSX.Element => {
    const style = {
        display: 'flex',
        alignItems: 'center',
    };
    return (
        <components.MultiValueLabel {...props}>
            <div style={style}>
                <FaTag style={{ padding: '1px', marginLeft: '2px', marginRight: '5px' }} />
                <Typography style={{ padding: '1px' }} variant="body2">
                    {props.data.label}
                </Typography>
            </div>
        </components.MultiValueLabel>
    );
};

export const multiStyles: StylesConfig<OptionTypeBase, boolean> = {
    multiValue: (styles) => ({ ...styles, borderRadius: '16px' }),
    multiValueRemove: (styles) => ({ ...styles, borderBottomRightRadius: '16px', borderTopRightRadius: '16px' }),
};
