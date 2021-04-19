import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

const Game = (players) => {
    const getRows = (players) => {
        // 4 players per row
        const rows = players/4;
        const remainder = players%4;
        for (let i = 0; i < players/4; i++) {
            
        }
        return (
            <Container>
                {rows.map(row => <RowComponent players={row}/>)}
            </Container>
        )
    }

    return (
        <Container>
            <Row><h1 className='titleText'> Game </h1> </Row>
            <Row>
                  <Container>
                      <Row>
                          <Col className='room'> re </Col>
                          <Col className='room'> re </Col>
                          <Col className='room'> re </Col>
                          <Col className='room'> re </Col>
                      </Row>
                  </Container>
            </Row>
            <Row>
                <Button>Attack</Button>
                <Button>Defend</Button>
                <Button>Betray</Button>
            </Row>
        </Container>
    )
}

const RowComponent = ({players}) => {
    return (
        <Row>
            {players.map(player => <Col className='room'>{player}</Col>)}
        </Row>
    )
}

export default Game;