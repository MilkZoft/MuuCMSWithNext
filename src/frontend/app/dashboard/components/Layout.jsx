import React from 'react';
import Content from './Content';
import Sidebar from './Sidebar';
import './Layout.scss';

const Layout = () => (
  <main>
    <Sidebar />
    <Content />
  </main>
);

export default Layout;
