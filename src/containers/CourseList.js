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
                <br/>
                <div className="row"></div>
                <div className="container-fluid">
            <div className="row">
                   <div className="col-3">
                       <h3>Course List</h3>
                   </div>
                    <div className="col-6">
                        <input onChange={this.titleChanged} className="form-control" id="titleFld"
                               placeholder="New Course"/>
                    </div>
                    <div className="col-3">
                        <button onClick={this.createCourse} className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                        </button>
                    </div>
            </div>
                    <br/>
            </div>
                <div className="container-fluid text-center">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th></th>
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
