import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { BiRightArrowCircle, BiLeftArrowCircle } from 'react-icons/bi';

export const ProfileTab = ({state, setState, accessories}) => {
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
          <Col> <Image className='mx-auto d-block' src="https://via.placeholder.com/120"></Image> </Col>
          <Col s={{ span: 3, offset: 3}}>
            <BiRightArrowCircle className='profileArrow mx-auto d-block' onClick={onClick}/> 
          </Col> 
        </Row>
    )
}
