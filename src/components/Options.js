import React, { useState } from 'react'

export default function Options() {
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmPass, setConfirmPass] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();

    return (
        <div className="container-fluid bg-primary">
            <h1 className="logo text-center m-3"> Options </h1>
        </div>
    )
}