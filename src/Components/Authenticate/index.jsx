import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import { Auth } from 'aws-amplify';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import SignUpConfirm from './SignUpConfirm';

import Loader from '../UI/Loader';
import Alert from '../UI/Alert';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import { AUTH_TOKEN } from '../../Constants';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/collection/1244074)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Authenticate() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const classes = useStyles();
  const match = useRouteMatch();

  useEffect(() => {
    // To reset the error object after route change
    setError(null);
  }, [match]);

  async function signUp({ username, password, email }) {
    setLoading(true);
    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email },
      });
      console.log('sign up success!');
      history.push(`${match.path}/activate`);
    } catch (err) {
      console.log('error signing up..', err);
      setError(err);
    }
    setLoading(false);
  }

  async function confirmSignUp({ username, confirmationCode }) {
    setLoading(true);
    try {
      await Auth.confirmSignUp(username, confirmationCode);
      console.log('confirm sign up success!');
      history.push(`${match.path}/login`);
    } catch (err) {
      console.log('error signing up..', err);
      setError(err);
    }
    setLoading(false);
  }

  async function forgotPassword({ username }) {
    setLoading(true);
    try {
      await Auth.forgotPassword(username);
      console.log('forgot success!');
      history.push(`${match.path}/reset-password`);
    } catch (err) {
      console.log('error signing up..', err);
      setError(err);
    }
    setLoading(false);
  }

  async function resetPassword({ username, confirmationCode, password }) {
    setLoading(true);
    try {
      await Auth.forgotPasswordSubmit(
        username.trim(),
        confirmationCode.trim(),
        password.trim()
      );
      console.log('forgot success!');
      history.push(`${match.path}/login`);
    } catch (err) {
      console.log('error signing up..', err);
      setError(err);
    }
    setLoading(false);
  }

  async function signIn({ username, password }) {
    setLoading(true);
    try {
      const user = await Auth.signIn(username, password);
      console.log(user);
      console.log('sign in success!');
      // localStorage.setItem(
      //   AUTH_TOKEN,
      //   user.signInUserSession.accessToken.jwtToken
      // );
      history.push('/');
    } catch (err) {
      console.log('error signing up..', err);
      setError(err);
      if (err.code === 'UserNotConfirmedException') {
        history.push(`${match.path}/activate`);
      }
    }
    setLoading(false);
  }

  return (
    <Grid container component="main" className={classes.root}>
      {loading && <Loader />}
      {error && (
        <Alert
          severity="error"
          message={error.message || 'Something went wrong'}
        />
      )}
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Switch>
          <Route path={`${match.path}/login`}>
            <SignInForm classes={classes} signIn={signIn} />
          </Route>
          <Route path={`${match.path}/register`}>
            <SignUpForm classes={classes} signUp={signUp} />
          </Route>
          <Route path={`${match.path}/activate`}>
            <SignUpConfirm classes={classes} confirmSignUp={confirmSignUp} />
          </Route>
          <Route path={`${match.path}/forgot-password`}>
            <ForgotPassword classes={classes} forgotPassword={forgotPassword} />
          </Route>
          <Route path={`${match.path}/reset-password`}>
            <ResetPassword classes={classes} resetPassword={resetPassword} />
          </Route>
        </Switch>
      </Grid>
    </Grid>
  );
}
