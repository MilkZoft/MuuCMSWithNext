import React, { Component } from 'react';
import Header from './Header';
import styles from './Content.scss';

const Content = ({ appName, action }) => (
  <section className={styles.content}>
    <Header appName={appName} />

    <section className={styles.container}>

    </section>
  </section>
);

export default Content;
