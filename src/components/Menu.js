import React, { Component } from 'react';
import { Navbar, Nav, Tab, Row, Col, Container, Button } from 'react-bootstrap';

class Menu extends Component {
    render() {
        return (
            <Container fluid className='menuPane'>
                <Navbar bg="light" fixed="top">
                    <Navbar.Brand>ParaSite</Navbar.Brand>
                    <Nav className='mr-auto'>
                        <Nav.Link href='/'>Home</Nav.Link>
                    </Nav>
                </Navbar>
                <Tab.Container defaultActiveKey="profile">
                    <Row>
                        <Col sm={2} md={2} lg={2} xl={2}>
                            <Nav fill justify variant="tabs" defaultActiveKey='profile'>
                                <Nav.Item>
                                    <Nav.Link eventKey='profile'> Profile </Nav.Link>
                                </Nav.Item>
                                <Nav.Item> 
                                    <Nav.Link eventKey='play'> Play </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col m={10} md={10} lg={10} xl={10}>
                            <Tab.Content>
                                <Tab.Pane eventKey='profile'>
                                    Full Name: First Last <br/>
                                    Screen Name: placeholder<br/>
                                    Email: email@email.com<br/>
                                    <Button> Change Password </Button>
                                </Tab.Pane>
                                <Tab.Pane eventKey='play'>
                                    <Button> Play </Button>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        )
    }
}

export default Menu;