import React,{useEffect,useState} from 'react';
import {useFirebase} from '../context/Firebase';
import BookCard from '../components/Cards';
import { Container, Row, Col } from 'react-bootstrap';

const HomePage=()=>{
    const firebase = useFirebase();
    const [books,setBooks]=useState([]);
    useEffect(()=>{
        firebase.listAllBooks().then((books)=>setBooks(books.docs));
    },[firebase])
    return(
        <Container className="my-5">
            <Row>
                {books.map((book) => (
                    <Col key={book.id} sm={12} md={6} lg={4} xl={3}  className="mb-4 d-flex justify-content-center">
                        <BookCard link={`/book/${book.id}`} id={book.id} {...book.data()} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
export default HomePage;
