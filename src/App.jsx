import './css/App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import TopBar from './components/TopBar';
import Homepage from './views/Homepage';
import SearchResults from './views/SearchResults';
import Movie from './views/Movie';
import NotFound from './views/NotFound';
import { serverHeader } from './assets/constants';

const genresPromise = fetch(serverHeader + '/api/genres/')
    .then((response) => response.json())
    .then((data) => {
        return data.content;
    });

export default function App() {
    const [selectedModel, setSelectedModel] = useState(2);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedMode, setSelectedMode] = useState("Query");
    const [genres, setGenres] = useState([]);

    function handleModelCallback(model) {
        setSelectedModel(model);
    }

    function handleGenresCallback(genres) {
        setSelectedGenres(genres);
    }

    function handleModeCallback(mode) {
        setSelectedMode(mode);
    }

    genresPromise.then((data) => { setGenres(data); })

    return (
        <BrowserRouter>
            <ScrollToTop/>
            <TopBar parentModelCallback={handleModelCallback} parentGenresCallback={handleGenresCallback} parentModeCallback={handleModeCallback} genres={genres}/>
            <Routes>
                <Route path="/react-website/" element={<Homepage/>}/>
                <Route path="/react-website/page/:p" element={<Homepage/>}/>
                <Route path="/react-website/search/" element={<SearchResults model={selectedModel} filters={selectedGenres} mode={selectedMode}/>}/>
                <Route path="/react-website/search/:query" element={<SearchResults model={selectedModel} filters={selectedGenres} mode={selectedMode}/>}/>
                <Route path="/react-website/search/:query/page/:p" element={<SearchResults/>}/>
                <Route path="/react-website/movie/:id" element={<Movie genres={genres}/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
  
}
