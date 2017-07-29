import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import moment from 'moment';

import 'react-table/react-table.css';

class ManageRipsTable extends Component {
  onFetchData(state) {
    const { fetchRipsAction } = this.props;
    const {
      page,
      pageSize,
      sorted,
    } = state;

    const {
      search,
    } = this.props;

    fetchRipsAction({
      page,
      pageSize,
      sorted,
      search,
    });
  }

  render() {
    const {
      page,
      pageSize,
    } = this.props;

    const columns = [
      {
        Header: '#',
        width: 40,
        Cell: row => (
          <div className="text-align-center">
            {(page * pageSize) + row.index + 1}
          </div>
        ),
      },
      {
        Header: 'Url',
        accessor: 'url',
        Cell: ({ row }) => (
          <div>
            <a target="_blank" href={`http://${row.url}`}>
              {row.url}
            </a>
          </div>
        ),
      },
      {
        Header: 'Daily Jacks',
        accessor: 'daily_jacks',
        maxWidth: 90,
        Cell: ({ row }) => (
          <div className="text-align-center">
            {row.daily_jacks}
          </div>
        ),
      },
      {
        Header: 'Daily Hits',
        accessor: 'daily_hits',
        maxWidth: 90,
        Cell: ({ row }) => (
          <div className="text-align-center">
            {row.daily_hits}
          </div>
        ),
      },
      {
        Header: 'Total Hits',
        accessor: 'total_hits',
        maxWidth: 90,
        Cell: ({ row }) => (
          <div className="text-align-center">
            {row.total_hits}
          </div>
        ),
      },
      {
        Header: 'Take Rate',
        accessor: 'take_rate',
        maxWidth: 90,
        Cell: ({ row }) => (
          <div className="text-align-center">
            {row.take_rate * 100}%
          </div>
        ),
      },
      {
        Header: 'Offer',
        accessor: 'offer',
        width: 200,
        Cell: ({ row }) => (
          <div>
            {(row.offer || {}).name || ''}
          </div>
        ),
      },
      {
        Header: 'User',
        accessor: 'userName',
        width: 150,
      },
      {
        Header: 'Most Recent',
        accessor: 'last_updated',
        width: 150,
        Cell: ({ row }) => (
          <div>
            {/* row.last_updated.toString() */}
            {moment(row.last_updated).fromNow()}
          </div>
        ),
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
              <Link to={`/rips/manage/edit/${original._id}`}>
                <i className="fa fa-edit" />
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
              id: 'last_updated',
              desc: true,
            }]}
            data={this.props.list}
            loading={this.props.loading}
            pageSizeOptions={[5, 10, 20, 25]}
          />
        </div>
      </div>
    );
  }
}

ManageRipsTable.propTypes = {
  fetchRipsAction: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  search: PropTypes.string,
  pages: PropTypes.number,
  defaultPageSize: PropTypes.number,
  page: PropTypes.number,
  pageSize: PropTypes.number,
};

ManageRipsTable.defaultProps = {
  page: 0,
  pageSize: 10,
  fetchRipsAction: null,
  list: [],
  search: '',
  loading: true,
  pages: -1,
  defaultPageSize: 10,
};

export default ManageRipsTable;
