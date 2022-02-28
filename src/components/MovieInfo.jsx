import './MovieInfo.css';
import { useState, useEffect } from 'react';
import header from '../data/urlHeader';
import ImgNotAvailable from '../assets/Image-Not-Available.png';

export default function MovieInfo(props) {
    const [movie, setMovie] = useState({});
    const [genres, setGenres] = useState("");

    useEffect(() => {
        let isMounted = true;

        try {
            fetch(`https://api.themoviedb.org/3/movie/${props.id}?api_key=7d00d849e6faf0e552458a8ec8230945`)
            .then((response) => response.json())
            .then((data) => {
                if (isMounted) {
                    setMovie(data);

                    let genres = '';
                    
                    if (data.genres.length !== 0)
                        genres += data.genres.map((genre) => ' ' + genre.name);
                    else
                        genres = <p>N/A</p>;
                    
                    setGenres(genres);
                }
            });
        }
        catch(error) {
            console.log(error);
        }

        return () => {
            isMounted = false
        };
    }, [props.id]);

    return (
        <div className="movie-info">
            {movie.poster_path ? (<img className="movie-info-img" src={header + movie.poster_path} alt={movie.original_title}/>)
                               : (<img className="movie-info-img" src={ImgNotAvailable} alt="not available"/>)}
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
                        <div className="movie-info-genre-content">{genres}</div>                        
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
