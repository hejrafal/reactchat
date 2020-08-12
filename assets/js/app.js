import React from 'react';
import ReactDom from 'react-dom';
import MainPage from "./Components/MainPage";
import {createStore} from 'redux';
import reducer from "./store/reducer";
import {Provider} from 'react-redux';

const store = createStore(reducer);

ReactDom.render(
    <Provider store={store}>
        <MainPage/>
    </Provider>,
    document.getElementById('page')
);