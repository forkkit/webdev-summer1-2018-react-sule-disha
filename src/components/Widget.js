import {connect} from "react-redux";
import React from "react";
import * as constants from "../constants/index";
import * as actions from "../actions/index"
import {HeadingContainer} from "./Heading";
import {ParagraphContainer} from "./Paragraph";
import {ImageContainer} from "./Image";
import {LinkContainer} from "./Link";
import {ListContainer} from "./List";

const Widget
    = ({ widget, preview, dispatch}) => {
    let selectElement
    return (
        <li>
            <div hidden={preview}>
            {widget.id} {widget.widgetType}
            <select value={widget.widgetType}
                    onChange={e =>
                        dispatch({
                            type: constants.SELECT_WIDGET_TYPE,
                            id: widget.id,
                            widgetType: selectElement.value
                        })} ref={node => selectElement = node}>
                <option>Heading</option>
                <option>List</option>
                <option>Paragraph</option>
                <option>Image</option>
                <option>Link</option>
            </select>
            <button onClick={
                e => (dispatch({type: constants.DELETE_WIDGET, id: widget.id}))}> DELETE
            </button>
            </div>
            <div>
                {widget.widgetType==='Heading' && <HeadingContainer widget={widget}/>}
                {widget.widgetType==='Paragraph' && <ParagraphContainer widget={widget}/>}
                {widget.widgetType==='List' && <ListContainer widget={widget}/>}
                {widget.widgetType==='Link' && <LinkContainer widget={widget} />}
                {widget.widgetType==='Image' && <ImageContainer widget={widget}/>}
            </div>

        </li>
    )
}
export const WidgetContainer = connect(state => ({
    preview: state.preview
}))(Widget)