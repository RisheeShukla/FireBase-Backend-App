import React,{useEffect,useState} from 'react';
import { useFirebase } from '../context/Firebase';
import BookCard from '../components/Cards';
import { Container, Row, Col } from 'react-bootstrap';

const OrdersPage=()=>{
    const firebase=useFirebase();
    const [books,setBooks]=useState([]);
    useEffect(()=>{
        if(firebase.isLoggedIn){
            firebase.fetchMyBooks(firebase.user.uid).then((result)=>setBooks(result.docs));
        }
    },[firebase]);



    return (
        <div>
            <h1 className='mt-5 mb-4 justify-content-center align-items-center'>
                My Books
            </h1>
           <Container className="my-5">
            <Row>
                {books.map((book) => (
                    <Col key={book.id} sm={12} md={6} lg={4} xl={3}  className="mb-4 d-flex justify-content-center">
                        <BookCard id={book.id} {...book.data()} link={`/book/orders/${book.id}`} />
                    </Col>
                ))}
            </Row>
        </Container>
            

        </div>
     )
}
export default OrdersPage