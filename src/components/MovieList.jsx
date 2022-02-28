import './MovieList.css';
import MovieBox from './MovieBox';

export default function MovieList(props) {
    return (
        <div className="movie-list">
            <div className="movie-list-header">
                <h1>{props.listName}</h1>
            </div>
            <div className="movie-list-content">
                {props.movieIdList.map((movieId) => (
                    <MovieBox key={movieId} id={movieId}/>
                ))}
            </div>
        </div>
    )
}