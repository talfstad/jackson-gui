import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

import 'react-table/react-table.css';

class ManageOffersTable extends Component {
  onFetchData(state) {
    const { fetchOffersAction } = this.props;

    const {
      page,
      pageSize,
      sorted,
    } = state;

    const {
      search,
    } = this.props;

    fetchOffersAction({
      page,
      pageSize,
      sorted,
      search,
    });
  }

  render() {
    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
        width: 400,
      },
      {
        Header: 'Url',
        id: 'url',
        accessor: 'url',
      },
      {
        Header: 'User',
        accessor: 'userName',
        width: 150,
      },
      {
        Header: '',
        accessor: 'actions',
        width: 50,
        Cell: (row) => {
          const {
            original,
          } = row;

          return (
            <div>
              <Link to={`/offers/manage/edit/${original._id}`}>
                <i className="fa fa-edit" />
              </Link>
              <Link
                className="ml10"
                to={{
                  pathname: '/offers/manage/delete',
                  state: original,
                }}
              >
                <i className="fa fa-trash-o" />
              </Link>
            </div>
          );
        },
      },
    ];

    return (
      <div>
        <div className="table-wrap">
          <ReactTable
            className="-striped -highlight"
            manual
            columns={columns}
            defaultPageSize={this.props.defaultPageSize}
            onFetchData={(state, instance) => this.onFetchData(state, instance)}
            pages={this.props.pages}
            defaultSorted={[{
              id: 'name',
              desc: false,
            }]}
            data={this.props.list}
            loading={this.props.loading}
          />
        </div>
      </div>
    );
  }
}

ManageOffersTable.propTypes = {
  fetchOffersAction: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  search: PropTypes.string,
  pages: PropTypes.number,
  defaultPageSize: PropTypes.number,
};

ManageOffersTable.defaultProps = {
  fetchOffersAction: null,
  list: [],
  search: '',
  loading: true,
  pages: -1,
  defaultPageSize: 10,
};

export default ManageOffersTable;
