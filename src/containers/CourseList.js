import React from 'react';
import CourseRow from "../components/CourseRow";
import CourseService from '../services/CourseService';
import '../../node_modules/font-awesome/css/font-awesome.min.css';

class CourseList extends React.Component {
    constructor() {
        super();
        this.courseService = CourseService.instance;
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.state = {courses: []};
    }

    componentDidMount() {
        this.findAllCourses();
    }

    renderCourseRows() {
        let courses = this.state.courses.map(
            (course) => {
                return <CourseRow course={course} key={course.id} delete={this.deleteCourse}/>;
            }
        );
        return (
            courses
        )}


    titleChanged(event) {
        this.setState({
            course: { title: event.target.value }
        });
    }
    createCourse() {
        this.courseService
            .createCourse(this.state.course)
            .then(() => { this.findAllCourses(); });

    }

    deleteCourse(courseId) {
        this.courseService
            .deleteCourse(courseId).then(() => { this.findAllCourses(); });
    }



    findAllCourses() {
        this.courseService.findAllCourses()
            .then((courses) => {
                this.setState({courses: courses});
                console.log(courses);
            });
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <table className="table">
                    <tbody>
                    <tr align="left">
                        <th><h3>Course List</h3></th>
                        <th><input onChange={this.titleChanged} className="form-control" id="titleFld"
                                   placeholder="New Course"/></th>
                        <th><button onClick={this.createCourse} className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                        </button></th>
                    </tr>
                    </tbody>
                    </table>
                </nav>
                <div className="jumbotron text-center">
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Last Modified</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderCourseRows()}
                    </tbody>
                </table>
                </div>
            </div>
        )
    }
}
export default CourseList;
