import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import {
  fetchOffers,
  stopOffersSub,
  fetchOffersCount,
} from '/imports/actions/offers';

import 'react-table/react-table.css';

class ManageOffersTable extends Component {
  componentWillMount() {
    const {
      fetchOffersCountAction,
    } = this.props;
    fetchOffersCountAction();
  }

  componentWillUnmount() {
    const {
      stopOffersSubAction,
    } = this.props;
    stopOffersSubAction();
  }

  onFetchData(state) {
    const {
      page,
      pageSize,
      sorted,
    } = state;

    const { fetchOffersAction } = this.props;
    fetchOffersAction({ page, pageSize, sorted });
  }

  render() {
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
        accessor: 'userName',
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
  stopOffersSubAction: PropTypes.func,
  fetchOffersCountAction: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  pages: PropTypes.number,
  defaultPageSize: PropTypes.number,
};

ManageOffersTable.defaultProps = {
  stopOffersSubAction: null,
  fetchOffersAction: null,
  fetchOffersCountAction: null,
  list: [],
  loading: true,
  pages: -1,
  defaultPageSize: 10,
};

const actions = {
  fetchOffersAction: fetchOffers,
  stopOffersSubAction: stopOffersSub,
  fetchOffersCountAction: fetchOffersCount,
};

const mapStateToProps = state => ({
  list: state.offers.offerList,
  loading: !state.offers.ready,
  pages: state.offers.pages,
  defaultPageSize: state.offers.defaultPageSize,
});

export default connect(mapStateToProps, actions)(ManageOffersTable);
