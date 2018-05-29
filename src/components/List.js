import React from "react";
import * as actions from "../actions";
import {connect} from "react-redux";

const List = () => (
    <h2>List</h2>
)

export const ListContainer = connect()(List)