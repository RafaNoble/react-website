import '../css/Homepage.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieList from '../components/MovieList';
import PageButtons from '../components/PageButtons';

export default function Homepage() {
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState({});
    const params = useParams();
    let page = (params.p === undefined ? 0 : parseInt(params.p) - 1);
    let itemsXPage = 50;

    useEffect(() => {
        try {
            fetch(`http://9d25-81-38-15-169.ngrok.io/api/movie/page/${page}`, {mode: 'cors'})
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.content);
                setIsLoading(false);
            });
        }
        catch(error) {
            console.log(error);
        }
    }, [page]);

    let movie_id_list = (isLoading ? [] : movies.map((movie) => {
        return movie.film_id;
    }));

    return (
        <div className="homepage">
            <MovieList listName="Explore" movieIdList={movie_id_list}/>
            <PageButtons numItems={1000} itemsXPage={itemsXPage} urlHeader="/react-website/"/>
        </div>
    )
}
