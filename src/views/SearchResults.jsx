import '../css/SearchResults.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { serverHeader, itemsXPage } from '../assets/constants';
import MovieList from '../components/MovieList';
import PageButtons from '../components/PageButtons';

export default function SearchResults() {
    const [isLoading, setIsLoading] = useState(true);
    const [movieList, setMovieList] = useState({});
    const params = useParams();
    
    useEffect(() => {
        let isMounted = true;

        try {
            fetch(serverHeader + `/api/movie/${params.query}`)
            .then((response) => response.json())
            .then((data) => {
                if (isMounted) {
                    setMovieList(data.content);  
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
    }, [params.query]);

    let movie_list = (isLoading ? [] : movieList);

    return (
        <div className="results">
            {movie_list !== undefined && movie_list.length > 0 ?
            (
                <div>
                    {params.p === undefined ? (<MovieList listName={`Results for '${params.query}'`} movieList={movie_list.slice(0, itemsXPage)}/>)
                                            : (<MovieList listName={`Results for '${params.query}'`} movieList={movie_list.slice((params.p - 1) * itemsXPage, params.p * itemsXPage)}/>)}
                    <PageButtons numItems={movie_list.length} itemsXPage={itemsXPage} urlHeader={`/react-website/search/${params.query}/`}/>
                </div>
            )
            :
            (
                <div className="no-results-header">
                    <h1>{`No results for '${params.query}'`}</h1>
                </div>
            )}
        </div>
    )
}
