import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {useNavigate} from 'react-router-dom';
function BookCard(props) {
  const navigate = useNavigate();
  return (
    <Card className="h-100 shadow-sm" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.cover} style={{ height: '250px', objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title  className='responsive-header'>{props.name}</Card.Title>
        <Card.Text className="text-muted">
          This book is available for {props.price} dollars. It has ISBN number {props.isbn}.
        </Card.Text>
        <Button variant="primary" onClick={() => navigate(props.link)} className="mt-auto">
          View
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BookCard;