/* Dependencies */
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const Login = () => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = (e) => {
        e.preventDefault();
        axios.post('http://localhost:9000/users/login', {'username': username, 'password': password})
            .then(function (response) {
                //This returns the access and refresh token, now authenticate the token
                //THEN redirect to menu page
                let config = {
                    headers: {
                        authorization: 'Bearer ' + response.data.accessToken
                    }
                }
                console.log(response.data)
                axios.post('http://localhost:9000/users/posts', response.data, config)
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
            <Button variant="primary" type="submit" className='mr-2'>
                Log In
            </Button>
            <Button href='/register' className='mr-2'> Register </Button>
            <Button href='/forgot'> Forgot Password </Button>
        </Form>
    )
}

export default Login;
