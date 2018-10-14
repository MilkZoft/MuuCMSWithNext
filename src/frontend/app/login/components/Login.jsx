// Dependencies
import React, { Component } from 'react';

// Components
import Logo from '@layout/header/Logo';
import CopyRight from '@layout/footer/CopyRight';
import Alert from '@ui/Alert';
import Icon from '@ui/Icon';
import Link from '@ui/Link';
import Form from '@form';
import Text from '@form/type/Text';
import Password from '@form/type/Password';
import Submit from '@form/type/Submit';

// Utils
import { cx, getInputChanged } from '@frontend/shared/utils';

// Stylus
import styles from './Login.scss';

class Login extends Component {
  state = {
    username: '',
    password: '',
    errors: {
      username: '',
      password: ''
    },
    loginError: false
  };

  handleInputChanged = e => {
    this.setState(getInputChanged(e));
  }

  handleSubmit = e => {

  }

  render() {
    return (
      <div className={styles.login}>
        <div className={styles.wrapper}>
          <Logo center refresh />

          <Form className={styles.form}>
            <Text
              autoFocus={!this.state.username}
              name="username"
              className={cx(styles.username, this.state.errors.username ? styles.required : '')}
              onChange={this.handleInputChanged}
              contentKey="Frontend.Users.Username.placeholder"
            />

            <Password
              autoFocus={!!this.state.password}
              className={cx(styles.password, this.state.errors.password ? styles.required : '')}
              name="password"
              onChange={this.handleInputChanged}
              contentKey="Frontend.Users.Password.placeholder"
            />

            <Link
              to="/forgot-password"
              className={styles.forgotPassword}
              data-content-key="Frontend.Users.Password.forgotPassword"
            >
              Forgot password
            </Link>

            <Submit
              className={cx(styles.btn, styles.dark, styles.login)}
              name="login"
              value="Login"
              onClick={this.handleSubmit}
              data-content-key="Frontend.Users.Buttons.login"
            />

            <Submit
              className={cx(styles.btn, styles.primary, styles.register)}
              name="register"
              value="Register"
              onClick={this.handleSubmit}
              data-content-key="Frontend.Users.Buttons.register"
            />
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
