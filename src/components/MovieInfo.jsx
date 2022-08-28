import '../css/MovieInfo.css';
import { useState, useEffect } from 'react';
import { header } from '../assets/constants';
import ImgNotAvailable from '../assets/Image-Not-Available.png';

export default function MovieInfo(props) {
    let movie = props.movie;
    

    /*useEffect(() => {

        let genres = '';
        console.log(props.genres)    
        if (movie !== undefined && movie.genres !== undefined && movie.genres !== "[]" && defaultGenres !== false) {

            let genresList = [];
            
            console.log(movie.genres);

            movie.genres.substring(2, movie.genres.length - 1).split(", ").forEach( (id) => {
                genresList.push(defaultGenres.find(genre => genre.value == id));
            });
            console.log(genresList);
            genres += genresList.map((genre) => ' ' + genre.label);
            
        }
        else
            genres = <p>N/A</p>;

        setGenres(genres);
        
    }, [movie]);*/
    
    return (
        <div className="movie-info">
            {movie.poster_path ? (<img loading='lazy' className="movie-info-img" src={header.concat(movie.poster_path)} alt={movie.original_title}/>)
                               : (<img loading='lazy' className="movie-info-img" src={ImgNotAvailable} alt="not available"/>)}
            <div className="movie-info-box">
                <div className="movie-info-header"><h1>{movie.original_title}</h1></div>
                <div className="movie-info-content">
                    <div className="movie-info-releaseDate">
                        <div className="movie-info-releaseDate-header"><h2>Release Date</h2></div>
                        <div className="movie-info-releaseDate-content">
                            {movie.release_date !== "" ? (movie.release_date)
                                                       : (<p>N/A</p>)}
                        </div>
                    </div>
                    <div className="movie-info-genre">
                        <h2>Genre</h2>
                        <div className="movie-info-genre-content">{props.genres}</div>                        
                    </div>
                    <div className="movie-info-runtime">
                        <div className="movie-info-runtime-header"><h2>Runtime</h2></div>
                        <div className="movie-info-runtime-content">
                            {movie.runtime !== 0 ? (movie.runtime % 60 === 0 ? (Math.trunc(movie.runtime / 60) + "h")
                                                                             : (Math.trunc(movie.runtime / 60) === 0 ? (movie.runtime % 60 + "m")
                                                                                                                     : (Math.trunc(movie.runtime / 60) + "h " + movie.runtime % 60 + "m")))
                                                 : (<p>N/A</p>)}
                        </div>
                    </div>
                    <div className="movie-info-overview">
                        <div className="movie-info-overview-header"><h2>Overview</h2></div>
                        <div className="movie-info-overview-content">
                            {movie.overview !== "" ? (movie.overview)
                                                   : (<p>N/A</p>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
