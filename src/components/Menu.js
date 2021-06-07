/* Library dependencies */
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Nav, Tab, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';

/* Sub Components */
import { PlayTab } from './menuComponents/PlayComponent';
import { ProfileTab } from './menuComponents/ProfileComponent';
import { OptionsTab } from './menuComponents/OptionComponent';


const Menu = ({state, setState}) => {
    // const authState = useLocation().state;
    // const user = authState.user;
    const [localState, setLocalState] = useState({mainState: state, profilePicture: null, src: null, head: null, body: null, legs: null, shoes: null, show: false, gameCode: '' });

    // console.log(state)
    const fetchAccessories = () => {
        // FETCH IMAGE DATA FROM DB AND PUSH INTO DICTIONARY
        return {heads: [], bodies: [], legs: [], shoes: []}
    }

    const onLogOut = (e) => {
        axios.delete('http://localhost:9000/users/logout', (response) => {
            console.log(response);
        })
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
                                            <Nav.Link href='/' onClick={onLogOut}> Log Out </Nav.Link>
                                        </Nav.Item>
                                    </Col>
                                </Row>
                            </Container>
                        </Nav>
                    </Col>
                    <Col sm={12}>
                        <Tab.Content>
                            <Tab.Pane eventKey='profile'>
                                <ProfileTab state={localState} setState={setLocalState} accessories={fetchAccessories()}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey='play'>
                                <PlayTab state={localState} setState={setLocalState}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey='options'>
                                <OptionsTab state={localState} setState={setLocalState}/>
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