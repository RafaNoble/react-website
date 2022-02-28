import './Movie.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { movies_data } from '../data/moviesDataJSON';
import MovieInfo from '../components/MovieInfo';
import MovieList from '../components/MovieList';

export default function Movie() {
    const params = useParams();
    const navigate = useNavigate();

    function getMovie(movieId) {
        return movies_data.find((movie) => {
            return movie.id === movieId;
        });
    }

    const movie_info = getMovie(params.id);
    
    useEffect(() => {
        if (movie_info === undefined)
            navigate("notfound");
    }, [movie_info, navigate]);

    return (
        <div className="movie">
            {movie_info !== undefined && <MovieInfo id={movie_info.id}/>}
            {movie_info !== undefined && <MovieList listName="Related" movieIdList={movie_info.relatedMovies}/>}
        </div>
    )
}