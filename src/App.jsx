import './css/App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import TopBar from './components/TopBar';
import Homepage from './views/Homepage';
import SearchResults from './views/SearchResults';
import Movie from './views/Movie';
import NotFound from './views/NotFound';

export default function App() {
    const [selectedModel, setSelectedModel] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);

    function handleModelCallback(model) {
        setSelectedModel(model);
    }

    function handleGenresCallback(genres) {
        setSelectedGenres(genres);
    }

    return (
        <BrowserRouter>
            <ScrollToTop/>
            <TopBar parentModelCallback={handleModelCallback} parentGenresCallback={handleGenresCallback}/>
            <Routes>
                <Route path="/react-website/" element={<Homepage/>}/>
                <Route path="/react-website/page/:p" element={<Homepage/>}/>
                <Route path="/react-website/search/:query" element={<SearchResults model={selectedModel} filters={selectedGenres}/>}/>
                <Route path="/react-website/search/:query/page/:p" element={<SearchResults/>}/>
                <Route path="/react-website/movie/:id" element={<Movie/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}
