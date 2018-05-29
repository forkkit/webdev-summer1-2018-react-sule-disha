import React from "react";
import * as actions from "../actions";
import {connect} from "react-redux";


const Link = ({widget, preview,  hrefChanged}) => {
    let inputElem
    return(
        <div>
            <div hidden={preview}>
                <input onChange={() => hrefChanged(widget.id, inputElem.value)}
                       value={widget.href}
                       ref={node => inputElem = node}/>

                <h3>Preview</h3>
            </div>
            <a href={widget.href}>{widget.href}</a>
        </div>

    )
}

const dispatchToPropsMapper = dispatch => ({

    hrefChanged: (widgetId, newText) =>
        actions.hrefChanged(dispatch, widgetId, newText),

})

const stateToPropsMapper = state => ({
    preview: state.preview
})

export const LinkContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Link)