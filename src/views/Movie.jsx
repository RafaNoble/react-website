import '../css/Movie.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { serverHeader } from '../assets/constants';
import MovieInfo from '../components/MovieInfo';
import MovieList from '../components/MovieList';

export default function Movie() {
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState({});
    const [similarFilms, setSimilarFilms] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        try {
            fetch(serverHeader + `/api/movie/${params.id}`)
            .then((response) => response.json())
            .then((data) => {
                if (isMounted) {
                    setMovie(data.content[0]);
                    setSimilarFilms(data.content.slice(1));
                    setIsLoading(false);
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
    
    let movie_list = (isLoading ? [] : similarFilms);

    return (
        <div className="movie">
            {movie !== undefined && <MovieInfo movie={movie}/>}
            {movie !== undefined && <MovieList listName="Related" movieList={movie_list}/>}
        </div>
    )
}