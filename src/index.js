import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import App from './App';
import initialState from './reducers/initialState'
import configureStore from './store/configureStore';
import {fetchMessages} from './actions/messageActions';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore(initialState);
store.dispatch(fetchMessages());

render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
