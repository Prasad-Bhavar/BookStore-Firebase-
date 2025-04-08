import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/firebase";
import { useNavigate } from 'react-router-dom';
//css
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const RegisterPage = () => {

    const firebase = useFirebase();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (firebase.isLoading) {
            navigate('/');
        }
    }, [navigate, firebase]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('sign in user...');
            const result = await firebase.signUpWithEmailAndPassword(email, password);
            console.log('successful', result);
        } catch (err) {
            console.log("error", err);
        }


    }
    return (
        <div className="container mt-5 ">
            <Form onSubmit={handleSubmit} className="col-8 offset-3" >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={e => setEmail(e.target.value)}
                        value={email}
                        type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={e => setPassword(e.target.value)}
                        value={password} type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create Account
                </Button>
            </Form>
        </div>
    )
}

export default RegisterPage;