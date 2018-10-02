import React from 'react';
import Content from './Content';
import Sidebar from './Sidebar';
import './Layout.scss';

const Layout = ({ url: { query: { appName, action } } }) => (
  <main>
    <Sidebar appName={appName} />
    <Content appName={appName} action={action} />
  </main>
);

export default Layout;
