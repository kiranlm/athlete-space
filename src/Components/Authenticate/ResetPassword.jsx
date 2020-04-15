import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const authSchema = Yup.object().shape({
  confirmationCode: Yup.string().required('Required'),
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

export default function ResetPassword(props) {
  const { classes } = props;
  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Reset your password
      </Typography>
      <Formik
        initialValues={{ username: '', confirmationCode: '', password: '' }}
        validationSchema={authSchema}
        onSubmit={(values, actions) => {
          // same shape as initial values
          const { username, confirmationCode, password } = values;
          props.resetPassword({ username, confirmationCode, password });
          actions.setSubmitting(false);
        }}
      >
        {({
          values: { confirmationCode, username, password },
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
                name="confirmationCode"
                label="Enter confirmation code"
                type="confirmationCode"
                id="confirmationCode"
                autoComplete="current-confirmationCode"
                helperText={
                  touched.confirmationCode ? errors.confirmationCode : ''
                }
                error={
                  touched.confirmationCode && Boolean(errors.confirmationCode)
                }
                value={confirmationCode}
                onChange={change.bind(null, 'confirmationCode')}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                label="New password"
                name="password"
                autoComplete="password"
                autoFocus
                helperText={touched.password ? errors.password : ''}
                error={touched.password && Boolean(errors.password)}
                value={password}
                onChange={change.bind(null, 'password')}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isSubmitting}
              >
                Activate account
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
