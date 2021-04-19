import React, { useState } from 'react';
import { Navbar, Nav, Tab, Row, Col, Container, Button, Image, Link } from 'react-bootstrap';
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
            /* <Navbar bg="light" fixed="top" expanded={true}>
                <Navbar.Brand>ParaSite</Navbar.Brand>
                <Nav className='mr-auto'>
                    <Nav.Link href='/'>Home</Nav.Link>
                </Nav>
            </Navbar> */
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
                                <PlayTab />
                            </Tab.Pane>
                            <Tab.Pane eventKey='options'>
                                <OptionsTab state={state} setState={handleProfilePic}/>
                            </Tab.Pane>
                            {/* <Tab.Pane eventKey='logout'>
                                <Button> Log Out </Button>
                            </Tab.Pane> */}
                        </Tab.Content>
                    </Col>
                </Row>
        </Tab.Container>
    </Container>
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

const ProfileTab = ({state, setState, accessories}) => {
    return (
        <Container>
            <Row sm={12} md={12} lg={12} xl={12}>
                <Col sm={{ span: 4, offset: 4 }}>
                    <h1 className='titleText text-center'>
                        Profile
                    </h1>
                </Col>
            </Row>
            <AvatarCustomizeRow accessory={accessories.heads} state={state} setState={setState}/>
            <AvatarCustomizeRow accessory={accessories.bodies} state={state} setState={setState}/>
            <AvatarCustomizeRow accessory={accessories.legs} state={state} setState={setState}/>
            <AvatarCustomizeRow accessory={accessories.shoes} state={state} setState={setState}/>
            <Row>
                <Col sm={{ span: 4, offset: 4}} className='text-center'>
                    <Button> Save Changes </Button>
                </Col>
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
          <Col s={{ span: 3, offset: 3 }}>
            <BiLeftArrowCircle className='profileArrow mx-auto d-block' onClick={onClick}/>
          </Col>
          <Col> <Image className='mx-auto d-block' src="https://via.placeholder.com/75"></Image> </Col>
          <Col s={{ span: 3, offset: 3}}>
            <BiRightArrowCircle className='profileArrow mx-auto d-block' onClick={onClick}/> 
          </Col> 
        </Row>
    )
}

const PlayTab = () => {
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
                <PlayComponent buttonText={'Play Solo'} detailText={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim facilisis gravida neque convallis a cras.'} link={'/game'}/>
                <PlayComponent buttonText={'Play with Party'} detailText={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec.'} link={'/game'}/>
                <PlayComponent buttonText={'Play with Friends'} detailText={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat id porta nibh venenatis.'} link={'/game'}/>
                <Col xs={12} sm={6} lg={3} className='playColumn'>
                    <Container>
                        <Row>
                            <Col sm={{ span: 3, offset: 3}}>
                                <h2 className='titleText text-center'>Party</h2>
                            </Col>
                        </Row>
                            <PartyEntry name={'Manny'}/>
                            <PartyEntry name={'Joe'}/>
                            <PartyEntry name={'Brianna'}/>
                        <Row>

                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

const PartyEntry = ({name}) => {
    return(<p className='text-center partyEntry'>{name}</p>)
}

const PlayComponent = ({buttonText, detailText, link}) => {
    console.log(buttonText, detailText, link)
    return (
        <Col className='text-center' xs={12} sm={6} lg={3}>
            <Button href={link}> {buttonText} </Button>
            <p>
                {detailText}
            </p>
        </Col>
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
                            <Col sm={{ span: 4, offset: 4}}>
                                <h1 className='titleText text-center'>Options
                                </h1>
                            </Col>
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