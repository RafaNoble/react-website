import '../css/GenreFilter.css';
import { useState } from 'react';
import Select from 'react-select';

const genreOptions = [
    { value: 0, label: 'Action' },
    { value: 1, label: 'Comedy' },
    { value: 2, label: 'Drama' },
    { value: 3, label: 'Animation' },
    { value: 4, label: 'Adventure' },
    { value: 5, label: 'Crime' },
    { value: 6, label: 'Documentary' },
    { value: 7, label: 'Western' },
    { value: 8, label: 'Family' },
    { value: 9, label: 'Fantasy' },
    { value: 10, label: 'History' },
    { value: 11, label: 'Horror' },
    { value: 12, label: 'Music' },
    { value: 13, label: 'Mystery' },
    { value: 14, label: 'Romance' },
    { value: 15, label: 'Science Fiction' },
    { value: 16, label: 'TV Movie' },
    { value: 17, label: 'Thriller' },
    { value: 18, label: 'War' }
];

export default function GenreFilter(props) {
    const [selectedGenres, setSelectedGenres] = useState([]);
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
        setSelectedGenres(genre);
        props.parentCallback(genre);
    }

    return (
        <Select
            styles={customStyles}
            closeMenuOnSelect={false}
            className="basic-multi-select"
            classNamePrefix="select"
            isMulti
            options={genreOptions}
            placeholder="Add genre..."
            onChange={onSelectGenre}
        />
    );
}