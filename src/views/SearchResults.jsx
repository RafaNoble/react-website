import './SearchResults.css';
import { useParams } from 'react-router-dom';
import { movies_data } from '../data/moviesDataJSON';
import MovieList from '../components/MovieList';
import PageButtons from '../components/PageButtons';

export default function SearchResults() {
    const params = useParams();
    const movXPage = 50;

    const filterMovies = (movies, query) => {
        if (!query) {
            return movies;
        }
    
        return movies.filter((movie) => {
            const postName = movie.title.toLowerCase();
            return postName.includes(query.toLowerCase());
        });
    };
    
    const filteredMovies = filterMovies(movies_data, params.query);
    
    let filteredIdMovies = filteredMovies.map((movie) => {
        return movie.id;
    });

    return (
        <div className="results">
            {filteredMovies.length > 0 ?
            (
                <div>
                    {params.p === undefined ? (<MovieList listName={`Results for '${params.query}'`} movieIdList={filteredIdMovies.slice(0, movXPage)}/>)
                                            : (<MovieList listName={`Results for '${params.query}'`} movieIdList={filteredIdMovies.slice((params.p - 1) * movXPage, params.p * movXPage)}/>)}
                    <PageButtons numItems={filteredMovies.length} itemsXPage={movXPage} urlHeader={`/search/${params.query}/`}/>
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
