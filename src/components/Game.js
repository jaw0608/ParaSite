import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client'
import { useLocation } from 'react-router-dom';
import ScrollableFeed from 'react-scrollable-feed';

const Game = (players) => {
    const [state, setState] = useState({message: '', name: ''});
    const [chat, setChat] = useState([])
    const socketRef = useRef();
    const tempState = useLocation().state;
    const gameCode = tempState.gameCode;
    const user = tempState.user;

    /**
     * Initializes connection with Socket.io server
     */
    useEffect(
		() => {
			socketRef.current = io.connect("http://localhost:9001")
			socketRef.current.on("message", ({ name, message }) => {
				setChat([ ...chat, { name, message } ])
			})
			return () => socketRef.current.disconnect()
		},
		[ chat ]
	)
    
    /**
     * This will dynamically change the state message and is called whenever the message in the chat box changes
     * @param {event} e 
     */
    const changeMessage = (e) => {
        console.log(state, e.target.value)
        setState(prevState => {return {...prevState, message: [e.target.value]}})
        e.persist();
    }

    /**
     * This will send the message when the user clicks send on the chat box
     * @param {event} e 
     */
    const sendMessage = (e) => {
        const { name, message } = state;
        socketRef.current.emit("message", {name, message})
        e.preventDefault();
        setState({ message: '', name })
    }

    /**
     * returns chat object with messages loaded in order chronologically
     * @returns {*} Chat container
     */
    const renderChat = () => {
        console.log(chat);
		return chat.map(({ recipient, message }, index) => (
			<div key={index}>
                {user.username}: <span>{message}</span>
			</div>
		))
	}

    /**
     * 
     * @param {number} players Amount of players in game 
     * @returns {*} returns container with player entries and rows
     */
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
            <Row>
                <Col>
                    <h1 className='titleText text-center'> Game </h1> 
                </Col>
            </Row>
            <h3> Your game code is: {gameCode} </h3>
            <Row>
                  {getRows(14)}
            </Row>
            <Row>
                <Button>Attack</Button>
                <Button>Defend</Button>
                <Button>Betray</Button>
            </Row>
        <Form onSubmit={sendMessage}>
            <ScrollableFeed className='chatBox'>
                {renderChat()}
            </ScrollableFeed>
            <Form.Control type='text' placeholder='Type message here' onChange={e => changeMessage(e)} value={state.message}/>
            <Button variant='primary' type='submit'>
                Submit
            </Button>
        </Form>
        </Container>
    )
}

/**
 * 
 * @param {dic} players list of player objects
 * @returns Row of players in container
 */
const RowComponent = ({players}) => {
    console.log(players);
    return (
        <Row>
            {players.map(player => <Col className='room'>{player}</Col>)}
        </Row>
    )
}

export default Game;