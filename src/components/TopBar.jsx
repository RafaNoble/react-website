import '../css/TopBar.css';
import '../css/Dropdown.css';
import { useState } from 'react';
import React from 'react';
import HomeButton from '../components/HomeButton';
import Dropdown from 'react-dropdown';
import SearchBar from '../components/SearchBar';
import Select from 'react-select';

const modelOptions = [
    { value: 1000, label: 'Search by title' },
    { value: 0, label: 'Search by text (Model 0)' },
    { value: 1, label: 'Search by text (Model 1)' }
];

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
    { value: 18, label: 'War' },
];

export default function TopBar(props) {
    const [selectedModel, setSelectedModel] = useState(modelOptions[0]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          borderBottom: '1px dotted pink',
          color: '#FFF',
          backgroundColor: 'darkred',
          padding: 5,
        }),
        control: () => ({
        }),
        singleValue: (provided, state) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = 'opacity 300ms';
      
          return { ...provided, opacity, transition };
        }
      }

    function onSelectModel(model) {
        setSelectedModel(model);
        props.parentModelCallback(model.value);
    }

    function onSelectGenre(genre) {
        setSelectedGenres(genre);
        props.parentGenresCallback(selectedGenres);
    }

    return (
        <div>
            <div className="top-bar">
                <HomeButton/>
                <Dropdown options={modelOptions} value={selectedModel} onChange={onSelectModel}/>
                <SearchBar/>
            </div>
            <div className="genre-filter">
                <Select
                    styles={customStyles}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    isMulti
                    options={genreOptions}
                    placeholder="Add genre..."
                    onChange={onSelectGenre}
                />
            </div>
        </div>
    )
}
