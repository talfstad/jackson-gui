import React from 'react';
import RenderIfAdmin from '../../auth/hocs/render-if-admin';

const AdminInsignia = () =>
  <span className="label-danger">Admin</span>;

export default RenderIfAdmin(AdminInsignia);
