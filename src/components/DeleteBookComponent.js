import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

function DeleteBookComponent({ selectedBookIds, onApiSuccess = () => {} }) {
  const BOOK_DELETE_REST_API_URL = 'http://localhost:8082/booklibrary/book-library/v1/deleteBooks';
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShow(false);
    setLoading(false);
  };

  const handleShow = () => setShow(true);

  const handleSaveChanges = async () => {
    try {
      console.log('Selected Book Ids:', selectedBookIds);
      setLoading(true);
      const response = await axios.delete(BOOK_DELETE_REST_API_URL, {
        data: { idsToDelete: selectedBookIds }
      });
      onApiSuccess();
      console.log('API Response:', response.data);
      // Handle success, e.g., show a success message
    } catch (error) {
      console.error('API Error:', error);
      // Handle error, e.g., show an error message
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  return (
    <>
      <Button variant="secondary" onClick={handleShow} disabled={false}>
        Delete Book
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>Are you sure you want to Delete the selected book(s)?</Modal.Body>
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

export default DeleteBookComponent;