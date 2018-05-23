import React from 'react';
import CourseList from "./CourseList";
import CourseEditor from "./CourseEditor";
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'

class CourseManager extends React.Component {
    render() {
        return (
            <Router>
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <h1>Course Manager</h1>
                    </nav>
                    <Route path="/courses" component={CourseList}>
                    </Route>
                    <Route path="/course/:courseId/edit"
                           component={CourseEditor}>
                    </Route>
                </div>
            </Router>
        )
    }
}
export default CourseManager;
