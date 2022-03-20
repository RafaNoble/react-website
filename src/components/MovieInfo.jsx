import '../css/MovieInfo.css';
import { useState, useEffect } from 'react';
import header from '../assets/urlHeader';
import ImgNotAvailable from '../assets/Image-Not-Available.png';

export default function MovieInfo(props) {
    const [genres, setGenres] = useState("");
    let movie = props.movie;

    useEffect(() => {
        
        let genres = '';
                    
        if (movie !== undefined && movie.genres !== undefined && movie.genres.length !== 0) {
            //genres += movie.genres.map((genre) => ' ' + genre.name);
            //console.log(movie.genres);
            let genresList = movie.genres;
            var aux = genresList.slice(1, genresList.length - 1);
            var stringGenres = aux.replaceAll('},', '};');
            var currentline = stringGenres.split("; ");
            //console.log(currentline);
            let arrayGenres = [];
            for (var i = 0;i < currentline.length ;++i) {
                var singleGenre = currentline[i];
                singleGenre = singleGenre.replaceAll('{', '[');
                singleGenre = singleGenre.replaceAll('}', ']');
                singleGenre = singleGenre.replaceAll('[', '[[');
                singleGenre = singleGenre.replaceAll(']', ']]');
                singleGenre = singleGenre.replaceAll('\'', '"');
                singleGenre = singleGenre.replaceAll(' ', '');
                singleGenre = singleGenre.replaceAll(",", "],[");
                singleGenre = singleGenre.replaceAll(":", ",");
                //console.log(genre);
                var genreMap = new Map(JSON.parse(singleGenre));
                //console.log(genreMap);
                arrayGenres.push(genreMap);
            }
            //console.log(arrayGenres);
            genres += arrayGenres.map((genre) => ' ' + genre.get('name'));
            //console.log(genres);
        } else
            genres = <p>N/A</p>;
        
        setGenres(genres);

    }, [movie]);
    
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
