/* Library dependencies */
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Nav, Tab, Row, Col, Container } from 'react-bootstrap';
import { io } from 'socket.io-client';

/* Sub Components */
import { PlayTab } from './menuComponents/PlayComponent';
import { ProfileTab } from './menuComponents/ProfileComponent';
import { OptionsTab } from './menuComponents/OptionComponent';

const socket = io('localhost:9000');

const Menu = () => {
    const [state, setState] = useState({preview: null, src: null, head: null, body: null, legs: null, shoes: null, user: useLocation().state.user, show: false, gameCode: '' });

    socket.on('gameCode', (gameCode) => {
        setState((prevState) => {
            return {...prevState, gameCode: gameCode}
        });
    });

    const handleProfilePic = (e) => {
        console.log(e)
        setState(prevState => {
            return {...prevState, preview: e}
        })
    }

    const fetchAccessories = () => {
        // FETCH IMAGE DATA FROM DB AND PUSH INTO DICTIONARY
        return {heads: [], bodies: [], legs: [], shoes: []}
    }

    return (
    <>
    <h1 className='titleText'> PARASITE </h1>
    <Container fluid className='menuPane'>
        <Tab.Container defaultActiveKey="profile">
                <Row>
                    <Col sm={12}>
                        <Nav fill justify variant="tabs" defaultActiveKey='profile'>
                            <Container>
                                <Row>
                                    <MenuComponent eventKey={'profile'} tabName={'Profile'}/>
                                    <MenuComponent eventKey={'play'} tabName={'Play'}/>
                                    <MenuComponent eventKey={'options'} tabName={'Options'}/>
                                    <Col className='menuTab' sm={3}>
                                        <Nav.Item>
                                            <Nav.Link href='/'> Log Out </Nav.Link>
                                        </Nav.Item>
                                    </Col>
                                </Row>
                            </Container>
                        </Nav>
                    </Col>
                    <Col sm={12}>
                        <Tab.Content>
                            <Tab.Pane eventKey='profile'>
                                <ProfileTab state={state} setState={setState} accessories={fetchAccessories()}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey='play'>
                                <PlayTab state={state}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey='options'>
                                <OptionsTab state={state} setState={setState}/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
        </Tab.Container>
    </Container>
    </>
    )
}

const MenuComponent = ({tabName, eventKey}) => {
    return (
        <Col className='menuTab' sm={3}>
            <Nav.Item>
                <Nav.Link eventKey={eventKey}> {tabName} </Nav.Link>
            </Nav.Item>
        </Col>
    )
}

export default Menu;
