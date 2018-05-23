import React from 'react';
import { Link } from 'react-router-dom'
import '../../node_modules/font-awesome/css/font-awesome.min.css';

class CourseRow extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <tr>
                <td><i class="fa fa-file-text" aria-hidden="true"></i></td>
                <td>        <Link to={`/course/${this.props.course.id}/edit`}>
                {this.props.course.title}
            </Link></td>
                <td>{this.props.course.modified}</td>
        <td><button className="btn bg-transparent" onClick={() =>
        {this.props.delete(this.props.course.id)}}>
            <i className="fa fa-times"></i>
        </button>
            </td>
            </tr>

            )
    }
}
export default CourseRow;
