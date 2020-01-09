import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class Forgot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: ""
        }
        this.sendEmail = this.sendEmail.bind(this);
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    sendEmail = e => {
        e.preventDefault(); //Prevents page from reloading;
        axios.post('http://localhost:9000/user/forgot', this.state)
            .then(function (response) {
                console.log("Successfully sent email!");
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <form onSubmit={this.sendEmail}>
                <h1> FORGOT PASSWORD </h1>
                <p>Email</p>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Enter email here" name="email" onChange={this.changeHandler} />
                </div>
                <Button className="" type="submit"> Send </Button>
            </form>
        )
    }
}

export default Forgot;