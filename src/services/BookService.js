import axios from 'axios';

const BOOK_GET_REST_API_URL = 'http://localhost:8082/booklibrary/book-library/v1/books?sortBy=title';

class BookService{
    getBooks(){
        return axios.get(BOOK_GET_REST_API_URL);
    }
}

export default new BookService();