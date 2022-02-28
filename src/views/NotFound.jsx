import './NotFound.css';

export default function NotFound() {
    return (
        <div className="error-text">
            <div className="error-text-title">404</div>
            <div className="error-text-subtitle">Page Not found</div>
            <div className="error-text-body">Nothing to see here... {"\n"} Please, return to the homepage</div>
        </div>
    )
}
