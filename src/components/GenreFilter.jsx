import '../css/GenreFilter.css';
import { useState } from 'react';

export default function GenreFilter() {
    const [showGenres, setShowGenres] = useState(false);

    return (
        <div className='filter-container'>
            <button className='filter-button' onClick={() => {setShowGenres(!showGenres);}} on={() => {setShowGenres(false);}}>Add genre...</button>
            {showGenres && <div className='filter-box'>puta</div>}
        </div>
    );
}