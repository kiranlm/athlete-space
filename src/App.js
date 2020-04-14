import React, { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import appSyncConfig from './aws-exports';
import { ApolloProvider } from 'react-apollo';
import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import Dashboard from './Components/Dashboard';
import Authenticate from './Components/Authenticate';
import Amplify, { Hub, Auth } from 'aws-amplify';

Amplify.configure(appSyncConfig);

const initialUserState = { user: null, loading: true };

const App = () => {
  const [userState, dispatch] = useReducer(reducer, initialUserState);

  useEffect(() => {
    // set listener for auth events
    Hub.listen('auth', (data) => {
      const { payload } = data;
      if (payload.event === 'signIn') {
        dispatch({ type: 'setUser', user: payload.data });
      }
      // this listener is needed for form sign ups since the OAuth will redirect & reload
      if (payload.event === 'signOut') {
        dispatch({ type: 'setUser', user: null });
      }
    });
    checkUser(dispatch);
  }, []);

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/auth" component={Authenticate} />
        </Switch>
        <Route exact path="/">
          <Dashboard userState={userState} />
        </Route>
      </div>
    </Router>
  );
};

function reducer(state, action) {
  switch (action.type) {
    case 'setUser':
      return { ...state, user: action.user, loading: false };
    case 'loaded':
      return { ...state, loading: false };
    default:
      return state;
  }
}

async function checkUser(dispatch) {
  try {
    const user = await Auth.currentAuthenticatedUser();
    console.log('user: ', user);
    dispatch({ type: 'setUser', user });
  } catch (err) {
    console.log('err: ', err);
    dispatch({ type: 'loaded' });
  }
}

const client = new AWSAppSyncClient({
  url: appSyncConfig.aws_appsync_graphqlEndpoint,
  region: appSyncConfig.aws_appsync_region,
  auth: {
    type: appSyncConfig.aws_appsync_authenticationType,
    apiKey: appSyncConfig.aws_appsync_apiKey,
  },
  cacheOptions: {},
});

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
);

export default WithProvider;
