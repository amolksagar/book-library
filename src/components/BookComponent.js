import React, {useEffect,useState} from 'react';
import BookService from '../services/BookService';
import "./../App.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory,{ Type } from "react-bootstrap-table2-editor";
import BookActionComponent from './BookActionComponent';
import axios from 'axios';

function BookComponent() {
  const [books, setBooks] = useState([])
  const [selectedBookIds, setSelectedBookIds] = useState([]);
  const [reloadParent, setReloadParent] = useState(false);
  
  useEffect(() => {
    getBooks()
  }, [reloadParent])
  
  const columns = [
    {
      dataField: "bookId",
      text: "Book ID"
    },
    {
      dataField: "title",
      text: "Title",
      editable: false,
      sort: true
    },
    {
      dataField: "authors",
      text: "Authors",
      editable: false,
      formatter: (cell, row) => cell.map(author => `${author}`).join(', ')
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
    clickToEdit: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      if (isSelect) {
        setSelectedBookIds([...selectedBookIds, row.bookId]);
      } else {
        setSelectedBookIds(selectedBookIds.filter(id => id !== row.bookId));
      }
    },
    onSelectAll: (isSelect, rows, e) => {
      const ids = isSelect ? rows.map(row => row.bookId) : [];
      setSelectedBookIds(ids);
    }
  };

  const handleReloadParent = () => {
    console.log('Value of Reload Parent',reloadParent);
    setReloadParent(!reloadParent);
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

  const handleStatusChange = (oldValue, newValue, row, column) => {

    let indexOfSelectedItem = -1;
  column.editor.options.forEach((item, idx) => {
    if (newValue === item.value) {
      indexOfSelectedItem = idx;
    }
  });
  if (indexOfSelectedItem > -1) {
    console.log(indexOfSelectedItem);
    console.log(row);
    console.log(column);
    const BOOK_UPDATE_REST_API_URL = `http://localhost:8082/booklibrary/book-library/v1/updateBook?bookId=${row.bookId}`;
    
    axios.put(BOOK_UPDATE_REST_API_URL, { status: newValue })
      .then(response => {
        // Handle success if needed
        console.log('Status updated successfully:', response.data);
      })
      .catch(error => {
        // Handle error if needed
        console.error('Error updating status:', error);
      });
  }
  };

  return (
    <>
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
          blurToSave: true,
          afterSaveCell: handleStatusChange
        }) }
    />
  </div>

   <BookActionComponent selectedBookIds={selectedBookIds} onReloadParent={handleReloadParent} />
  </>
  )
}
export default BookComponent