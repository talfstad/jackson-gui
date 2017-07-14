import React from 'react';
import RequireNoAuth from '../hocs/require-no-auth';

const Login = () => (
  <div className="login">
    <div className="content">
      <form className="login-form" action="index.html" method="post">
        <div className="form-title">
          <span className="form-title">Welcome to RS.</span>
          <span className="form-subtitle">Please login.</span>
        </div>
        <div className="alert alert-danger display-hide">
          <button className="close" data-close="alert" />
          <span> Enter any email and password. </span>
        </div>
        <div className="form-group">
          <label htmlFor="email" className="control-label visible-ie8 visible-ie9">Email</label>
          <input autoComplete="off" className="form-control form-control-solid placeholder-no-fix" type="text" placeholder="Email" name="email" /> </div>
        <div className="form-group">
          <label htmlFor="password" className="control-label visible-ie8 visible-ie9">Password</label>
          <input autoComplete="off" className="form-control form-control-solid placeholder-no-fix" type="password" placeholder="Password" name="password" /> </div>
        <div className="form-actions">
          <button type="submit" className="btn red btn-block uppercase">Login</button>
        </div>
        <div className="form-actions">
          <div className="pull-right forget-password-block">
            <a href="#df;" id="forget-password" className="forget-password">Forgot Password?</a>
          </div>
        </div>
      </form>
    </div>
  </div>
);

export default RequireNoAuth(Login);
