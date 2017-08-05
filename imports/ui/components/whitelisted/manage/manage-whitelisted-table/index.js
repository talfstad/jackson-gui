import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'react-table/react-table.css';

class ManageWhitelistedTable extends Component {
  onFetchData(state) {
    const { fetchWhitelistedDomainsAction } = this.props;

    const {
      page,
      pageSize,
      sorted,
    } = state;

    const {
      search,
    } = this.props;

    fetchWhitelistedDomainsAction({
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
        sortable: false,
        width: 40,
        Cell: row => (
          <div className="text-align-center">
            {(page * pageSize) + row.index + 1}
          </div>
        ),
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'User',
        accessor: 'userName',
        width: 150,
      },
      {
        Header: 'Created On',
        accessor: 'createdOn',
        width: 120,
        Cell: (row) => {
          const {
            original,
          } = row;
          return (
            <div>
              {moment(original.createdOn).format('LL')}
            </div>
          );
        },
      },
      {
        Header: '',
        accessor: 'actions',
        maxWidth: 50,
        Cell: (row) => {
          const {
            original,
          } = row;

          return (
            <div>
              <Link
                className="ml10"
                to={{
                  pathname: '/whitelisted/manage/delete',
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
            pageSizeOptions={[5, 10, 20, 25]}
          />
        </div>
      </div>
    );
  }
}

ManageWhitelistedTable.propTypes = {
  pageSize: PropTypes.number,
  page: PropTypes.number,
  fetchWhitelistedDomainsAction: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  search: PropTypes.string,
  pages: PropTypes.number,
  defaultPageSize: PropTypes.number,
};

ManageWhitelistedTable.defaultProps = {
  page: 0,
  pageSize: 10,
  fetchWhitelistedDomainsAction: null,
  list: [],
  search: '',
  loading: true,
  pages: -1,
  defaultPageSize: 10,
};

export default ManageWhitelistedTable;
