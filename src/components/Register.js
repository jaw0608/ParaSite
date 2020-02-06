import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerAccount = (e, state) => {
        //Should pull values once this is clicked
        e.preventDefault(); //Prevents page from refreshing
        console.log(state);
        axios.post('http://localhost:9000/user/register', state)
            .then(function (response) {
                const user = JSON.parse(response.config.data);
                console.log(user);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <form onSubmit={e => registerAccount(e, { firstName: firstName, lastName: lastName, email: email, username: username, password: password, confirmPassword: confirmPassword })}>
            <div className="container">
                <div className="col-12">
                    <h2 className="text-center logo mb-3"> Register </h2>

                    <p>First Name</p>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="First Name" name="firstName" onChange={e => setFirstName(e.target.value)} />
                    </div>

                    <p>Last Name</p>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Last Name" name="lastName" onChange={e => setLastName(e.target.value)} />
                    </div>

                    <p>Email</p>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Email" name="email" onChange={e => setEmail(e.target.value)} />
                    </div>

                    <p>Username</p>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Username" name="username" onChange={e => setUsername(e.target.value)} />
                    </div>

                    <p>Password</p>
                    <div className="input-group mb-3">
                        <input type="password" className="form-control" placeholder="Password" name="password" onChange={e => setPassword(e.target.value)} />
                    </div>

                    <p>Confirm Password</p>
                    <div className="input-group mb-3">
                        <input type="password" className="form-control" placeholder="Confirm Password" name="confirmPassword" onChange={e => setConfirmPassword(e.target.value)} />
                    </div>

                    <Button type="submit" className="pr-3">Register</Button>
                    <Link to="/" className="ml-3">Already have an account?</Link>

                </div>

            </div>
        </form>
    )
}