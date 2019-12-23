/* Dependencies */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }

        this.login = this.login.bind(this);
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    login = e => {
        console.log(this.state);
        axios.get('http://localhost:9000/users', this.state)
            .then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <form onSubmit={this.login}>
                <div className="container login-container">
                    <h1 className="font-weight-bold logo"> ParaSite </h1>
                    <div className="col-12">
                        <h2> Log in </h2>

                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="usernameAddon">Username</span>
                            </div>
                            <input type="text" className="form-control" name="username" placeholder="Username" aria-label="Username" aria-describedby="usernameAddon" />
                        </div>

                        <div className="input-group mb-2">
                            <div classname="input-group prepend">
                                <span className="input-group-text" id="passwordAddon">Password</span>
                            </div>
                            <input type="text" className="form-control" name="password" placeholder="Password" aria-label="Password" aria-describedby="passwordAddon" />
                        </div>

                        <Button className="btn btn-primary mr-2 md-3" type="submit" renderAs={Link}>Log in</Button>
                        <Button href="/register" className="btn btn-primary md-3" type="submit" renderAs={Link}>Register</Button>

                    </div>
                </div>
            </form>
        )
    }
}

export default Login;
