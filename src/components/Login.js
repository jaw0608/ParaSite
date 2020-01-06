/* Dependencies */
import React, { Component } from 'react';
import { Link} from 'react-router-dom';
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
        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    login = e => {
        let thisVar = this;
        e.preventDefault(); //prevents page from refreshing
        console.log(this.state);
        axios.post('http://localhost:9000/user/login', this.state)
            .then(function (response) {
                //Redirect to menu
                thisVar.props.history.push('/menu')
            }).catch(function (error) {
                console.log(error);
            });
    };

    render() {
        return (
            <form onSubmit={this.login} >
                <div className="container login-container">
                    <h1 className="font-weight-bold logo"> ParaSite </h1>
                    <div className="col-12">
                        <h2> Log in </h2>

                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="usernameAddon">Username</span>
                            </div>
                            <input type="text" className="form-control" name="username" placeholder="Username" aria-label="Username" aria-describedby="usernameAddon" onChange={this.changeHandler} />
                        </div>

                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="passwordAddon">Password</span>
                            </div>
                            <input type="password" className="form-control" name="password" placeholder="Password" aria-label="Password" aria-describedby="passwordAddon" onChange={this.changeHandler} />
                        </div>

                        <Button className="btn btn-primary mr-2 md-3" type="submit" renderas={Link}>Log in</Button>
                        <Button href="/register" className="btn btn-primary md-3" type="submit" renderas={Link}>Register</Button>

                    </div>
                </div>
            </form>
        )
    }
}

export default Login;
