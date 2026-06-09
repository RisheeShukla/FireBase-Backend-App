import React,{useState}from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col} from "react-bootstrap";
import {useFirebase} from '../context/Firebase';
import { toast } from 'react-toastify';
import bookData from '../components/bookdata';
const ListingPage=()=>{
    const firebase=useFirebase();
    
    const [name,setName]=useState("");
    const [isbnNumber,setIsbnNumber]=useState("");
    const [price,setPrice]=useState("");
    const [image,setImage]=useState("");
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
        await firebase.handleCreateNewListing(name,isbnNumber,price,image)
        toast.success('Book data successfully created')
        }
        catch(error)
        {
            console.log(error)
            toast.error("Book data creation failed")

        }

    }
    return (

        <Container className=" mt-5  bg-info justify-content-center  align-items-center">
            <Row className="w-100% justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={4}>
          <Form onSubmit={handleSubmit} >
            <h1 className='text-dark text-primary mt-4'>Enter Book Details</h1>
      <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
        <Form.Label>Enter Book Name</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter book name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicIsbn">
        <Form.Label>Enter ISBN Number</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter ISBN number" 
          value={isbnNumber}
          onChange={(e) => setIsbnNumber(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPrice">
        <Form.Label>Enter Price</Form.Label>
        <Form.Control 
          type="number" 
          placeholder="Enter price" 
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3 " controlId="formBasicImage">
        <Form.Label>Enter Image URL</Form.Label>
        <div className="d-flex flex-wrap justify-content-center ">
  {bookData.map((book) => {
    // Determine if this specific book is the one currently selected
    const isSelected = image === book.imageUrl;

    return (
      <div 
        key={book.id}
        onClick={() => setImage(book.imageUrl)}
        style={{
          cursor: 'pointer',
          margin: '7px',
          padding: '1px',
          borderRadius: '8px',
          overflow: 'hidden',
          transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
          border: isSelected ? '4px solid #d2dd0d' : '4px solid transparent',
          transform: isSelected ? 'scale(1.05)' : 'scale(1)',
          boxShadow: isSelected ? '0 4px 12px rgba(0,123,255,0.3)' : '0 2px 5px rgba(0,0,0,0.1)',
          // Responsive width behavior for the wrapper card
          width: '80px', 
        }}
      >
        <img 
          src={book.imageUrl} 
          alt={book.title} 
          style={{ 
            width: '100%',     // Fills the 120px parent card completely
            height: '100px',    // Sets a standard book cover aspect ratio
            objectFit: 'cover', 
            display: 'block' 
          }}
          className="w-full h-[100px] object-cover"
        />
      </div>
    );
  })}
</div>
      </Form.Group>
      <div >
      <Button variant="primary" type="submit" className='mt-3 mb-5 w-25 justify-content-center align-items-center'>
        Create
      </Button>
      </div>
    </Form>
    </Col>
    </Row>
        </Container>

    )
}

export default ListingPage;