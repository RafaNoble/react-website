import '../css/MovieBox.css';
import { Link } from 'react-router-dom';
import { header } from '../assets/constants';
import ImgNotAvailable from '../assets/Image-Not-Available.png';

export default function MovieBox(props) {

    return (
        <div className="movie-list-box">
            <Link className="movie-list-box-link" to={`/react-website/movie/${props.id}`}>
                {props.poster ? (<img className="movie-list-box-img" src={header + props.poster} alt={props.title}/>)
                                    : (<img className="movie-list-box-img" src={ImgNotAvailable} alt="not available"/>)}
                <div className="movie-list-box-title">
                    <b>{props.title}</b>
                </div>
            </Link>
        </div>
    )
}