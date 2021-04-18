import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

export default function Game() {
    return (
        <Container>
            <Row><h1 className='titleText'> Game </h1> </Row>
            <Row>
                <Button>Attack</Button>
                <Button>Defend</Button>
                <Button>Betray</Button>
            </Row>
        </Container>
    )
}