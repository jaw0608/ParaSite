/* Dependencies */
import React from 'react';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function Login() {
    return (
        <div className="container login-container">
            <h1 className="font-weight-bold logo"> ParaSite </h1>
            <div className="offset-md-3 col-6">
                <h2> Log in </h2>

                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="usernameAddon">Username</span>
                    </div>
                    <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="usernameAddon" />
                </div>

                <div className="input-group mb-2">
                    <div classname="input-group prepend">
                        <span className="input-group-text" id="passwordAddon">Password</span>
                    </div>
                    <input type="text" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="passwordAddon" />
                </div>
                
                <Button className="btn btn-primary mr-2 md-3" type="submit" renderAs={Link}>Log in</Button>
                <Button href="/register" className="btn btn-primary md-3" type="submit" renderAs={Link}>Register</Button>

            </div>
        </div>
    )
}

