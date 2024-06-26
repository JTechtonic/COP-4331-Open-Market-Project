import React, { useState } from 'react';
import Route, { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import buildPath from '../logic/buildPath';

const Login = props => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        { username: "", password: "" }
    );

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [id]: value
            }
        })
    };

    const [message, setMessage] = useState('');

    const doLogin = async (event) => {
        event.preventDefault();
        var json = JSON.stringify(formData);

        try {
            const response = await fetch(buildPath('api/login'), { method: 'POST', body: json, headers: { 'Content-Type': 'application/json' } });
            var res = JSON.parse(await response.text());

            if (res.id <= 0) {
                setMessage('User/Password combination incorrect');
            }
            else {
                var user = { 
                    id: res.id, 
                    username: res.username, 
                    password: '',
                    firstName: res.firstName, 
                    lastName: res.lastName, 
                    email: res.email,
                    interestedIn: res.interestedIn,
                    phoneNumber: res.phoneNumber,
                    ttl: res.ttl,
                    aboutMe: res.aboutMe,
                    profilePic: res.profilePic
                };
                props.setTempUser(null)
                props.setLoggedUser(user);
                setMessage('');
                navigate('/home');
            }

        }
        catch (e) {
            console.log(json)
            alert(e.toString());
            return;
        }

    };

    return (
        <div className="form_wrapper">
            <div className="form_container">
                <div className="title_container">
                    <h2>Login</h2>
                </div>

                <div className="">
                    <form className="login" onSubmit={doLogin}>
                        <div className="input_field"> <span><FontAwesomeIcon icon={faUser} transform="down-10"/></span>
                            <input
                                type="text"
                                placeholder="Username"
                                id="username"
                                onChange={handleChange}
                                className="userDetails"
                                value={formData.username}
                            />
                        </div>
                        <div className="input_field"> <span> <FontAwesomeIcon icon={faLock} transform="down-10"/></span>
                            <input
                                type="password"
                                placeholder="Password"
                                id="password"
                                onChange={handleChange}
                                className="userDetails"
                                value={formData.password}

                            />
                        </div>
                        <input
                            type="submit"
                            value="Login"
                            id="loginButton"
                            className="loginButton"
                            onClick={doLogin}
                        />
                        <Link to='/forgot-password'>Forgot Password</Link><br/>
                        <Link to='/register'>Register</Link>
                    </form>
                </div>
            </div>

            <p className="credit"><a href="http://www.designtheway.com" target="_blank"></a></p>

            <span id="loginResult">{message}</span>
        </div >
    );
};

export default Login;