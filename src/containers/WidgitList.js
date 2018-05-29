import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions";
import {WidgetContainer} from '../components/Widget'

class WidgetList extends Component {
    constructor(props) {
        super(props);
        this.props.findAllWidgets()
    }

    render(){
        return (

            <div>
                <button hidden={this.props.previewMode} onClick={this.props.save}>
                    Save
                </button>
                <button onClick={this.props.preview}>
                    Preview
                </button>
                <ul>
                    {this.props.widgets.map(widget =>
                        <WidgetContainer key={widget.id}
                                         widget={widget}/>)}
                </ul>
                <button onClick={this.props.addWidget}>ADD WIDGET
                </button>
            </div>
        )


    }
}



const dispatcherToPropsMapper
    = dispatch => ({
    findAllWidgets: () => actions.findAllWidgets(dispatch),
    addWidget:() => actions.addWidget(dispatch),
    save:() => actions.save(dispatch),
    preview: () => actions.preview(dispatch)
})

const stateToPropertiesMapper = (state) => ({
    widgets: state.widgets,
    previewMode: state.preview
})



export const App = connect(stateToPropertiesMapper, dispatcherToPropsMapper)(WidgetList)