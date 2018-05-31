import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions";
import {WidgetContainer} from '../components/Widget'
import ToggleButton from 'react-toggle-button'

class WidgetList extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    componentWillReceiveProps(newProps) {
        if (newProps.lessonId !== this.props.lessonId) {
            this.props.findAllWidgetsForLesson(newProps.lessonId);
        }
    }

    render() {
        return (

            <div>
                <div className="row">
                    <button className="btn btn-primary" hidden={this.props.previewMode} onClick={() => {
                        this.props.save(this.props.lessonId)
                    }}>
                        Save
                    </button>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <ToggleButton value={this.props.previewMode} onToggle={this.props.preview}/>
                    &nbsp; &nbsp;
                    <h6>Preview</h6>
                </div>
                <br/>
                <br/>
                <div className="container-fluid">
                    <br/>
                    {this.props.widgets.sort((w1, w2) => w1.widgetOrder > w2.widgetOrder).map(widget =>
                        <WidgetContainer key={widget.id}
                                         widget={widget}
                                         widgetsLength={this.props.widgets.length}/>)}
                </div>
                <br/>
                <button className="btn btn-primary" onClick={this.props.addWidget}>ADD WIDGET
                </button>
            </div>
        )


    }
}


const dispatcherToPropsMapper
    = (dispatch) => ({
    findAllWidgets: () => actions.findAllWidgets(dispatch),
    addWidget: () => actions.addWidget(dispatch),
    save: (lessonId) => actions.save(dispatch, lessonId),
    preview: () => actions.preview(dispatch),
    findAllWidgetsForLesson: (lessonId) => actions.findAllWidgetsForLesson(dispatch, lessonId)
})

const stateToPropertiesMapper = (state) => ({
    widgets: state.widgets,
    previewMode: state.preview,
})


export const App = connect(stateToPropertiesMapper, dispatcherToPropsMapper)(WidgetList)