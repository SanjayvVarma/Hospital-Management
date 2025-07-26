import "./loader.scss";

const Loader = ({ text = "Loading", message = "Please wait..." }) => {
    return (
        <div className="loader-overlay">
            <div className="loader-spinner"> </div>

            <div className="loader-text">
                <span>{text}</span>
                <span className="dot">.</span>
                <span className="dot delay-1">.</span>
                <span className="dot delay-2">.</span>
                <span className="dot delay-3">.</span>
            </div>
            
            <div className="loader-message">
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Loader;