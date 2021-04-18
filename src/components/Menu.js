import React, { useState } from 'react';
import { Navbar, Nav, Tab, Row, Col, Container, Button, Image } from 'react-bootstrap';
import Avatar from 'react-avatar-edit';
import { BiRightArrowCircle, BiLeftArrowCircle } from 'react-icons/bi';
const Menu = () => {
    const [state, setState] = useState({preview: null, src: null, head: null, body: null, legs: null, shoes: null });

    const handleProfilePic = (e) => {
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
            {/* <Navbar bg="light" fixed="top" expanded={true}>
                <Navbar.Brand>ParaSite</Navbar.Brand>
                <Nav className='mr-auto'>
                    <Nav.Link href='/'>Home</Nav.Link>
                </Nav>
            </Navbar> */}
        <Container fluid className='menuPane'>
            <Tab.Container defaultActiveKey="profile">
                <Row>
                    <Col sm={2} md={2} lg={2} xl={2}>
                        <Nav fill justify variant="tabs" defaultActiveKey='profile'>
                            <Container>
                                <Row className='menuTab' sm={12} md={12} lg={12} xl={12}>
                                    <Nav.Item>
                                        <Nav.Link eventKey='profile'> Profile </Nav.Link>
                                    </Nav.Item>
                                </Row>
                                <Row className='menuTab' sm={12} md={12} lg={12} xl={12}>
                                    <Nav.Item>
                                        <Nav.Link eventKey='play'> Play </Nav.Link>
                                    </Nav.Item>
                                </Row>
                                <Row className='menuTab' sm={12} md={12} lg={12} xl={12}>
                                    <Nav.Item>
                                        <Nav.Link eventKey='options'> Options </Nav.Link>
                                    </Nav.Item>
                                </Row>
                                <Row className='menuTab' sm={12} md={12} lg={12} xl={12}>
                                    <Nav.Item>
                                        <Nav.Link eventKey='Log Out'> Log Out </Nav.Link>
                                    </Nav.Item>
                                </Row>
                            </Container>
                        </Nav>
                    </Col>
                    <Col m={10} md={10} lg={10} xl={10}>
                        <Tab.Content>
                            <Tab.Pane eventKey='profile'>
                                <ProfileTab state={state} setState={setState} accessories={fetchAccessories()}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey='play'>
                                <PlayTab />
                            </Tab.Pane>
                            <Tab.Pane eventKey='options'>
                                <OptionsTab state={state} setState={handleProfilePic}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey='logout'>
                                <Button> Log Out </Button>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
        </>
    )
}

const ProfileTab = ({state, setState, accessories}) => {
    return (
        <Container>
            <Row sm={12} md={12} lg={12} xl={12}>
                <Col></Col>
                <Col>
                    <h1 className='titleText'>
                        Profile
                    </h1>
                </Col>
                <Col></Col>
            </Row>
            <AvatarCustomizeRow accessory={accessories.heads} state={state} setState={setState}/>
            <AvatarCustomizeRow accessory={accessories.bodies} state={state} setState={setState}/>
            <AvatarCustomizeRow accessory={accessories.legs} state={state} setState={setState}/>
            <AvatarCustomizeRow accessory={accessories.shoes} state={state} setState={setState}/>
            <Row>
                <Col></Col>
                <Col>
                    <Button> Save Changes </Button>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}

const AvatarCustomizeRow = (accessory, state) => {
    function onClick () {
        console.log('onclick works')
        return null;
    }
    return (
        <Row>
          <Col></Col>
          <Col>
            <BiLeftArrowCircle className='profileArrow' onClick={onClick}/>
          </Col>
          <Col> <Image src="https://via.placeholder.com/75"></Image> </Col>
          <Col>
            <BiRightArrowCircle className='profileArrow' onClick={onClick}/> 
          </Col> 
          <Col></Col>
        </Row>
    )
}

const PlayTab = () => {
    return (
        <Container>
            <Row sm={12} md={12} lg={12} xl={12}>
                <Col></Col>
                <Col>
                    <h1 className='titleText'> 
                        Play 
                    </h1>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col xs={12} sm={6} lg={3}>
                    <Button href='/game'> Play Solo </Button>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim facilisis gravida neque convallis a cras.
                    </p>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                    <Button href='/game'> Play with Party </Button>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec.
                    </p>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                    <Button href='/game'> Play with Friends </Button>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat id porta nibh venenatis.
                    </p>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                    <Container>
                        <Row>
                            <Col></Col>
                            <Col>
                                <h2 className='titleText'>Party</h2>
                            </Col>
                            <Col></Col>
                        </Row>
                        <Row>
                            <div className='partyBox'></div>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

const OptionsTab = (handlers) => {
    const [state, setState] = [handlers.state, handlers.setState];

    const onCrop = (preview) => {
        setState(prevState => {
            return {...prevState, preview: preview}
        })
    }

    const onClose = () => {
        setState(prevState => {
            return {...prevState, preview: null}
        })
    }

    return (
        <Container>
            <Row>
                <Col sm={6} md={6} lg={6} xl={6}>
                    <Container>
                        <Row sm={12} md={12} lg={12} xl={12}>
                            <Col></Col>
                            <Col>
                                <h1 className='titleText'>Options
                                </h1>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Container>
                    <Container className='profileData'>
                        <Row>Full Name: First Last <br /></Row>
                        <Row>Screen Name: placeholder<br /> </Row>
                        <Row>Email: email@email.com<br /> </Row>
                        <Row> 
                            <Button> Change Password </Button>
                            <Button> Save Changes </Button>
                        </Row>
                    </Container>
                </Col>
                <Col sm={6} md={6} lg={6} xl={6}>
                    <Avatar
                        width={390}
                        height={295}
                        onCrop={onCrop}
                        onClose={onClose}
                        src={state.src}
                    />
                    <Button>Upload</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Menu;