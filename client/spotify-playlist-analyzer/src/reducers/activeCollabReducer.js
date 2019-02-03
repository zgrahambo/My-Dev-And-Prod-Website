import {
  ACTIVATE_COLLABORATORS } from '../actions/types';

const initialState = {
  activeCollaborators = {}
};

export default function(state=initialState, action) {
  switch(action.type) {
    case ACTIVATE_COLLABORATORS:
      return {
        ...state,
        activeCollaborators: action.payload
      };
    default:
      return state;
  }
}