import React from 'react';
import Select from 'react-select';
import { useStore, AppState } from '../../utils/store';
import useTags from '../../hooks/useTags';
import { TTagFilter } from './Filter';
import { ITag, ITagOptions } from '../../types';
import { Grid, Typography } from '@material-ui/core';
import { TagControl, Menu, Placeholder, TagMultiValueLabel, multiStyles } from '../select/SelectComponents';

const TagFilter = (): JSX.Element => {
    const setTagFilter = useStore((state: AppState) => state.setTagFilter);
    const tagFilter = useStore((state: AppState) => state.tagFilter);

    const { data: tags, isSuccess } = useTags();

    const handleChange = (selectFilter: ITagOptions) => {
        const tags: TTagFilter = selectFilter.map((tagOption) => tagOption.value.value);
        // set tags to undefined if there are no tags to filter by
        tags.length > 0 ? setTagFilter(tags) : setTagFilter(undefined);
    };

    if (isSuccess && tags) {
        const options: ITagOptions = tags.map((tag: ITag) => {
            return {
                value: tag,
                label: tag.value,
            };
        });

        const getValue = () => {
            return options.filter((t) => tagFilter?.includes(t.value.value));
        };

        return (
            <Grid item xs={12} sm={6} md={8}>
                <Typography variant="subtitle2">Tag Filter</Typography>
                <Select
                    value={getValue()}
                    components={{ Control: TagControl, Menu, MultiValueLabel: TagMultiValueLabel, Placeholder }}
                    options={options}
                    name="tag-filter"
                    onChange={(e) => handleChange(e as ITagOptions)}
                    placeholder="Select tags..."
                    isMulti
                    isClearable
                    isSearchable
                    styles={multiStyles}
                />
            </Grid>
        );
    }

    return (
        <Grid item xs={12} sm={6} md={8}>
            <Typography variant="subtitle2">Tag Filter</Typography>
            <Select
                components={{ Control: TagControl, Menu, MultiValueLabel: TagMultiValueLabel, Placeholder }}
                name="tag-filter"
                placeholder="Select tags..."
                isMulti
                isClearable
                isSearchable
                styles={multiStyles}
            />
        </Grid>
    );
};

export default TagFilter;
