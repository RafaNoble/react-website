import '../css/SearchBar.css';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar(props) {
    const [value, setValue] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (!location.pathname.includes("search"))
            setValue("");
    }, [location.pathname])

    const onSubmit = (e) => {
        navigate(`/react-website/search/${value}`);
        props.searchCallBack(!props.search);
        e.preventDefault();
    };

    return (
        <form 
            className="search-bar"
            action="/"
            method="get"
            autoComplete="off"
            onSubmit={onSubmit}
        >
            <input
                className="search-bar-input"
                value={value}
                onInput={(e) => setValue(e.target.value)}
                type="text"
                placeholder="Search..."
                name="s"
            />
            <button
                className="search-bar-button"
                type="submit"
            >
                <FaSearch className="search-bar-icon"/>
            </button>
        </form>
    );
}