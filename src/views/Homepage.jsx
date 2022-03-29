import '../css/Homepage.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { serverHeader, itemsXPage } from '../assets/constants';
import MovieList from '../components/MovieList';
import PageButtons from '../components/PageButtons';

export default function Homepage() {
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState({});
    const [moviesNum, setMoviesNum] = useState(0);
    const params = useParams();
    let page = (params.p === undefined ? 0 : parseInt(params.p) - 1);

    useEffect(() => {
        try {
            fetch(serverHeader + `/api/movie/page/${page}`, {mode: 'cors'})
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.content);
                setMoviesNum(data.totalcont);
                setIsLoading(false);
            });
        }
        catch(error) {
            console.log(error);
        }
    }, [page]);
    
    if (isLoading) {
        return (
            <div className="homepage">
                <div className="movies-header">
                    <h1>{"Loading movies..."}</h1>
                </div>
            </div>
        )
    }

    else {
        return (
            <div className="homepage">
                <MovieList listName="Explore" movieList={movies}/>
                <PageButtons numItems={moviesNum} itemsXPage={itemsXPage} urlHeader="/react-website/"/>
            </div>
        )
    }
}
