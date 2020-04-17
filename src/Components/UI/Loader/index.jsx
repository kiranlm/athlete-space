import React from 'react';
import { makeStyles, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  overlay: {
    position: 'fixed',
    display: 'block' /* Hidden by default */,
    width: '100%' /* Full width (cover the whole page) */,
    height: '100%' /* Full height (cover the whole page) */,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.66)' /* Black background with opacity */,
    opacity: 0.8,
    zIndex: 2 /* Specify a stack order in case you're using a different order for other elements */,
    cursor: 'progress' /* Add a pointer on hover */,
  },

  loadingContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    fontSize: '50px',
    color: 'white',
    transform: 'translate(-50%, -50%)',
  },
  label: {
    paddingLeft: '1rem',
    color: '#fff',
    fontSize: '3rem',
  },
}));
function Loader(props) {
  const classes = useStyles();
  return (
    <div className={classes.overlay}>
      <span className={classes.loadingContent}>
        <CircularProgress color="secondary" />
        <span className={classes.label}>{props.label}</span>
      </span>
    </div>
  );
}

export default Loader;
