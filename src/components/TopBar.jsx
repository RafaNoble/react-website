import '../css/TopBar.css';
import '../css/Dropdown.css';
import { useState } from 'react';
import React from 'react';
import HomeButton from '../components/HomeButton';
import Dropdown from 'react-dropdown';
import SearchBar from '../components/SearchBar';
import GenreFilter from '../components/GenreFilter';

const modelOptions = [
    { value: 0, label: 'Search by text (Model 0)' },
    { value: 1, label: 'Search by text (Model 1)' },
    { value: 2, label: 'Search by title' }
];

export default function TopBar(props) {
    const [selectedModel, setSelectedModel] = useState(modelOptions[2]);

    function onSelectModel(model) {
        setSelectedModel(model);
        props.parentModelCallback(model.value);
    }

    function handleCallback(genres) {
        props.parentGenresCallback(genres);
    }

    return (
        <div className="top-bar">
            <div className="top-bar-search-bar">
                <HomeButton/>
                <Dropdown options={modelOptions} value={selectedModel} onChange={onSelectModel}/>
                <SearchBar/>
            </div>
            <div className="genre-filter">
                <GenreFilter parentCallback={handleCallback}/>
            </div>
        </div>
    )
}
