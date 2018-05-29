import React from 'react';
import ModuleService from '../../services/ModuleService';
import ModuleListItem from '../../components/ModuleListItem';
import ModuleEditor from './ModuleEditor';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'


export default class ModuleList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {courseId: '', module: {title: ''}, modules: []};
        this.setCourseId =
            this.setCourseId.bind(this);
        this.setModuleTitle =
            this.setModuleTitle.bind(this);
        this.createModule =
            this.createModule.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.moduleService = ModuleService.instance;

    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setModuleTitle(event) {
        this.setState({
            module: {
                title: event.target.value
            }
        })
    }

    createModule() {
        this.moduleService.createModule(this.state.courseId, this.state.module).then(() => {
            this.findAllModulesForCourse
            (this.state.courseId);
        })
        ;

    }

    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {
                this.setModules(modules)
            });
    }

    setModules(modules) {
        this.setState({modules: modules})
    }


    componentDidMount() {
        this.setCourseId(this.props.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId)

    }

    deleteModule(moduleId) {
        this.moduleService
            .deleteModule(moduleId)
            .then(() => {
                this.findAllModulesForCourse
                (this.state.courseId)
            });
    }


    renderModules() {
        let modules = this.state.modules.map((module) => {
            return (
                <ModuleListItem module={module} key={module.id} courseId={this.state.courseId}
                                delete={this.deleteModule}/>
            )
        });
        return (<ul className="list-group">{modules}</ul>)
    }

    render() {
        return (
            <Router>
                <div className="row">
                    <div className="col-4 bg-light">
                        <table className="table">
                            <tbody>
                            <tr>
                                <td><input value={this.state.module.title} onChange={this.setModuleTitle}
                                           className="form-control" placeholder="New Module"/></td>
                                <td align="right">
                                    <button onClick={this.createModule} className="btn btn-primary"><i
                                        className="fa fa-plus"></i></button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        {this.renderModules()}
                    </div>
                    <div className="col-8"><Route path="/course/:courseId/module/:moduleId" component={ModuleEditor}/>
                    </div>
                </div>
            </Router>)
    }
}
