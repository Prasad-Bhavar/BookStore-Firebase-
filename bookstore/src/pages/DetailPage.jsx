import { useParams } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import { useEffect } from "react";
import { useState } from "react";

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/esm/Button";

const DetailPage = () => {

    const params = useParams();
    const firebase = useFirebase();
    // console.log(params);
    const [bookData, setBookData] = useState(null);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        firebase.getViewPage(params.id).then((res) => { setBookData(res.data()) });
    }, [])
    // console.log(bookData);

    const handleOrder = async () => {
        const result = await firebase.placeOrder(params.id, qty);
        console.log("order",result);
    }

    if (bookData == null) {
        return (
            <h1>loading...</h1>
        )
    }
    return (
        <div>
            <Card style={{ width: '18rem' }} className="mt-3 ms-3">
                <Card.Header><b>Book Details</b></Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item><b>Book Name: </b>{bookData.name}</ListGroup.Item>
                    <ListGroup.Item><b>price:</b> {bookData.price}</ListGroup.Item>
                    <ListGroup.Item><b>Author:</b> {bookData.userName}</ListGroup.Item>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Quantity: </Form.Label>
                        <Form.Control onChange={e => setQty(e.target.value)}
                            value={qty}
                            type="NUMBER" placeholder="Enter Qty" />
                    </Form.Group>
                </ListGroup>
                <Button onClick={handleOrder} variant="success">Buy Book</Button>
            </Card>
        </div>
    )
}

export default DetailPage;