import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import CourseManager from "./containers/CourseManager";
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import * as constants from './constants/index'
import {widgetReducer} from './reducers/widgetReducer'
import {WidgetContainer} from './components/Widget'
import * as actions from './actions/index'
import {App}from './containers/WidgitList'


const store= createStore(widgetReducer)
ReactDOM.render(
    //<CourseManager/>,
    <Provider store={store}>
    <App/>
    </Provider>,
document.getElementById('root')
);
