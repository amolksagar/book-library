import React, {useEffect,useState} from 'react';
import BookService from '../services/BookService';
import "./../App.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory,{ Type } from "react-bootstrap-table2-editor";

function BookComponentWithPaginationLatest() {
  const [books, setBooks] = useState([])
  
  useEffect(() => {
    getBooks()
  }, [])
  
  const columns = [
    {
      dataField: "bookId",
      text: "Book ID"
    },
    {
      dataField: "title",
      text: "Title",
      editable: false
    },
    {
      dataField: "authors",
      text: "Authors",
      editable: false,
      formatter: (cell, row) => cell.map(author => `${author.firstName} ${author.middleName || ''} ${author.lastName}`).join(', ')
    }
    ,
    {
      dataField: "borrowedBy",
      text: "Borrowed By",
      editable: false
    },
    {
      dataField: "status",
      text: "Status",
      editor: {
          type: Type.SELECT,
          options: [{
            value: 'AVAILABLE',
            label: 'AVAILABLE'
          }, {
            value: 'BORROWED',
            label: 'BORROWED'
          }]
        }
    }
  ];

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: true,
    clickToEdit: true
  };

  const CaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em' }}>RNSW Book Library</h3>;

  const getBooks = () => {
    BookService.getBooks().then(
        (response) => {
          setBooks(response.data)
            console.log(response.data);
        }
    );
  }
  return (
    <div className="App">
    <BootstrapTable
      bootstrap4
      keyField="bookId"
      data={books}
      columns={columns}
      caption={<CaptionElement />}
      pagination={paginationFactory({ sizePerPage: 5 })}
      selectRow={ selectRow }
      cellEdit={ cellEditFactory({
          mode: 'dbclick',
          blurToSave: true
        }) }
      // cellEdit={ cellEditFactory({ mode: 'dbclick' }) }
    />
  </div>
  )
}
export default BookComponentWithPaginationLatest