import './loader.css';


export const SpinnerLoader = (props) => {
    return (
        <div className="loader">
            <svg viewBox="0 0 80 80">
                <circle id="test" cx="40" cy="40" r="32"></circle>
            </svg>
        </div>
    )
}
