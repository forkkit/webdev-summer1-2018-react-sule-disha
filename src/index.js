import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import CourseManager from "./containers/CourseManager";


//const store= createStore(widgetReducer)
ReactDOM.render(
    <CourseManager/>,
    /**
     <Provider store={store}>
     <App/>
     </Provider>,
     **/
    document.getElementById('root')
);
