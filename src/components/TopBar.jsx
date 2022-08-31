import '../css/TopBar.css';
import '../css/Dropdown.css';
import '../css/Flipswitch.css';
import { useState } from 'react';
import React from 'react';
import HomeButton from '../components/HomeButton';
import Dropdown from 'react-dropdown';
import SearchBar from '../components/SearchBar';
import GenreFilter from '../components/GenreFilter';

const modelOptions = [
    { value: 0, label: 'Search by text' },
    { value: 1, label: 'Search by title' },
    { value: 2, label: 'Search by actor' }
];

export default function TopBar(props) {
    const [selectedModel, setSelectedModel] = useState(modelOptions[1]);
    const [checked, setChecked] = useState(false);

    function onSelectModel(model) {
        setSelectedModel(model);
        if (model.value === 0) {
            props.parentModeCallback("Algorithm");
            setChecked(true);
        }
        props.parentModelCallback(model.value);
    }

    function handleCallback(genres) {
        let arrayGenre = [];
        genres.forEach(element => {
            arrayGenre.push(element.value);
        });
        props.parentGenresCallback(arrayGenre);
    }

    function onSelectMode() {
        if (selectedModel.value > 0) {
            if (checked === false)
                props.parentModeCallback("Algorithm");
            else
                props.parentModeCallback("Query");
            setChecked(!checked);
        }
    }

    function handleSearchCallback(searching) {
        props.searchCallBack(searching);
    }

    return (
        <div className="top-bar">
            <div className="top-bar-search-bar">
                <HomeButton/>
                <Dropdown options={modelOptions} value={selectedModel} onChange={onSelectModel}/>
                <SearchBar searchCallBack={handleSearchCallback} search={props.search}/>
            </div>
            <div className="genre-filter">
                <GenreFilter parentCallback={handleCallback} genres={props.genres}/>
                <input type="checkbox" className="flipswitch" checked={checked} onChange={onSelectMode}/>
            </div>
        </div>
    )
}
