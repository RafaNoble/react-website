import '../css/SearchResults.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { serverHeader, itemsXPage } from '../assets/constants';
import MovieList from '../components/MovieList';
import PageButtons from '../components/PageButtons';

export default function SearchResults(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [movieList, setMovieList] = useState({});
    const params = useParams();

    //console.log(props.searching);

    useEffect(() => {
        let isMounted = true;

        setIsLoading(true);

        if (params.query === undefined)
            params.query = "";

        /*console.log(props.model);
        console.log(props.mode);
        console.log(props.filters);*/
        try {

            let _endpoint = ""
            let _headers = ""
            let _method = ""
            let _body = ""
            
            //Search By Model
            if (props.model === 0) {
                _endpoint = '/api/movie/similar/'
                _headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}
                _method = "POST"
                _body = JSON.stringify({text: params.query, genres: props.filters})
            }
            //Search By Title
            else if(props.model === 1) {
                _endpoint = '/api/movie/title/'
                _headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}
                _method = "POST"
                _body = JSON.stringify({title: params.query, genres: props.filters, mode: props.mode})
            }
            //Search By Actors
            else if(props.model === 2) {
                _endpoint = '/api/movie/actors/'
                _headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}
                _method = "POST"
                _body = JSON.stringify({actors: params.query, genres: props.filters, mode: props.mode})
            }
            
            fetch(serverHeader + _endpoint, {
                headers: _headers,
                method: _method,
                body: _body
            }).then((response) => response.json())
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
    }, [props.searching, params.query, props.filters]);

    if (isLoading) {
        return (
            <div className="results">
                <div className="results-header">
                    <h1>{"Loading results..."}</h1>
                </div>
            </div>
        )
    }
    
    else {
        return (
            <div className="results">
                {movieList !== undefined && movieList.length > 0 ?
                (
                    <div>
                        {params.p === undefined ? (<MovieList listName={`Results for '${params.query === "" ? 'genres' : params.query}'`} movieList={movieList.slice(0, itemsXPage)}/>)
                                                : (<MovieList listName={`Results for '${params.query === "" ? 'genres' : params.query}'`} movieList={movieList.slice((params.p - 1) * itemsXPage, params.p * itemsXPage)}/>)}
                        <PageButtons numItems={movieList.length} itemsXPage={itemsXPage} urlHeader={`/react-website/search/${params.query}/`}/>
                    </div>
                )
                :
                (
                    <div className="results-header">
                        <h1>{`No results for '${params.query}'`}</h1>
                    </div>
                )}
            </div>
        )
    }
}
