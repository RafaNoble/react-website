import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import TopBar from './components/TopBar';
import Homepage from './views/Homepage';
import SearchResults from './views/SearchResults';
import Movie from './views/Movie';
import NotFound from './views/NotFound';

export default function App() {
    return (
        <BrowserRouter>
            <ScrollToTop/>
            <TopBar/>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/page/:p" element={<Homepage/>}/>
                <Route path="/search/:query" element={<SearchResults/>}/>
                <Route path="/search/:query/page/:p" element={<SearchResults/>}/>
                <Route path="/movie/:id" element={<Movie/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}
