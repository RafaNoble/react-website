import './HomeButton.css';
import { RiHomeLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

export default function HomeButton() {
    const navigate = useNavigate();

    function handleClick() {
        navigate("/");
    }
    
    return (
        <button 
            className="home-button"
            style={{fontSize: "20px"}}
            type="button"
            onClick={() => handleClick()}
        >
            <RiHomeLine className="home-button-icon"/>
        </button>
    )
}
