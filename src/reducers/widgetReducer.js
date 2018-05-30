import * as constants from "../constants/index";

Array.prototype.move
    = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};


export const widgetReducer=(state= {widgets:[], preview: false}, action)=>{
    switch(action.type){


        case constants.LIST_TYPE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.listType = action.text
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.LIST_ITEM_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.listItem = action.text
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.HREF_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.href = action.text
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.IMG_URL_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.src = action.text
                    }
                    return Object.assign({}, widget)
                })
            }
        case constants.PARAGRAPH_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.text = action.text
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.FIND_ALL_WIDGETS_FOR_LESSON:
            return {
                widgets: action.widgets,
                lessonId: action.lessonId
            }

        case constants.PREVIEW:
            return {
                widgets: state.widgets,
                preview: !state.preview
            }

        case constants.HEADING_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.text = action.text
                    }
                    return Object.assign({}, widget)
                })
            }
        case constants.HEADING_SIZE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.size = action.size
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.SELECT_WIDGET_TYPE:
            let newState = {
                widgets: state.widgets.filter((widget) => {
                    if(widget.id === action.id) {
                        widget.widgetType = action.widgetType
                    }
                    return true;
                })
            }
            return JSON.parse(JSON.stringify(newState))

        case constants.SAVE:
            fetch('http://localhost:8080/api/lesson/LID/widgets'.replace('LID',action.lessonId), {
                method: 'post',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'}
            })
            return state;


        case constants.FIND_ALL_WIDGETS:
            console.log(action.widgets)
            return {
                widgets: action.widgets
            }

        case constants.ADD_WIDGET:
            return {
                widgets:[
                    ...state.widgets,
                    {
                        id: state.widgets.length+1,
                        text: "",
                        widgetType: 'Heading',
                        size: '1',
                        widgetOrder:state.widgets.length+1
                    }
                ]
            }
        case constants.DELETE_WIDGET:
            return {
                widgets: state.widgets.filter(widget=> (
                    widget.id !== action.id)).map(widget => {
                    if(widget.widgetOrder>action.widgetOrder)
                        widget.widgetOrder=widget.widgetOrder-1
                    return widget;
                })}

        case 'MOVE_UP':
            let newState2 = {
                widgets: state.widgets.map(widget => {
                    if(widget.widgetOrder===(action.widgetOrder - 1))
                        widget.widgetOrder=widget.widgetOrder+1
                    if(widget.id=== action.id)
                        widget.widgetOrder=widget.widgetOrder-1
                    return widget
    })}
                return Object.assign({}, newState2)



        case 'MOVE_DOWN':
            let newState3 = {
                widgets: state.widgets.map(widget => {
                    if(widget.widgetOrder===(action.widgetOrder + 1))
                        widget.widgetOrder=widget.widgetOrder-1
                    if(widget.id=== action.id)
                        widget.widgetOrder=widget.widgetOrder+1
                    return widget
                })}
            return Object.assign({}, newState3)

        default:
            return state
    }
}
