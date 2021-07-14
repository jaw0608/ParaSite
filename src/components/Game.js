import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client'
import { useLocation } from 'react-router-dom';
import ScrollableFeed from 'react-scrollable-feed';

const socket = io('localhost:9001')

const Game = () => {
    const [chat, setChat] = useState([])
    const tempState = useLocation().state;
    const [message, setMessage] = useState({message: '', name: tempState.mainState.user.username});
    const gameCode = tempState.gameCode;
    const user = tempState.mainState.user;
    
    let players = [user];

    /**
     * Initializes connection with Socket.io server
     */
    // socket.on("message", ({ name, message }) => {
    //     console.log(name, message)
    //     setChat([ ...chat, { name, message } ])
    // })

    // socket.on('successfulJoinGame', ({player, code}) => {
    //     console.log('successful join game side at:', code)
    //     if (code === gameCode) {
    //         players.push(player);
    //     }
    // })

    useEffect(
		() => {
			socket.on("message", ({ name, message }) => {
                console.log(name, message)
				setChat([ ...chat, { name, message } ])
			})

            socket.on('successfulJoin', ({code}) => {
                console.log('successful Join code:', code)
            })
            socket.on('successfulJoinGame', ({player, code}) => {
                console.log('successful join game side at:', code)
                if (code === gameCode) {
                    players.push(player);
                }
            })
		},
		[ chat, players, gameCode ]
	)

    /**
     * This will dynamically change the state message and is called whenever the message in the chat box changes
     * @param {event} e 
     */
    const changeMessage = (e) => {
        setMessage(prevState => {return {...prevState, message: [e.target.value]}})
        e.persist();
    }

    /**
     * This will send the message when the user clicks send on the chat box
     * @param {event} e 
     */
    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit("message", {name: message.name, message: message.message})
        setMessage({ message: '', name: message.name })
    }

    /**
     * returns chat object with messages loaded in order chronologically
     * @returns {*} Chat container
     */
    const renderChat = () => {
		return chat.map(({ name, message }, index) => (
			<div key={index}>
                {name}: <span>{message}</span>
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
        const rows = parseInt(players.length/4);
        const remainder = players.length%4;
 
        for (let i = 0; i < rows; i++){
            playerEntries.push([])
            for (let j = 0; j < 4; j++) {
                playerEntries[i].push(players[i*j].username)
            }
        }

        if (remainder > 0) {
            const playersSoFar = rows*4;
            playerEntries.push([]);
            for (let i = playersSoFar; i < playersSoFar + remainder; i++) {
                playerEntries[playerEntries.length-1].push(players[i].username)
            }
        }

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
                  {getRows(players)}
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
            <Form.Control type='text' placeholder='Type message here' onChange={e => changeMessage(e)} value={message.message}/>
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
    return (
        <Row>
            {players.map(player => <Col className='room'>{player}</Col>)}
        </Row>
    )
}

export default Game;
