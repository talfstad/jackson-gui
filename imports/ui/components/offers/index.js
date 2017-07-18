import React from 'react';
import RequireAuth from '../auth/hocs/require-auth';

const temp = () => (
  <noscript />
);

export default RequireAuth(temp);
