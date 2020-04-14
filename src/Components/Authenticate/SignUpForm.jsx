import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Link from '../UI/Link';
import { Typography, TextField, Button, Grid } from '@material-ui/core';

const authSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid Username').required('Required'),
});

export default function SignUpForm(props) {
  const { classes } = props;
  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <Formik
        initialValues={{ username: '', password: '', email: '' }}
        validationSchema={authSchema}
        onSubmit={(values, actions) => {
          // same shape as initial values
          const { username, password, email } = values;
          props.signUp({ username, password, email });
          actions.setSubmitting(false);
        }}
      >
        {({
          values: { password, username, email },
          errors,
          touched,
          handleChange,
          isValid,
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
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Id"
                name="email"
                autoComplete="email"
                autoFocus
                helperText={touched.email ? errors.email : ''}
                error={touched.email && Boolean(errors.email)}
                value={email}
                onChange={change.bind(null, 'email')}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isSubmitting}
              >
                Register
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    to="/auth/login"
                    label={'Already have an account? Sign In'}
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
