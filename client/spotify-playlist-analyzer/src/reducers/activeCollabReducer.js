import {
  ACTIVATE_COLLABORATORS,
  TOGGLE_COLLABORATOR_CARD } from '../actions/types';

const initialState = {
  activeCollaborators: {}
};

export default function(state=initialState, action) {
  switch(action.type) {
    case ACTIVATE_COLLABORATORS:
      return {
        ...state,
        activeCollaborators: action.payload
      };
    case TOGGLE_COLLABORATOR_CARD:
      let collabStates = Object.assign({}, state.activeCollaborators);
      collabStates[action.payload] = !collabStates[action.payload];
      return {
        ...state,
        activeCollaborators: {
          ...collabStates
        }
      }
    default:
      return state;
  }
}