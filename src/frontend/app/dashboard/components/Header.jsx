import React, { Component } from 'react';
import styles from './Header.scss';

const Header = () => (
  <header className={styles.navbar}>
    <nav>
      <a id="openMenu">
        <i className="fa fa-bars" aria-hidden="true"></i>
      </a> &nbsp;
    </nav>

    <h2>Blog</h2>

    <a href="#">
      <i className="fa theme" aria-hidden="true"></i>
    </a>
  </header>
);

export default Header;