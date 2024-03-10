import React from "react";
// import "./styles.css";
import "./../App.css"
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
const products = [
  { id: 1, name: "Ordinarycoders course 1", price: 101 },
  { id: 2, name: "Ordinarycoders course 2", price: 102 },
  { id: 3, name: "Ordinarycoders course 3", price: 103 },
  { id: 4, name: "Ordinarycoders course 4", price: 104 },
  { id: 5, name: "Ordinarycoders course 5", price: 105 }
];
const columns = [
  {
    dataField: "id",
    text: "Product ID",
    sort: true
  },
  {
    dataField: "name",
    text: "Product Name",
    sort: true
  },
  {
    dataField: "price",
    text: "Product Price in $"
  }
];
export default function BookLibraryComponent() {
  return (
    <div className="App">
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={products}
        columns={columns}
      />
    </div>
  );
}
