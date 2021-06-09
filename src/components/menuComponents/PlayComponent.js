import React, { useState } from 'react';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import { io } from 'socket.io-client';
import { useHistory } from 'react-router-dom';

const socket = io('localhost:9001');


export const PlayTab = ({state, setState}) => {
    const history = useHistory();

    socket.on('gameCode', (gameCode) => {
        console.log('gameCode', gameCode)
        setState((prevState) => {
            return {...prevState, gameCode: gameCode}
        });
    });

    socket.on('successfulJoin', (gameCode) => {
        console.log('successful join play component side at:', gameCode)
        history.push('/game', state)
    })

    return (
        <Container>
            <Row sm={12} md={12} lg={12} xl={12}>
                <Col s={{ span: 4, offset: 4}}>
                    <h1 className='titleText text-center'> 
                        Play 
                    </h1>
                </Col>
            </Row>
            <Row>
                <PlayComponent state={state} buttonText={'Create a Game'} func={createGame} detailText={'Create a new game - you will be given a game code to share with your friends'} history={history}/>
                <PlayComponent state={state} setState={setState} buttonText={'Join a Game'} func={joinGame} detailText={'Join a game - you will be prompted to enter a game code to play.'} history={history}/>
                <Col xs={12} sm={6} className='playColumn'>
                </Col>
            </Row>
        </Container>
    )
}

const PlayComponent = ({state, setState, buttonText, detailText, history, func}) => {
    const [showModal, setShowModal] = useState(false);

    // console.log(state)
    
    const handleClose = () => { setShowModal(false); }
    const handleShow = () => { setShowModal(true); }
    const type = buttonText.split(' ')[0];

    return (
        <Col className='text-center' xs={12} sm={6}>
            <Button onClick={handleShow}> {buttonText} </Button>
            <p>
                {detailText}
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title> {buttonText} </Modal.Title>
                    </Modal.Header>
                    <DetailComponent gameCode={state.gameCode} type={type} detailText={detailText}/>
                    <Modal.Footer>
                        <FormComponent state={state} setState={setState} history={history} type={type} func={func}/>
                    </Modal.Footer>
                </Modal>
            </p>
        </Col>
    )
}

const FormComponent = ({type, func, history, state, setState}) => {
    let body = '';
    const [gameCode, setGameCode] = useState('');
    const handleChangeGameCode = (e) => {
        e.persist();
        setGameCode(e.target.value)
    }
    switch(type) {
        case 'Create':
            body = state.gameCode === '' ?<> <Button type='submit' variant='secondary'>{type}</Button> </> : <Button onClick={() => { history.push({pathname: '/game', state })}}>Go to Game</Button>;
            break;
        case 'Join':
            body = <><input type='text' onInput={handleChangeGameCode} /> <Button type='submit' variant='secondary'> {type} </Button></>;
            break;
        default:
            break;
    }
    return <Form onSubmit={(e) => { func(e, state, gameCode) }
    }>{body}</Form>
}

const DetailComponent = ({gameCode, type, detailText}) => {
    let info = '';
    // console.log(gameCode, type, detailText)
    switch(type) {
        case 'Create':
            info = gameCode !== '' ? 'Your game code is: ' + gameCode : detailText;
            break; 
        case 'Join':
            info = detailText;
            break;
        default:
            break;
    }
    return <Modal.Body> {info} </Modal.Body>
}

const createGame = (e) => {
    // Create room object upload to mongo 
    e.preventDefault();
    socket.emit('createGame');
}

const joinGame = (e, state, gameCode) => {
    e.preventDefault();
    console.log(e, state, gameCode);
    socket.emit('joinGame', state, gameCode)
}