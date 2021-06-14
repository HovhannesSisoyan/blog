import React from 'react';
import cookie from 'react-cookies';
import { useHistory } from "react-router-dom";
import { createHook } from "overmind-react";

import './styles.css';

const Profile = () => {

    const history = useHistory();

    const useOvermind = createHook();
    const { state: { userData:  { firstName, lastName, username, email, gender, birthDate } = {}} = {}, actions } = useOvermind();

    const hanleLogoutClick = () => {
        cookie.remove('authToken');
        actions.logOut();
        actions.setUserData({});
        localStorage.removeItem('userId');
        history.push('/');
    }

    return (
        <div className="profile">
            <ul className="profile-list">
                <li>
                    {`First name: ${firstName}`}
                </li>
                <li>
                    {`Last name: ${lastName}`}
                </li>
                <li>
                    {`Email: ${email}`}
                </li>
                <li>
                    {`Username: ${username}`}
                </li>
                <li>
                    {`Gender: ${gender == 1 ? 'Male' : 'Female'}`}
                </li>
                <li>
                    {`Birth Date: ${birthDate?.slice(0, birthDate.indexOf('T'))}`}
                </li>
            </ul>
            <button 
                    type="submit" 
                    className="logout-button"
                    onClick={() => hanleLogoutClick()}
            >Log Out</button>
        </div>
    );
}

export default Profile;