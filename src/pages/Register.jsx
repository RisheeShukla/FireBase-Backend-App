import React, { useState,useEffect } from 'react';
import { Container,Card } from "react-bootstrap";

import {useFirebase} from '../context/Firebase';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const RegisterPage=()=>{
    const firebase=useFirebase();
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    useEffect(()=>{
        if(firebase.isLoggedIn){
            toast.success("Already logged in");
            navigate("/");
            
        }
    },[firebase,navigate])
    const  handleNavigate=()=>{
        navigate("/login");
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await firebase.signupUserWithEmailAndPassword(name,email,password);
            toast.success("Account created successfully");
            navigate("/login");
        }
        catch(err){
            toast.error("Registration failed");
            console.log(err);
        }
    }

    return(
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card className='p-2 bg-dark text-white'>
                    <Card.Body>
                        <h2 className="text-center mb-4 text-primary">Register</h2>
                        <Form onSubmit={handleSubmit} >


                            <Form.Group className="mb-3" controlId="formBasic">
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                  type="text" 
                                  placeholder="Enter Name" 
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                  type="email" 
                                  placeholder="Enter email" 
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                  type="password" 
                                  placeholder="Password" 
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  required
                                />
                            </Form.Group>
                            
                            <Button variant="primary" type="submit" className="w-100 mb-2">
                                Create Account
                            </Button>

                            <Button
                                variant="danger"
                                onClick={handleNavigate}
                                className="w-100 mt-3 mb-2"
                            >
                               Login
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}

    export default RegisterPage;