import React, { useState } from 'react';

import PostItem from '../postItem';

import './styles.css';

const HomePage = () => {
    const [input, setInput] = useState('');
    const [foundPosts, setFoundPosts] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await fetch(`https://localhost:5001/posts/search/?key=${input}`);
        const resJson = await res.json();
        setFoundPosts(resJson);
        console.log(foundPosts);
    }

    return (
        <div >
            <form className="home-page-form">
                <input type="text" placeholder="Enter post title" className="home-page-form-input" value={input} onChange={(event) => setInput(event.target.value)}></input>
                <button 
                    type="submit" 
                    className="home-page-form-button"
                    onClick={(event) => handleSubmit(event)}
                >Find</button>
            </form>
            <section>
            {foundPosts.map(({body, title, category}) => (
                <PostItem body={body} title={title} category={category}/>
            ))}
        </section>
        </div>
    );
}

export default HomePage;