import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 0,
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: 0,
      },
    },
  },
  palette: {
    primary: {
      light: '#a43773',
      main: '#8E0551',
      dark: '#630338',
      contrastText: '#fff',
    },
    secondary: amber,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
registerServiceWorker();
