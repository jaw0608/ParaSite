import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function Forgot() {
    const [email, setEmail] = useState();

    const sendEmail = (e, state) => {
        e.preventDefault(); //Prevents page from reloading;
        axios.post('http://localhost:9000/user/forgot', state)
            .then(function (response) {
                console.log("Successfully sent email!");
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (

        <form onSubmit={e => sendEmail(e, {email: email})}>
            <h1> FORGOT PASSWORD </h1>
            <p>Email: </p>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Enter email here" name="email" onChange={e => setEmail(e.target.value)} />
            </div>
            <Button className="" type="submit"> Send </Button>
        </form>
    )
}