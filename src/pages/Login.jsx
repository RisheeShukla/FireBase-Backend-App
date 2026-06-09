import { Container, Card} from "react-bootstrap";
import React, { useState,useEffect } from 'react';
import {useFirebase} from '../context/Firebase';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const LoginPage=()=>{
    const firebase=useFirebase();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    useEffect(()=>{
        if(firebase.isLoggedIn){
            console.log("Already logged in");
            navigate("/");
        }
    },[firebase,navigate])

    const  handleNavigate=()=>{
        navigate("/register");
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
          await firebase.signinUserWithEmailAndPassword(email,password);
        
        toast.success("Login successful");
        navigate("/");
        }
        catch(err){
            toast.error("Login failed");
            console.log(err);
        }
    }

    const handleGoogleSubmit=async(e)=>{
        e.preventDefault();
        try{
           await firebase.signinUserWithGoogle();
        toast.success("Login successful with Google");
        }
        catch(err){
            toast.error("Login failed with Google");
            console.log(err);
        }
    }

    return(
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card className="bg-dark p-2 text-white">
                    <Card.Body>
                        <h2 className="text-center mb-4 text-primary">Log In</h2>
                        <Form onSubmit={handleSubmit}>
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
                            
                            <Button variant="primary" type="submit" className="w-100">
                                Sign In
                            </Button>
                        </Form>
                        <div className="w-100 text-center mt-3">
                            <div className="text-white">OR</div>
                            <Button
                                variant="danger"
                                onClick={handleGoogleSubmit}
                                className="w-100 mt-3"
                            >
                                Sign In with Google
                            </Button>
                            <Button
                                variant="danger"
                                onClick={handleNavigate}
                                className="w-100 mt-3"
                            >
                               Register
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}

    export default LoginPage;