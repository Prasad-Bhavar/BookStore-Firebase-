import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
const BookCart = (props) => {

    const navigate = useNavigate();

    return (
        <Card style={{ width: '18rem', margin: '0.5rem' }}>
            {/* <Card.Img variant="top" src={`${props.userImg}`} /> */}
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                    This book author is {props.userName} and the cost of book is {props.price}

                </Card.Text>
                <Button onClick={() => { navigate(props.links) }} variant="primary">View</Button>
            </Card.Body>
        </Card>
    )
}

export default BookCart;