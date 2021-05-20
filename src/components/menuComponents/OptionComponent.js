import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Avatar from 'react-avatar-edit';

export const OptionsTab = (handlers) => {
    const [state, setState] = [handlers.state, handlers.setState];

    // useEffect(()=> {
    //     axios.get('http://localhost:9000/users/getUserByEmail', state)
    //     .then(function(response) {
    //         setState(prevState => {
    //             return {...prevState, profilePicture: response.data.profilePicture}
    //         })
    //     }).catch(function(err) {
    //         console.log(err)
    //     })
    // }, [])

    const onCrop = (profilePicture) => {
        setState(prevState => {
            return {...prevState, profilePicture: profilePicture}
        })
    }

    const onClose = () => {
        setState(prevState => {
            return {...prevState, profilePicture: null}
        })
    }

    const uploadPic = (e, state) => {
        e.preventDefault();
        console.log('upload pic')
        console.log(state);
        axios.post('http://localhost:9000/users/updateProfilePic', state)
        .then(function (response) {
            console.log(response.data);
        }).catch(function(err) {
            console.log(err)
        })
        return;
    }

    return (
        <Container>
            <Col sm={12}>
                <h1 className='titleText text-center'>Options </h1>
            </Col>
            <Row>
                <Col sm={6} md={6} lg={6} xl={6}>
                    <Container>
                        <Row>Full Name: {state.user.firstName} {state.user.lastName} <br /></Row>
                        <Row>Screen Name: {state.user.username} <br /> </Row>
                        <Row>Email: {state.user.email} <br /> </Row>
                        <Row> 
                            <Button> Change Password </Button>
                        </Row>
                    </Container>
                </Col>
                <Col sm={6} md={6} lg={6} xl={6}>
                    <Form onSubmit={e => {uploadPic(e, state)}}>
                        <img src={state.profilePicture} alt="Profile Pic"/>
                        <Avatar
                            width={256}
                            height={256}
                            onCrop={onCrop}
                            onClose={onClose}
                            src={state.src}
                            />
                        <Button type='submit'>Upload</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}