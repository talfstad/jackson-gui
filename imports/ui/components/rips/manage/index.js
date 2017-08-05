import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Route,
  Link,
} from 'react-router-dom';
import _ from 'lodash';

import {
  fetchRips,
  stopRipsSub,
} from '/imports/actions/rips';

import ManageRipsTable from './manage-rips-table';
import EditRip from './edit-rip-modal';
import WhitelistRip from './whitelist-rip-modal';

class ManageRips extends Component {
  componentWillUnmount() {
    const {
      stopRipsSubAction,
    } = this.props;
    stopRipsSubAction();
  }

  handleSearch() {
    const { fetchRipsAction } = this.props;

    const {
      pageSize,
      sorted,
    } = this.props;

    fetchRipsAction({
      page: 0,
      pageSize,
      sorted,
      search: this.searchEl.value });
  }

  render() {
    const {
      match,
      search,
    } = this.props;

    return (
      <div className="container-fluid">
        <div className="page-content">
          <div className="breadcrumbs">
            <h1>Manage Rips</h1>
            <ol className="breadcrumb">
              <li className="active">
                <Link to="/rips/manage">Rips</Link>
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
                            Rip List ({this.props.ripListCount})
                          </span>
                        </div>
                        <div className="actions">
                          <div className="pull-left search">
                            <input
                              ref={(c) => { this.searchEl = c; }}
                              onChange={_.debounce(() => this.handleSearch(), 200)}
                              defaultValue={search}
                              className="form-control"
                              type="text"
                              placeholder="Search"
                            />
                          </div>
                        </div>
                      </div>
                      <ManageRipsTable
                        fetchRipsAction={this.props.fetchRipsAction}
                        stopRipsSubAction={this.props.fetchRipsAction}
                        list={this.props.list}
                        loading={this.props.loading}
                        pages={this.props.pages}
                        search={this.props.search}
                        defaultPageSize={this.props.defaultPageSize}
                        page={this.props.page}
                        pageSize={this.props.pageSize}
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
          path={`${match.url}/edit/:ripId/:userId`}
          component={EditRip}
        />
        <Route
          exact
          path={`${match.url}/whitelist`}
          component={WhitelistRip}
        />
      </div>
    );
  }
}

ManageRips.propTypes = {
  page: PropTypes.number,
  pageSize: PropTypes.number,
  sorted: PropTypes.arrayOf(PropTypes.object),
  fetchRipsAction: PropTypes.func,
  stopRipsSubAction: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  pages: PropTypes.number,
  search: PropTypes.string,
  defaultPageSize: PropTypes.number,
  match: PropTypes.shape({}),
  ripListCount: PropTypes.number,
};

ManageRips.defaultProps = {
  ripListCount: 0,
  match: {},
  page: 0,
  pageSize: 10,
  sorted: [],
  stopRipsSubAction: null,
  fetchRipsAction: null,
  list: [],
  search: '',
  loading: true,
  pages: -1,
  defaultPageSize: 10,
};

const actions = {
  fetchRipsAction: fetchRips,
  stopRipsSubAction: stopRipsSub,
};

const mapStateToProps = state => ({
  list: state.rips.ripList,
  loading: !state.rips.ready,
  pages: state.rips.pages,
  ripListCount: state.rips.count,
  defaultPageSize: state.rips.defaultPageSize,
  page: state.rips.page,
  pageSize: state.rips.pageSize,
  sorted: state.rips.sorted,
  search: state.rips.search,
});

export default connect(mapStateToProps, actions)(ManageRips);
