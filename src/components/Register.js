import React from 'react';
import Button from 'react-bootstrap/Button';

export default function Register() {
    return (
        <div className="container">
            <div className="offset-md-3 col-6">
                <h2 className="text-center logo mb-3"> Register </h2>

                <p>First Name</p>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="First Name" aria-label="First Name" aria-describedby="firstName" />
                </div>

                <p>Last Name</p>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Last Name" aria-label="Last Name" aria-describedby="lastName" />
                </div>

                <p>Email</p>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Email" aria-label="email" aria-describedby="email" />
                </div>

                <p>Password</p>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="password" />
                </div>

                <p>Confirm Password</p>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Confirm Password" aria-label="Confirm Password" aria-describedby="confirmPassword" />
                </div>

                <Button type="submit">Register</Button>

            </div>

        </div>
    )
}