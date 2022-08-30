import '../css/GenreFilter.css';
import { useState } from 'react';
import Select from 'react-select';

export default function GenreFilter(props) {
    
    const customStyles = {
        input: (provided) => ({
            ...provided,
            color: 'white'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? 'red' : 'darkred',
            padding: 5
        }),
        control: (provided) => ({
            ...provided,
            backgroundColor: 'darkred',
            border: 'darkred',
            borderRadius: '20px 20px 20px 20px'
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'darkred'
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#4b4e5a',
            borderRadius: '10px 10px 10px 10px'
        }),
        multiValueLabel: (styles) => ({
            ...styles,
            color: 'white'
        })
    }

    function onSelectGenre(genre) {
        props.parentCallback(genre);
    }

    return (
        <Select
            styles={customStyles}
            closeMenuOnSelect={false}
            className="basic-multi-select"
            classNamePrefix="select"
            isMulti
            options={props.genres}
            placeholder="Add genre..."
            onChange={onSelectGenre}
        />
    );
}