import '../css/MovieBox.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import header from '../assets/urlHeader';
import ImgNotAvailable from '../assets/Image-Not-Available.png';

export default function MovieBox(props) {
    const [movie, setMovie] = useState({});

    useEffect(() => {
        let isMounted = true;

        try {
            fetch(``)
            .then((response) => response.json())
            .then((data) => {
                if (isMounted)
                    setMovie(data);
            });
        }
        catch(error) {
            console.log(error);
        }

        return () => {
            isMounted = false
        };
    }, [props.id]);

    return (
        <div className="movie-list-box">
            <div>
                <Link className="movie-list-box-link" to={`/react-website/movie/${movie.id}`}>
                    {movie.poster_path ? (<img className="movie-list-box-img" src={header + movie.poster_path} alt={movie.original_title}/>)
                                       : (<img className="movie-list-box-img" src={ImgNotAvailable} alt="not available"/>)}
                    <div className="movie-list-box-title">
                        <b>{movie.original_title}</b>
                    </div>
                </Link>
            </div>
        </div>
    )
}


