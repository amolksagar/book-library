import React from "react";
import "./../App.css"
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory,{ Type } from "react-bootstrap-table2-editor";

export const productsGenerator = quantity => {
  const items = [];
  for (let i = 1; i < quantity; i++) {
    items.push({ id: i, name: `Ordinarycoders course ${i}`, price: 100 + i });
  }
  return items;
};

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true,
  clickToEdit: true
};
const products = productsGenerator(100);
const columns = [
  {
    dataField: "id",
    text: "Product ID"
  },
  {
    dataField: "name",
    text: "Product Name",
    editable: false
  },
  {
    dataField: "price",
    text: "Product Price in $",
    editor: {
        type: Type.SELECT,
        options: [{
          value: 'AVAILABLE',
          label: 'Available'
        }, {
          value: 'BORROWED',
          label: 'Borrowed'
        }]
      }
  }
];

const CaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em' }}>RNSW Book Library</h3>;

export default function App() {
  return (
    <div className="App">
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={products}
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
  );
}