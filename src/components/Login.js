/* Dependencies */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();

    const login = (e, state) => {
        e.preventDefault(); //prevents page from refreshing
        console.log(state);
        axios.post('http://localhost:9000/user/login', state)
            .then(function (response) {
                //This returns the access and refresh token, now authenticate the token
                //THEN redirect to menu page
                console.log(response.data)
                axios.post('http://localhost:9000/user/posts', response.data)
                    .then(function (response) {
                        console.log(response);
                        history.push('/menu');
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }).catch(function (error) {
                console.log(error);
            });
    };

    return (
        <form onSubmit={(e) => login(e, { username: username, password: password })}>
            <div className="container login-container">
                <h1 className="font-weight-bold logo"> ParaSite </h1>
                <div className="col-12">
                    <h2> Log in </h2>

                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="usernameAddon">Username</span>
                        </div>
                        <input type="username" className="form-control" name="username" placeholder="Username" aria-label="Username" aria-describedby="usernameAddon" onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="passwordAddon">Password</span>
                        </div>
                        <input type="password" className="form-control" name="password" placeholder="Password" aria-label="Password" aria-describedby="passwordAddon" onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <Button className="btn btn-primary mr-2 md-3" type="submit" renderas={Link}>Log in</Button>
                    <Button href="/register" className="btn btn-primary md-3" type="submit" renderas={Link}>Register</Button>
                    <Link to="/forgot"> Forgot? </Link>

                </div>
            </div>
        </form>
    )
}