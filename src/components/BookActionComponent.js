import React from 'react';
import "./../App.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import CreateBookComponent from './CreateBookComponent';
import DeleteBookComponent from './DeleteBookComponent';

function BookActionComponent({ selectedBookIds,onReloadParent}) {
  return (
    <>
   <div className="container">
  <div className="row">
    <div className="col text-center">
    <CreateBookComponent onApiSuccess={onReloadParent}/>
    <DeleteBookComponent selectedBookIds={selectedBookIds} onApiSuccess={onReloadParent}/>
    </div>
  </div>
</div>
  </>
  )
}
export default BookActionComponent