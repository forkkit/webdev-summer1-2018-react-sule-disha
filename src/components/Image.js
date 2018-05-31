import React from "react";
import * as actions from "../actions";
import {connect} from "react-redux";


const Image = ({widget, preview,  imgUrlChanged}) => {
    let inputElem
    return(
        <div>
            <div hidden={preview}>
                <input  className="form-control" placeholder="Image URL" onChange={() => imgUrlChanged(widget.id, inputElem.value)}
                          value={widget.src}
                          ref={node => inputElem = node}/>

                <h3>Preview</h3>
            </div>
            <img src={widget.src}/>
        </div>

    )
}

const dispatchToPropsMapper = dispatch => ({

    imgUrlChanged: (widgetId, newText) =>
        actions.imgUrlChanged(dispatch, widgetId, newText),

})

const stateToPropsMapper = state => ({
    preview: state.preview
})

export const ImageContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Image)