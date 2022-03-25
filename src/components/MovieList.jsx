import '../css/MovieList.css';
import MovieBox from './MovieBox';

export default function MovieList(props) {
    return (
        <div className="movie-list">
            <div className="movie-list-header">
                <h1>{props.listName}</h1>
            </div>
            <div className="movie-list-content">
                {props.movieList.map((movie) => (
                    <MovieBox key={movie.film_id} id={movie.film_id} title={movie.original_title} poster={movie.poster_path}/>
                ))}
            </div>
        </div>
    )
}