import '../css/Movie.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MovieInfo from '../components/MovieInfo';
import MovieList from '../components/MovieList';

export default function Movie() {
    const params = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState({});

    // Llamar la API
    useEffect(() => {
        let isMounted = true;

        try {
            fetch(``) // Llamar 1 peli
            .then((response) => response.json())
            .then((data) => {
                if (isMounted)
                    setMovie(data);
            });
        }
        catch(error) {
            console.log(error);
        }

        return () => {
            isMounted = false
        };
    }, [params.id]);
    
    useEffect(() => {
        if (movie === undefined)
            navigate("notfound");
    }, [movie, navigate]);

    return (
        <div className="movie">
            {movie !== undefined && <MovieInfo movie={movie}/>}
            {movie !== undefined && <MovieList listName="Related" movieIdList={movie.relatedMovies}/>}
        </div>
    )
}