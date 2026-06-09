import React,{useEffect,useState} from 'react';
import {useFirebase} from '../context/Firebase';
import { Button, Container, Row, Col } from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { toast } from 'react-toastify';
const BookDetailPage=()=>{
    const params = useParams();
    const firebase = useFirebase();
    const [data,setData]=useState(null);
    const [quantity,setQuantity]=useState(1);

    useEffect(()=>{
 firebase.getBookById(params.id).then((result)=>setData(result.data()));
    },[firebase,params.id])
    if(data==null)
        return(
    <h1>
        Loading......
    </h1>
    )

    const placeOrder=async()=>{
        try{
       await firebase.placeOrder(params.id,quantity)
       toast.success('Order placed successfully')
       console.log(firebase.user)
        }
        catch(error)
        {
            console.log(error)
            toast.error('Order Booking Failed')
        }
    }
    return (
        <Container className='mt-5'>
            <Row>
                <Col md={6} >
                    <img alt={data.name} src={data.cover} className="p-1 img-fluid rounded border border-3  border-warning" />
                </Col>
                <Col md={6} >
                    <h1>{data.name}</h1>
                    <h4 className='my-3 text-muted'>Price: ${data.price}</h4>
                    <h5 className='mt-4'>Owner Details</h5>
                    <Card className="mt-2 mb-4">
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <strong>Name:</strong> {data.displayName}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Email:</strong> {data.userEmail}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>ISBN:</strong> {data.isbn}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>

                    <Form.Group className="mb-3" controlId="formQuantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control 
                          type="number" 
                          placeholder="Enter quantity" 
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          min="1"
                        />
                    </Form.Group>
                    <Button onClick={placeOrder} variant='success' size="lg" className='w-100'>
                        Buy Now
                    </Button> 
                </Col>
            </Row>
        </Container>
    )
}
export default BookDetailPage;