import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
// import './styles/scss/global';
import App from './layout/App';
=======
import App from './Layout/App';
import './styles/scss/global';
>>>>>>> a565bbdf29640754235926106e0dfceaa6fae9e3
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
