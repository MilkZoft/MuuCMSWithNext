import React, { Component } from 'react';
import Logo from '@layout/header/Logo';
import styles from './Login.scss';

class Login extends Component {
  render() {
    return (
      <div className={styles.login}>
        <div className={styles.wrapper}>
          <Logo />
        </div>
      </div>
    );
  }
}

export default Login;
