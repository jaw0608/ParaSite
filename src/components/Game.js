import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

const Game = (players) => {
    const getRows = (players) => {
        // 4 players per row
        let playerEntries = [];
        const rows = parseInt(players/4);
        const remainder = players%4;

        console.log(rows, remainder);
        for (let i = 0; i < rows; i++){
            playerEntries.push([])
            for (let j = 0; j < 4; j++) {
                playerEntries[i].push(j)
            }
        }

        if (remainder > 0) {
            playerEntries.push([]);
            for (let i = 0; i < remainder; i++) {
                playerEntries[playerEntries.length-1].push(i)
            }
        }

        console.log(playerEntries);

        return (
            <Container>
                {playerEntries.map(row => <RowComponent players={row}/>)}
            </Container>
        )
    }

    return (
        <Container>
            <Row><h1 className='titleText'> Game </h1> </Row>
            <Row>
                  {getRows(14)}
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
    console.log(players);

    return (
        <Row>
            {players.map(player => <Col className='room'>{player}</Col>)}
        </Row>
    )
}

export default Game;