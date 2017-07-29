import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Route,
  Link,
} from 'react-router-dom';
import _ from 'lodash';

import {
  fetchWhitelistedDomains,
  stopWhitelistedDomainsSub,
} from '/imports/actions/whitelisted';

import AddNew from './add-new-modal';
import DeleteWhitelisted from './delete-whitelisted-modal';

import ManageWhitelistTable from './manage-whitelisted-table';

class ManageWhitelist extends Component {
  componentWillUnmount() {
    const {
      stopWhitelistedDomainsSubAction,
    } = this.props;
    stopWhitelistedDomainsSubAction();
  }

  handleSearch() {
    const { fetchWhitelistedDomainsAction } = this.props;

    const {
      page,
      pageSize,
      sorted,
    } = this.props;

    fetchWhitelistedDomainsAction({
      page,
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
            <h1>Manage Domain Whitelist</h1>
            <ol className="breadcrumb">
              <li className="active">
                <Link to="/whitelisted/manage">Whitelist</Link>
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
                            Domain Whitelist ({this.props.whitelistCount})
                          </span>
                        </div>
                        <div className="actions">
                          <div className="mr10 pull-left search">
                            <input
                              ref={(c) => { this.searchEl = c; }}
                              onChange={_.debounce(() => this.handleSearch(), 200)}
                              defaultValue={search}
                              className="form-control"
                              type="text"
                              placeholder="Search"
                            />
                          </div>
                          <div className="columns columns-right btn-group pull-right">
                            <Link
                              to={`${match.url}/new`}
                              title="Whitelist New Domain"
                              className="btn btn-primary in-portlet-large-btn"
                            >
                              <i className="glyphicon glyphicon-plus icon-plus" />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <ManageWhitelistTable
                        fetchWhitelistedDomainsAction={this.props.fetchWhitelistedDomainsAction}
                        stopWhitelistedDomainsSubAction={this.props.stopWhitelistedDomainsSubAction}
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
          path={`${match.url}/new`}
          component={AddNew}
        />
        <Route
          exact
          path={`${match.url}/delete`}
          component={DeleteWhitelisted}
        />
      </div>
    );
  }
}

ManageWhitelist.propTypes = {
  page: PropTypes.number,
  pageSize: PropTypes.number,
  sorted: PropTypes.arrayOf(PropTypes.object),
  fetchWhitelistedDomainsAction: PropTypes.func,
  stopWhitelistedDomainsSubAction: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  pages: PropTypes.number,
  search: PropTypes.string,
  defaultPageSize: PropTypes.number,
  match: PropTypes.shape({}),
  whitelistCount: PropTypes.number,
};

ManageWhitelist.defaultProps = {
  whitelistCount: 0,
  match: {},
  page: 0,
  pageSize: 10,
  sorted: [],
  stopWhitelistedDomainsSubAction: null,
  fetchWhitelistedDomainsAction: null,
  list: [],
  search: '',
  loading: true,
  pages: -1,
  defaultPageSize: 10,
};

const actions = {
  fetchWhitelistedDomainsAction: fetchWhitelistedDomains,
  stopWhitelistedDomainsSubAction: stopWhitelistedDomainsSub,
};

const mapStateToProps = state => ({
  list: state.whitelisted.whitelist,
  loading: !state.whitelisted.ready,
  pages: state.whitelisted.pages,
  whitelistCount: state.whitelisted.count,
  defaultPageSize: state.whitelisted.defaultPageSize,
  page: state.whitelisted.page,
  pageSize: state.whitelisted.pageSize,
  sorted: state.whitelisted.sorted,
  search: state.whitelisted.search,
});

export default connect(mapStateToProps, actions)(ManageWhitelist);
