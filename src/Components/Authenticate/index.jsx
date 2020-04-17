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
import { Box, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  leftPane: {
    background: 'linear-gradient(75deg, #8E0551 80%, transparent 80.2%)',
    color: '#fff',
  },
  /**width: 112px;
    height: 47px;
    border-bottom: 1px solid red;
    -webkit-transform:
        translateY(-20px)
        translateX(5px)
        rotate(27deg); 
    position: absolute; */
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
  logo: {
    marginRight: '2rem',
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
      <Grid item xs={false} sm={4} md={7} className={classes.leftPane}>
        <Box component={Grid} container m={3} alignItems="center">
          <Box component={Grid} item sm={12} display="flex" alignItems="center">
            <img
              src="/images/logo.png"
              width="100px"
              alt="logo"
              className={classes.logo}
            />
            <h1> Site Title</h1>
          </Box>
          <Box
            component={Grid}
            item
            sm={12}
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
          >
            <h2>Your tagline here ...</h2>
            <img
              src="/images/loginbg.png"
              width="550px"
              alt="logo"
              className={classes.logo}
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Excepturi expedita nisi dolore ipsa ex dolor
              <br /> sequi est culpa, ullam illo consectetur dignissimos
              temporibus impedit, consequuntur voluptatibus <br />
              fugit maiores quasi officia!
            </p>
            <Button variant="contained" color="secondary">
              Know more
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={5}>
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
