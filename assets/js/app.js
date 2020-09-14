import React from 'react';
import ReactDom from 'react-dom';
import MainPage from "./Components/MainPage";
import {createStore, combineReducers} from 'redux';
import userReducer from "./store/reducers/user";
import roomReducer from "./store/reducers/room";
import messageReducer from "./store/reducers/message";
import mainReducer from "./store/reducers/main";
import {Provider} from 'react-redux';

const rootReducer = combineReducers({
    user: userReducer,
    message: messageReducer,
    main: mainReducer,
    room: roomReducer
});

const store = createStore(rootReducer);

ReactDom.render(
    <Provider store={store}>
        <MainPage/>
    </Provider>,
    document.getElementById('page')
);
