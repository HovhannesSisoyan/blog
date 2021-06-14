import React from 'react';

import './styles.css';

const HomePage = () => {
    return (
        <div >
            <form className="home-page-form">
                <input type="text" placeholder="Enter post title" className="home-page-form-input"></input>
                <button 
                    type="submit" 
                    className="home-page-form-button"
                    // onClick={event => handleSubmit(event)}
                >Find</button>
            </form>
        </div>
    );
}

export default HomePage;