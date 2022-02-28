import './Homepage.css';
import { useParams } from 'react-router-dom';
import { movies_data } from '../data/moviesDataJSON';
import MovieList from '../components/MovieList';
import PageButtons from '../components/PageButtons';

export default function Homepage() {
    const params = useParams();
    const movXPage = 50;

    let movie_id_list = movies_data.map((movie) => {
        return movie.id;
    });

    return (
        <div className="homepage">
            {params.p === undefined ? (<MovieList listName="Explore" movieIdList={movie_id_list.slice(0, movXPage)}/>)
                                    : (<MovieList listName="Explore" movieIdList={movie_id_list.slice((params.p - 1) * movXPage, params.p * movXPage)}/>)}
            <PageButtons numItems={movies_data.length} itemsXPage={movXPage} urlHeader="/"/>
        </div>
    )
}
