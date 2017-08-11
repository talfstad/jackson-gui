import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import moment from 'moment';

import 'react-table/react-table.css';

import CountryFlag from './country-flag';

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

  getSubComponent(row) {
    console.log(row);
    return (
      <div>
        This is a sub component!!!!
      </div>
    );
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
        resizable: false,
        sortable: false,
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
            <a target="_blank" href={row._original.originalUrl || row.url}>
              {row.url}
            </a>
          </div>
        ),
      },
      {
        Header: 'Top 3 Countries',
        width: 120,
        resizable: false,
        sortable: false,
        Cell: ({ original }) => {
          const { hourly } = original.archive;

          // 1. make 1 giant array of all the country codes and their values { cc: "US": hits: 10 }
          const totalHitsArr =
            _.reduce(hourly, (accumulator, hour) => accumulator.concat(hour.hits), []);
          // 2. group by cc to get object with all values associated to their country code
          const groupTotalByCC = _.groupBy(totalHitsArr, 'cc');
          const groupTotalByCCFiltered = _.omit(groupTotalByCC, 'undefined');
          // 3. map that and total all of that cc, return it. -> [{ ca: 400, us: 100 }]
          const hitsTotaledByCC = _.map(groupTotalByCCFiltered, (val, key) => ({
            cc: key,
            hits: _.reduce(val, (sum, hitsByCC) => sum + hitsByCC.hits, 0),
          }));

          // 4. custom sort where we determine which val is largest
          const sortDesc = hitsTotaledByCC.sort((a, b) => {
            if (a.hits > b.hits) return -1;
            if (a.hits < b.hits) return 1;
            return 0;
          });

          // 5. build country flags up to top 3, or less.
          return (
            <div className="text-align-center">
              <div style={{ width: '90px', textAlign: 'left', display: 'inline-block' }}>
                {
                  sortDesc.slice(0, 3).map((item, idx) => (
                    <CountryFlag
                      key={item.cc}
                      cc={item.cc}
                      hits={item.hits}
                      className={idx > 0 ? 'ml10' : ''}
                    />
                  ))
                }
              </div>
            </div>
          );
        },
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
        Header: 'Jack Rate',
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
        Header: 'Last Traffic',
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
              <Link to={`/rips/manage/edit/${original._id}/${original.userId}`}>
                <i className="fa fa-edit" />
              </Link>
              { original.domain ?
                <Link
                  to={{
                    pathname: '/rips/manage/whitelist',
                    state: original,
                  }}
                  className="ml10"
                >
                  <i className="icon-shield" />
                </Link>
              :
                <noscript />
              }
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
              id: 'daily_hits',
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
// SubComponent={this.getSubComponent}

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
  defaultPageSize: 20,
};

export default ManageRipsTable;
