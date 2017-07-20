import React, { Component } from 'react';
import ReactTable from 'react-table';

import 'react-table/react-table.css';

class Table extends Component {
  render() {
    const data = [
      {
        name: 'Offer 1',
        url: 'http://offer1url.com',
        user: 'ZeroSixty Media',
      },
      {
        name: 'Offer 2',
        url: 'http://offer2url.com',
        user: 'ZeroSixty Media',
      },
    ];

    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Url',
        id: 'url',
        accessor: 'url',
      },
      {
        Header: 'User',
        accessor: 'user',
      },
    ];

    return (
      <div>
        <div className="table-wrap">
          <ReactTable
            className="-striped -highlight"
            data={data}
            columns={columns}
            defaultPageSize={10}
          />
        </div>
      </div>
    );
  }
}

export default Table;
