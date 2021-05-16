import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Avatar from 'react-avatar-edit';

export const OptionsTab = (handlers) => {
    const [state, setState] = [handlers.state, handlers.setState];

    const onCrop = (preview) => {
        console.log(state, preview);
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
                    <Container>
                        <Row>Full Name: {state.user.firstName} {state.user.lastName} <br /></Row>
                        <Row>Screen Name: {state.user.username} <br /> </Row>
                        <Row>Email: {state.user.email} <br /> </Row>
                        <Row> 
                            <Button> Change Password </Button>
                            <Button> Save Changes </Button>
                        </Row>
                    </Container>
                </Col>
                <Col sm={6} md={6} lg={6} xl={6}>
                    <img src={state.preview} alt="Preview"/>
                    <Avatar
                        width={256}
                        height={256}
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