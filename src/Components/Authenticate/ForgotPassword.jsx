import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const authSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
});

export default function ForgotPassword(props) {
  const { classes } = props;
  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Forgot password?
      </Typography>
      <Formik
        initialValues={{ username: '' }}
        validationSchema={authSchema}
        onSubmit={(values, actions) => {
          // same shape as initial values
          const { username } = values;
          props.forgotPassword({ username });
          actions.setSubmitting(false);
        }}
      >
        {({
          values: { username },
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
