import React from 'react';
import { createHook } from "overmind-react";
import { Link, useHistory } from 'react-router-dom';
import './styles.css';

const Navigation = () => {

    const useOvermind = createHook();
    const { state } = useOvermind();
    const { isLoggedIn, userData: { firstName } = {} } = state;
    const history = useHistory();

    return (
        <nav className="navigation">
            <ul className="navigation-list">
                <li className="navigation-list-item">
                <Link to="/" className="navigation-list-item-link"> Home </Link>
                </li>
                {!isLoggedIn && (<li className="navigation-list-item">
                <Link to="/login" className="navigation-list-item-link"> Login </Link>
                </li>)}
                {!isLoggedIn && (<li className="navigation-list-item">
                <Link to="/register" className="navigation-list-item-link"> Register </Link>
                </li>)}
                <li className="navigation-list-item">
                <Link to="/posts" className="navigation-list-item-link">All Posts </Link>
                </li>
                {isLoggedIn && (<li className="navigation-list-item" onClick={() => history.push('/profile')}>
                <img src="https://blog-project-images.s3.us-east-2.amazonaws.com/user/user.png"  width="40" height="40"/>
                <span className="navigation-list-item-text">{`Hi ${firstName} !`}</span>
                </li>)}
            </ul>
        </nav>
    )
}

export default Navigation;