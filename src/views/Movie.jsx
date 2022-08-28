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
    const params = useParams();
    const navigate = useNavigate();
    let defaultGenres = props.genres;
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
                    let genres = '';
                    let genresList = [];
                    console.log(defaultGenres);
                    console.log(data.content[0].genres);
                    data.content[0].genres.substring(2, data.content[0].genres.length - 1).split(", ").forEach( (id) => {
                        genresList.push(defaultGenres.find(genre => genre.value == id));
                    });
                    genres += genresList.map((genre) => ' ' + genre.label);
                    setGenres(genres);
                    setIsLoading(false);
                    // Todo genres
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