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

export default function App() {
    const [selectedModel, setSelectedModel] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [genres, setGenres] = useState();

    function handleModelCallback(model) {
        setSelectedModel(model);
    }

    function handleGenresCallback(genres) {
        setSelectedGenres(genres);
    }

    useEffect(() => {
        let isMounted = true;
        if (!isLoaded) {
            try {
                fetch(serverHeader + '/api/genres/')
                .then((response) => response.json())
                .then((data) => {
                    if (isMounted) {
                        setGenres(data.content);  
                        setIsLoaded(true);
                    }
                });
            }
            catch(error) {
                console.log(error);
            }
            return () => {
                isMounted = false
            };
        }

    }, []);
    console.log(genres);
    return (
        <BrowserRouter>
            <ScrollToTop/>
            <TopBar parentModelCallback={handleModelCallback} parentGenresCallback={handleGenresCallback} genres={genres}/>
            <Routes>
                <Route path="/react-website/" element={<Homepage/>}/>
                <Route path="/react-website/page/:p" element={<Homepage/>}/>
                <Route path="/react-website/search/:query" element={<SearchResults model={selectedModel} filters={selectedGenres}/>}/>
                <Route path="/react-website/search/:query/page/:p" element={<SearchResults/>}/>
                <Route path="/react-website/movie/:id" element={<Movie genres={genres}/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
  
}
