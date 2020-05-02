import React from 'react';
import jwtDecode from 'jwt-decode';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.scss';
import App from './App';
import {setAccessToken, getUserData, logoutUser} from './store/user'
import * as serviceWorker from './serviceWorker';
import store from './store'

const token = localStorage.getItem("accessToken");
if(token){
  store.dispatch(setAccessToken(token));
  store.dispatch(getUserData(token));
}


// if (token) {
//   const decodedToken = jwtDecode(token);
//   if (decodedToken.exp * 1000 < Date.now()) {
//     store.dispatch(logoutUser());
//     window.location.href = '/login';
//   } else {
//     store.dispatch(setAccessToken(token));
//     store.dispatch(getUserData());
//   }
// }

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
