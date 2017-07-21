import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import {
  fetchOffers,
  stopOffersSub,
} from '/imports/actions/offers';

import 'react-table/react-table.css';

class ManageOffersTable extends Component {
  componentWillUnmount() {
    const { stopOffersSubAction } = this.props;
    stopOffersSubAction();
  }

  onFetchData(state) {
    const {
      page,
      pageSize,
      sorted,
    } = state;

    const { fetchOffersAction } = this.props;
    // call action to get page with page and page size
    fetchOffersAction({ page, pageSize });

    // sorted is an array [{ desc: false, id: 'userName' }]
    // console.log('on fetch data');
    // console.log(state);
    // console.log(instance);
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
            defaultPageSize={10}
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
  list: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  pages: PropTypes.number,
};

ManageOffersTable.defaultProps = {
  stopOffersSubAction: null,
  fetchOffersAction: null,
  list: [],
  loading: true,
  pages: 21,
};

const actions = {
  fetchOffersAction: fetchOffers,
  stopOffersSubAction: stopOffersSub,
};

const mapStateToProps = state => ({
  list: state.offers.offerList,
  loading: !state.offers.ready,
});

export default connect(mapStateToProps, actions)(ManageOffersTable);
