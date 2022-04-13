import '../css/TopBar.css';
import '../css/Dropdown.css';
import { useState } from 'react';
import React from 'react';
import HomeButton from '../components/HomeButton';
import Dropdown from 'react-dropdown';
import SearchBar from '../components/SearchBar';

const options = [
    { value: 1000, label: 'Search by title' },
    { value: 0, label: 'Search by text (Model 0)' },
    { value: 1, label: 'Search by text (Model 1)' }
];

export default function TopBar(props) {
    const [selectedValue, setSelectedValue] = useState(options[0]);

    function onSelect(value) {
        setSelectedValue(value);
        props.parentCallback(value.value);
    }

    return (
        <div className="top-bar">
            <HomeButton/>
            <Dropdown options={options} value={selectedValue} onChange={onSelect}/>
            <SearchBar/>
        </div>
    )
}
