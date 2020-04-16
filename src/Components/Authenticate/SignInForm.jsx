import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FacebookIcon from '@material-ui/icons/Facebook';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { Auth } from 'aws-amplify';
import Link from '../UI/Link';

const authSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
  username: Yup.string().required('Required'),
});

export default function SignInForm(props) {
  const { classes } = props;
  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Sign in with
      </Typography>
      <Box direction="column" alignItems="center" justify="center" my={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })}
              startIcon={<FacebookIcon />}
            >
              Facebook
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() => Auth.federatedSignIn({ provider: 'Google' })}
              startIcon={<GTranslateIcon />}
            >
              Google
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Typography component="h1" alignItems="center" variant="h6">
        OR
      </Typography>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={authSchema}
        onSubmit={(values, actions) => {
          // same shape as initial values
          const { username, password } = values;
          props.signIn({ username, password });
          actions.setSubmitting(false);
        }}
      >
        {({
          values: { password, username },
          errors,
          touched,
          handleChange,
          isSubmitting,
          setFieldTouched,
        }) => {
          const change = (name, e) => {
            e.persist();
            handleChange(e);
            setFieldTouched(name, true, false);
          };
          return (
            <Form className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                helperText={touched.username ? errors.username : ''}
                error={touched.username && Boolean(errors.username)}
                value={username}
                onChange={change.bind(null, 'username')}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={touched.password ? errors.password : ''}
                error={touched.password && Boolean(errors.password)}
                value={password}
                onChange={change.bind(null, 'password')}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isSubmitting}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    to="/auth/register"
                    label={"Don't have an account? Sign Up"}
                  />
                </Grid>
                <Grid item>
                  <Link
                    to="/auth/forgot-password"
                    label={'Forgot password? Reset here'}
                  />
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
