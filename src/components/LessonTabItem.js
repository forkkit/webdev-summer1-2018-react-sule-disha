import React from 'react';
export default class LessonTabItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li class="nav-item">{this.props.lesson.title}
                <button className="btn btn-danger" onClick={() =>{this.props.delete(this.props.lesson.id)}}>DELETE</button></li>

    )}
}
