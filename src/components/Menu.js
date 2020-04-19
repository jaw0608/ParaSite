import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap/';

export default function Menu() {

    const logout = () => {

    }

    return (
        <div className="container-fluid">
            <h1 className="text-center logo"> MENU </h1>
            <div className="row justify-content-around">
                <div className="col-sm-4 bg-secondary border border-primary">
                    <h2 className="logo text-center"> Profile </h2>
                    <h4 className="text-left logo"> Username</h4>
                    <h4 className="text-left logo"> Wins </h4>
                    <h4 className="text-left logo"> Losses </h4>
                </div>
                <div className="col-sm-7 bg-primary border border-secondary">
                    <div className="row">
                        <div className="col-4 p-1">
                            <Button variant="dark" className="btn-block">Play</Button>
                        </div>
                        <div className="col-4 p-1">
                            <Button variant="dark" className="btn-block">Options </Button>
                        </div>
                        <div className="col-4 p-1">
                            <Button href="/" variant="dark" className="btn-block">Back to Main Menu</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}