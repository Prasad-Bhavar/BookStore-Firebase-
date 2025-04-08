import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router-dom';


const AddBook = () => {

    const [name, setName] = useState('');
    const [isbnNunber, setIsbnNumber] = useState('');
    const [price, setPrice] = useState('');
    const [coverPic, setCoverPic] = useState('');
    const navigate = useNavigate();
    const firebase = useFirebase();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await firebase.handleNewListing(name, isbnNunber, price, coverPic);
        navigate('/');
    }

    return (
        <div className="container mt-5 ">
            <Form onSubmit={handleSubmit} className="col-8 offset-3" >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control onChange={e => setName(e.target.value)}
                        value={name}
                        type="text" placeholder="Enter Book Name" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Isbn Number</Form.Label>
                    <Form.Control onChange={e => setIsbnNumber(e.target.value)}
                        value={isbnNunber} type="text" placeholder="Enter Isbn no." required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Book Price</Form.Label>
                    <Form.Control onChange={e => setPrice(e.target.value)}
                        value={price} type="number" placeholder="Enter Book Price" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Book Cover</Form.Label>
                    <Form.Control onChange={e => setCoverPic(e.target.files[0])}
                        type="file" placeholder="Upload cover Pic" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add Book
                </Button>

            </Form>
        </div>
    )
}

export default AddBook;