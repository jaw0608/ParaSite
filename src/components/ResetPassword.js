import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.pathname.split("/")[2],
            password: "",
            valid: false
        }
        this.sendEmail = this.sendEmail.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    sendEmail = e => {
        e.preventDefault(); //Prevents page from reloading;

        axios.post('http://localhost:9000/user/resetpassword', this.state)
            .then(function (response) {
                console.log("Successfully changed password!");
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //Checks if ID is associated with a given email
    async componentDidMount() {
        let valid;
        await axios.get('http://localhost:9000/user/verifyID/' + this.props.location.pathname.split('/')[2])
            .then(function (response) {
                console.log(response)
                valid = true;
            })
            .catch(function (error) {
                console.log(error);
                valid = false;
            });
        this.setState({ valid })
    }

    render() {
        return (this.state.valid ?
            <form onSubmit={this.sendEmail}>
                <h1> Reset your Password: </h1>
                <p>Password: </p>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Enter new password here" name="password" onChange={this.changeHandler} />
                </div>
                <Button className="" type="submit">Send</Button>
            </form>
            : <div>
                <h1> User not found! </h1>,
                <Button className="" href="/"> Home </Button>
            </div>);
    }
}

export default ResetPassword;