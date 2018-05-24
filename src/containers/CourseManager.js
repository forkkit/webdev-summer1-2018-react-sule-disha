import React from 'react';
import CourseList from "./CourseList";
import CourseEditor from "./CourseEditor";
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'

class CourseManager extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-light" style={{backgroundColor: "#563d7c"}}>
                    <h4 style={{color:"white"}}>Course Manager</h4>
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
