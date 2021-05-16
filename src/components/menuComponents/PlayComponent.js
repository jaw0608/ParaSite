import React, { useState } from 'react';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import { io } from 'socket.io-client';

const socket = io('localhost:9000');

export const PlayTab = ({state, show}) => {
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
                <PlayComponent state={state} buttonText={'Create a Game'} func={createGame} detailText={'Create a new game - you will be given a game code to share with your friends'} link={'/game'}/>
                <PlayComponent state={state} buttonText={'Join a Game'} func={joinGame} detailText={'Join a game - you will be prompted to enter a game code to play.'} link={'/game'}/>
                <Col xs={12} sm={6} className='playColumn'>
                </Col>
            </Row>
        </Container>
    )
}

const PlayComponent = ({state, buttonText, detailText, link, func}) => {
    const [showModal, setShowModal] = useState(false);
    
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
                        <FormComponent type={type} gameCode={state.gameCode} func={func}/>
                    </Modal.Footer>
                </Modal>
            </p>
        </Col>
    )
}

const FormComponent = ({type, gameCode, func}) => {
    let body = '';
    switch(type) {
        case 'Create':
            body = gameCode === '' ? <Button type='submit' variant='secondary'>{type}</Button> : <></>;
            break;
        case 'Join':
            body = <><input type='text'/> <Button type='submit' variant='secondary'> {type} </Button></>;
            break;
    }
    return <Form onSubmit={func}>{body}</Form>
}

const DetailComponent = ({gameCode, type, detailText}) => {
    let info = '';
    switch(type) {
        case 'Create':
            info = gameCode !== '' ? 'Your game code is: ' + gameCode : detailText;
            break; 
        case 'Join':
            info = detailText;
    }
    return <Modal.Body> {info} </Modal.Body>
}

const createGame = (e) => {
    // Create room object upload to mongo 
    e.preventDefault();
    console.log('create game?')
    socket.emit('createGame');
}

const joinGame = (e, code) => {
    e.preventDefault();
    socket.emit('joinGame', code)
}
