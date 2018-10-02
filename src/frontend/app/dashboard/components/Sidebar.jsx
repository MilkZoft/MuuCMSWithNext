// Dependencies
import React, { Component } from 'react';

// Components
// Styles
import styles from './Sidebar.scss';

const Sidebar = ({ appName }) => (
  <div className={styles.sidebar}>
    <div className={styles.wrapper}>
      <h2 className={styles.brand}>
        <a href="/">
          <i className="fa fa-pie-chart" aria-hidden="true"></i> MuuCMS
        </a>
      </h2>

      <h4 className={styles.title}>Apps</h4>

      <ul>
        <li className={appName === 'blog' ? styles.active : ''}>
          <a href="/dashboard/blog">
            <i className="fa"></i> &nbsp;
            Blog
          </a>

          <a href="#/create" className={styles.create}>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </a>
        </li>
        <li className={appName === 'pages' ? styles.active : ''}>
          <a href="/dashboard/pages">
            <i className="fa"></i> &nbsp;
            Pages
          </a>

          <a href="#/create" className={styles.create}>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
);

export default Sidebar;
