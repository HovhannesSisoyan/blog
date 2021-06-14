import React, { useState } from 'react';
import { useHistory } from "react-router-dom"

import './styles.css';

const Registration = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState(null);
    const [gender, setGender] = useState(1);
    const history = useHistory();

    const handleSubmit = async event => {
        event.preventDefault();
        await fetch('https://localhost:5001/register', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                "FirstName": firstName,
                "LastName": lastName,
                "Email": email,
                "Username": username,
                "Password": password,
                "BirthDate": birthDate,
                "Gender": gender == 1 ? true : false,
            })
          })
        //   .then(res => res.json())
          .then(res => { if(res.ok) {
            history.push('/');
            return res.json();
          }})
          .catch(err => console.log(err))
    }

    return (
        <div className="reg-form">
            <form>
                <input type="text" 
                    className="reg-form-first-name" 
                    placeholder="Enter first name" 
                    value={firstName}
                    onChange={event => setFirstName(event.target.value)}
                />
                <input type="text" 
                    className="reg-form-last-name" 
                    placeholder="Enter last name" 
                    value={lastName}
                    onChange={event => setLastName(event.target.value)}
                />
                <input type="email" 
                    className="reg-form-email" 
                    placeholder="Enter email" 
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <input type="text" 
                    className="reg-form-username" 
                    placeholder="Enter username" 
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />
                <input type="password" 
                    className="reg-form-password" 
                    placeholder="Enter password" 
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                {/* <label className="reg-form-label" >Birth Date</label> */}
                <input type="date"
                    className="login-form-birth-date"
                    placeholder="Birth Date"
                    value={birthDate}
                    onChange={event => setBirthDate(event.target.value)}
                />
                {/* <label>Gender</label> */}
                <select className="reg-form-gender" onChange={event => setGender(event.target.value)}>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                </select>
                <div className="reg-form-submit">
                    <button 
                        type="submit" 
                        className="reg-form-button"
                        onClick={event => handleSubmit(event)}
                    >Register</button>
                </div>
            </form>
        </div>
    )
}

export default Registration;