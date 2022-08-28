import './css/index.css';
import ReactDOM from 'react-dom';
import { serverHeader } from './assets/constants';
import App from './App';

async function loadGenres() {

    const response = await fetch(serverHeader + '/api/genres/')
    const genresjson = await response.json();
    console.log(genresjson.content);
    return genresjson.content;

}

const genres = loadGenres();

ReactDOM.render(<App genres={genres}/>, document.getElementById('root'));