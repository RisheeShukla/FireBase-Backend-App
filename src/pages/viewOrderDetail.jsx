import React,{useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import {useFirebase} from '../context/Firebase';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card'; 
import { Container, Row ,Col} from 'react-bootstrap';

const OrderDetailPage=()=>{
    const firebase=useFirebase();
    const params=useParams();
     
    const [orders,setOrders]=useState([]);
    useEffect(()=>{
        if(firebase.isLoggedIn){
            firebase.getOrdersByBookId(params.id).then((result)=>setOrders(result.docs))
        }
    },[firebase,params.id])

     
    return (
        <div>
            <Container className='mt-5'>
                <h1 className="text-center mb-5">Orders for this Book</h1>
                {orders.length === 0 ? (
                    <p className="text-center text-muted">No orders found for this book yet.</p>
                ) : (
                    <Row>
                        {orders.map((order, index) => {
                            const data = order.data();
                            return (
                                <Col md={6} lg={4} key={order.id} className="mb-4">
                                    <Card className="h-100 shadow-sm">
                                        <Card.Header as="h5" className="text-primary">
                                            Order #{index + 1}
                                        </Card.Header>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <strong>Buyer:</strong> {data.displayName}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <strong>Email:</strong> {data.userEmail}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <strong>Quantity:</strong> {data.quantity}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>    
                                </Col>
                            );
                        })}
                    </Row>
                )}
                </Container>
            </div>

       
    )

}

export default OrderDetailPage;