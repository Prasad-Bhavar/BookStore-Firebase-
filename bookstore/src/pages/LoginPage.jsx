import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import { useNavigate } from 'react-router-dom';
//css
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const LoginPage = () => {

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
            console.log('log in user...');
            const result = await firebase.signInUserWithEmailAndPassword(email, password);
            console.log('successful', result);
        } catch (err) {
            console.log("error", err)
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
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={e => setPassword(e.target.value)}
                        value={password} type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    login
                </Button>

            </Form>
            <div className="col-8 offset-3">
                <h3>or</h3>
                <Button onClick={firebase.signInWithGoogle} variant="danger" type="submit">
                    signIn with Google
                </Button>
            </div>
        </div>
    )
}

export default LoginPage;