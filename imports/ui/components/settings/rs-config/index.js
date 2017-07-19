import React from 'react';
import { Link } from 'react-router-dom';

const RSConfig = () => (
  <div className="container-fluid">
    <div className="page-content">
      <div className="breadcrumbs">
        <h1>RS Config</h1>
        <ol className="breadcrumb">
          <li>
            <Link to="/settings/rs-config">Settings</Link>
          </li>
          <li className="active">RS Config</li>
        </ol>
      </div>
    </div>
  </div>
);

export default RSConfig;
