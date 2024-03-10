import React, {useEffect,useState} from 'react'
import BookService from '../services/BookService'

function BookComponent() {
  const [books, setBooks] = useState([])
  
  useEffect(() => {
    getBooks()
  }, [])
  


  const getBooks = () => {
    BookService.getBooks().then(
        (response) => {
          setBooks(response.data)
            console.log(response.data);
        }
    );
  }
  return (
    <div className='container'>
          <h1 className='text-center'>Book Details</h1>
          <table className='table table-striped'>
            <thead>
                <tr>
                    <th> BookId</th>
                    <th> Title</th>
                    <th> Borrowed By</th>
                </tr>
            </thead>
            <tbody>
                {
                    books.map(
                        book => 
                        <tr key={book.bookId}>
                            <td>{book.bookId}</td>
                            <td>{book.title}</td>
                            <td>{book.borrowedBy}</td>
                        </tr>
                    )
                }
            </tbody>
          </table>
    </div>
  )
}
export default BookComponent