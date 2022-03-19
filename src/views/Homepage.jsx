import '../css/Homepage.css';
import { useParams } from 'react-router-dom';
import MovieList from '../components/MovieList';
import PageButtons from '../components/PageButtons';

export default function Homepage() {
    const params = useParams();
    const [movies, setMovies] = useState({});
    let isMounted = true;
    let page = (params.p == undefined ? 1 : parseInt(params.p));
    // Llamar a la API

    useEffect(() => {
        try {
            fetch(``) // Llamar a la API para sacar las 50 primeras películas xD
            .then((response) => response.json())
            .then((data) => {
                if (isMounted) {
                    setMovies(data);
                }
            });
        }
        catch(error) {
            console.log(error);
        }
    }, [page]);

    let movie_id_list = movies.map((movie) => {
        return movie.id;
    });

    return (
        <div className="homepage">
            <MovieList listName="Explore" movieIdList={movie_id_list}/>
            <PageButtons numItems={1000} itemsXPage={50} urlHeader="/react-website/"/>
        </div>
    )
}
