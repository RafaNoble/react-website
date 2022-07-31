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
    { value: 2, label: 'Drama' }
];

export default function TopBar(props) {
    const [selectedModel, setSelectedModel] = useState(modelOptions[0]);
    const [selectedGenres, setSelectedGenres] = useState([]);

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
