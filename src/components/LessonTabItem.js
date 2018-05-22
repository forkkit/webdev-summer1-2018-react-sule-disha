import React from 'react';
import LessonEditor from "../containers/lessons/LessonEditor";
import { Route, Link } from 'react-router-dom'
export default class LessonTabItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <div class="nav-item" data-toggle="tab"  role="tab">
                <Link to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lesson.id}`}>{this.props.lesson.title}</Link>
                <button className="btn btn-danger" onClick={() =>{this.props.delete(this.props.lesson.id)}}>DELETE</button></div>
           </div>

    )}
}
