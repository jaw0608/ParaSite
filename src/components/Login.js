/* Dependencies */
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Form } from 'react-bootstrap';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = (e) => {
        e.preventDefault();
        console.log(username, password);
        axios.get('http://localhost:9000/users', {'username': username, 'password': password})
            .then(function (response) {
                //This returns the access and refresh token, now authenticate the token
                //THEN redirect to menu page
                console.log(response.data)
                axios.post('http://localhost:9000/user/posts', response.data)
                    .then(function (response) {
                        console.log(response);
                        // history.push('/menu');
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }).catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Form onSubmit={login}>
            <h1 className="font-weight-bold titleText"> ParaSite </h1>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Log In
            </Button>
            <Button href='/register'> Register </Button>
        </Form>
    )
}

export default Login;
