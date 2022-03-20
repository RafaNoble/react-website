import '../css/SearchResults.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';
import PageButtons from '../components/PageButtons';

export default function SearchResults() {
    const params = useParams();
    const movXPage = 50;
    const [movieList, setMovieList] = useState({});
    console.log(params.query);
    useEffect(() => {
        let isMounted = true;

        try {
            fetch(`http://90c9-81-38-15-169.ngrok.io/api/movie/${params.query}`)
            .then((response) => response.json())
            .then((data) => {
                if (isMounted) {
                     setMovieList(data.content);     
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

    return (
        <div className="results">
            {movieList !== undefined && movieList.length > 0 ?
            (
                <div>
                    {params.p === undefined ? (<MovieList listName={`Results for '${params.query}'`} movieIdList={movieList.slice(0, movXPage)}/>)
                                            : (<MovieList listName={`Results for '${params.query}'`} movieIdList={movieList.slice((params.p - 1) * movXPage, params.p * movXPage)}/>)}
                    <PageButtons numItems={movieList.length} itemsXPage={movXPage} urlHeader={`/react-website/search/${params.query}/`}/>
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
