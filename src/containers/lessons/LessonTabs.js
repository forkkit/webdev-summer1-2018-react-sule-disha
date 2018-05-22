import React from 'react';
import LessonService from '../../services/LessonService';
import ModuleService from "../../services/ModuleService";
import LessonTabItem from "../../components/LessonTabItem"
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router} from 'react-router-dom'
import {Route} from 'react-router-dom'
import LessonEditor from "./LessonEditor";

export default class LessonTabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {moduleId: '' , courseId:'',
            lesson: {title: ''}, lessons:[]};
        this.setModuleId =
            this.setModuleId.bind(this);
        this.setLessonTitle =
            this.setLessonTitle.bind(this);
        this.createLesson =
            this.createLesson.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.lessonService = LessonService.instance;


    }
    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setLessonTitle(event) {
        this.setState({lesson: {
                title: event.target.value
            }})}


    createLesson() {
        this.lessonService.createLesson(this.state.courseId, this.state.moduleId, this.state.lesson).then(() => {
            this.findAllLessonsForModule
            (this.state.moduleId, this.state.courseId);
        })
    }

    deleteLesson(lessonId) {this.lessonService
        .deleteLesson(lessonId)
        .then(() => {
            this.findAllLessonsForModule
            (this.state.moduleId, this.state.courseId )
        });
    }

    findAllLessonsForModule(moduleId, courseId) {
        this.lessonService
            .findAllLessonsForModule(moduleId, courseId)
            .then((lessons) => {this.setLessons(lessons)});
    }
    setLessons(lessons) {
        this.setState({lessons: lessons})
    }


    componentDidMount() {
        this.setModuleId(this.props.moduleId);
        this.setCourseId(this.props.courseId);
    }
    componentWillReceiveProps(newProps){
        this.setModuleId(newProps.moduleId);
        this.setCourseId(newProps.courseId);
        this.findAllLessonsForModule(newProps.moduleId, newProps.courseId)

    }


    renderLessons() {

        let lessons = this.state.lessons.map((lesson) => {
            return (<LessonTabItem key={lesson.id}
                                    lesson={lesson}
                                   moduleId={this.props.moduleId}
                                   courseId={this.props.courseId}
                                   delete={this.deleteLesson}/>)
        });
        return (
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist"> {lessons}</div></nav>
        )

    }



    render() {
        return (
            <Router>
            <div className="container-fluid">
            <h4>Lesson Tabs for Course: {this.state.courseId} Module: {this.state.moduleId}</h4>
                <input value={this.state.lesson.title} className="form-control" placeholder="New Lesson" onChange={this.setLessonTitle}/>
                <button onClick={this.createLesson} className="btn btn-primary">Create</button>
                {this.renderLessons()}
                <div class="tab-content">
                        <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId" component={LessonEditor}/>
                </div>
            </div>
            </Router>
                )}}


