import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: ""
        }
        this.registerAccount = this.registerAccount.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    registerAccount = e => {
        //Should pull values once this is clicked
        e.preventDefault(); //Prevents page from refreshing
        console.log(this.state);
        axios.post('http://localhost:9000/users/register', this.state)
            .then(function (response) {
                const user = JSON.parse(response.config.data);
                console.log(user);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <form onSubmit={this.registerAccount}>
                <div className="container">
                    <div className="col-12">
                        <h2 className="text-center logo mb-3"> Register </h2>

                        <p>First Name</p>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="First Name" name="firstName" onChange={this.changeHandler} />
                        </div>

                        <p>Last Name</p>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Last Name" name="lastName" onChange={this.changeHandler} />
                        </div>

                        <p>Email</p>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Email" name="email" onChange={this.changeHandler} />
                        </div>

                        <p>Username</p>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Username" name="username" onChange={this.changeHandler} />
                        </div>

                        <p>Password</p>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Password" name="password" onChange={this.changeHandler} />
                        </div>

                        <p>Confirm Password</p>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Confirm Password" name="confirmPassword" onChange={this.changeHandler} />
                        </div>

                        <Button type="submit" className="pr-3" onClick={this.registerAccount}>Register</Button>
                        <Link to="/" className="ml-3">Already have an account?</Link>

                    </div>

                </div>
            </form>
        )
    }
}

export default Register;