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

const AvatarCustomizeRow = ({accessory, state}) => {

    const onClickLeft = () => {
        console.log('onclick works')
        return null;
    }

    const onClickRight = () => {
        console.log('onclickright works')
        return null;
    }

    return (
        <Row>
          <Col xs={12, {order: 2}} sm={3, {order: 1}}>
            <BiLeftArrowCircle className='profileArrow mx-auto d-block' onClick={onClickLeft}/>
          </Col>
          <Col sm={6, {order: 2}}> <Image className='mx-auto d-block' src="https://via.placeholder.com/120"></Image> </Col>
          <Col xs={12, {order: 2}} sm={3, {order: 3}}>
            <BiRightArrowCircle className='profileArrow mx-auto d-block' onClick={onClickRight}/> 
          </Col> 
        </Row>
    )
}
