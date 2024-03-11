import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

function CreateBookComponent({onApiSuccess = () => {} }) {
  const BOOK_CREATE_REST_API_URL = 'http://localhost:8082/booklibrary/book-library/v1/book';
  const [show, setShow] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  const [borrowedBy, setBorrowedBy] = useState('');
  const [authorNames, setAuthorNames] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShow(false);
    setBookTitle('');
    setBorrowedBy('');
    setAuthorNames([]);
    setLoading(false);
  };
  const handleShow = () => setShow(true);

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      const response = await axios.post(BOOK_CREATE_REST_API_URL, {
        title: bookTitle,
        borrowedBy: borrowedBy,
        authors: authorNames,
        status: 'AVAILABLE'
      });
      
      console.log('API Response:', response.data);
      onApiSuccess();
      // Handle success, e.g., show a success message
    } catch (error) {
      console.error('API Error:', error);
      // Handle error, e.g., show an error message
    } finally {
      setLoading(false);
    }
    handleClose();
  };

  const handleAuthorNamesChange = (event) => {
    // Split the textarea value into an array of author names
    const names = event.target.value.split('\n');
    setAuthorNames(names);
  };


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Book
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Book Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title of the book to be created"
                autoFocus
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
              />
              <Form.Label>Borrowed By</Form.Label>
              <Form.Control
                type="text"
                placeholder="Borrowed By"
                value={borrowedBy}
                onChange={(e) => setBorrowedBy(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Author Names</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Press Enter Key for more than one authors"
              value={authorNames.join('\n')}
              onChange={handleAuthorNamesChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" />
                {' Loading...'}
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateBookComponent;