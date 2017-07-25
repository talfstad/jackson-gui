import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Route,
  Link,
} from 'react-router-dom';
import _ from 'lodash';

import {
  fetchOffers,
  stopOffersSub,
} from '/imports/actions/offers';

import ManageOffersTable from './manage-offers-table';
import AddNew from './add-new-modal';

class ManageOffers extends Component {
  componentWillUnmount() {
    const {
      stopOffersSubAction,
    } = this.props;
    stopOffersSubAction();
  }

  handleSearch() {
    const { fetchOffersAction } = this.props;

    const {
      page,
      pageSize,
      sorted,
    } = this.props;

    fetchOffersAction({
      page,
      pageSize,
      sorted,
      search: this.searchEl.value });
  }

  render() {
    const { match } = this.props;

    return (
      <div className="container-fluid">
        <div className="page-content">
          <div className="breadcrumbs">
            <h1>Manage Offers</h1>
            <ol className="breadcrumb">
              <li className="active">
                <Link to="/offers/manage">Offers</Link>
              </li>
              <li>Manage</li>
            </ol>
          </div>
          <div className="page-content-container">
            <div className="page-content-row">
              <div className="page-content-col">
                <div className="row">
                  <div className="col-md-12">
                    <div className="portlet light bordered">
                      <div className="portlet-title">
                        <div className="caption">
                          <i className="icon-list" />
                          <span className="caption-subject bold uppercase">
                            Offers List
                          </span>
                        </div>
                        <div className="actions">
                          <div className="mr10 pull-left search">
                            <input
                              ref={(c) => { this.searchEl = c; }}
                              onChange={_.debounce(() => this.handleSearch(), 200)}
                              className="form-control"
                              type="text"
                              placeholder="Search"
                            />
                          </div>
                          <div className="columns columns-right btn-group pull-right">
                            <Link
                              to={`${match.url}/new`}
                              title="Add New Offer"
                              className="btn btn-primary in-portlet-large-btn"
                            >
                              <i className="glyphicon glyphicon-plus icon-plus" />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <ManageOffersTable
                        fetchOffersAction={this.props.fetchOffersAction}
                        stopOffersSubAction={this.props.stopOffersSubAction}
                        list={this.props.list}
                        loading={this.props.loading}
                        pages={this.props.pages}
                        search={this.props.search}
                        defaultPageSize={this.props.defaultPageSize}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Route
          exact
          path={`${match.url}/new`}
          component={AddNew}
        />
      </div>
    );
  }
}

ManageOffers.propTypes = {
  page: PropTypes.number,
  pageSize: PropTypes.number,
  sorted: PropTypes.arrayOf(PropTypes.object),
  fetchOffersAction: PropTypes.func,
  stopOffersSubAction: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  pages: PropTypes.number,
  search: PropTypes.string,
  defaultPageSize: PropTypes.number,
  match: PropTypes.shape({}),
};

ManageOffers.defaultProps = {
  match: {},
  page: 0,
  pageSize: 10,
  sorted: [],
  stopOffersSubAction: null,
  fetchOffersAction: null,
  list: [],
  search: '',
  loading: true,
  pages: -1,
  defaultPageSize: 10,
};

const actions = {
  fetchOffersAction: fetchOffers,
  stopOffersSubAction: stopOffersSub,
};

const mapStateToProps = state => ({
  list: state.offers.offerList,
  loading: !state.offers.ready,
  pages: state.offers.pages,
  defaultPageSize: state.offers.defaultPageSize,
  page: state.offers.page,
  pageSize: state.offers.pageSize,
  sorted: state.offers.sorted,
  search: state.offers.search,
});

export default connect(mapStateToProps, actions)(ManageOffers);
