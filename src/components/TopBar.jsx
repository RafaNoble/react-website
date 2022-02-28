import './TopBar.css';
import HomeButton from '../components/HomeButton';
import SearchBar from '../components/SearchBar';

export default function TopBar() {
    return (
        <div className="top-bar">
            <HomeButton/>
            <SearchBar/>
        </div>
    )
}
