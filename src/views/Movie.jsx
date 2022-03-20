import '../css/Movie.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MovieInfo from '../components/MovieInfo';
import MovieList from '../components/MovieList';

export default function Movie() {
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState({});
    const params = useParams();
    const navigate = useNavigate();
    let movie_id_list = [];
    useEffect(() => {
        let isMounted = true;

        try {
            fetch(`http://90c9-81-38-15-169.ngrok.io/api/movie/${params.id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (isMounted) {
                    let movie = data.content[0];
                    setMovie(movie);
                    setIsLoading(false);
                    movie.ids_similar_films = movie.ids_similar_films.slice(1, movie.ids_similar_films.length - 1);
                    movie.ids_similar_films = movie.ids_similar_films.split(",").map(Number)
                    console.log(movie.ids_similar_films);
                }
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
    
    movie_id_list = (isLoading ? [] : movie.ids_similar_films);

    return (
        <div className="movie">
            {movie !== undefined && <MovieInfo movie={movie}/>}
            {/*movie !== undefined && <MovieList listName="Related" movieIdList={movie_id_list}/>*/}
        </div>
    )
}