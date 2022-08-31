import '../css/Movie.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { serverHeader } from '../assets/constants';
import MovieInfo from '../components/MovieInfo';
import MovieList from '../components/MovieList';

export default function Movie(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState({});
    const [similarFilms, setSimilarFilms] = useState([]);
    const [genres, setGenres] = useState("");
    const defaultGenres = props.genres;
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        setIsLoading(true);

        try {
            fetch(serverHeader + `/api/movie/${params.id}/`)
            .then((response) => response.json())
            .then((data) => {
                if (isMounted) {
                    setMovie(data.content[0]);
                    setSimilarFilms(data.content.slice(1));
                    if (data.content[0] !== undefined && data.content[0].genres !== undefined && data.content[0].genres !== null) {
                        let genres = '';
                        let genresList = [];
                        data.content[0].genres.substring(1, data.content[0].genres.length - 1).split(", ").forEach( (id) => {
                            genresList.push(defaultGenres.find(genre => genre.value == id));
                        });
                        genres += genresList.map((genre) => ' ' + genre.label);
                        setGenres(genres);
                    } else {
                        setGenres("N/A");
                    }
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
    
    if (isLoading) {
        return (
            <div className="movie">
                <div className="movie-header">
                    <h1>{"Loading movie details..."}</h1>
                </div>
            </div>
        )
    }

    else {
        return (
            <div className="movie">
                {movie !== undefined && <MovieInfo movie={movie} genres={genres}/>}
                {movie !== undefined && <MovieList listName="Related" movieList={similarFilms}/>}
            </div>
        )
    }
}