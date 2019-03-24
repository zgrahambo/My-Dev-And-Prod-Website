import {
  ACTIVATE_COLLABORATORS,
  TOGGLE_COLLABORATOR_CARD,
  CHOOSE_NEW_PLAYLIST } from '../actions/types';

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
    case CHOOSE_NEW_PLAYLIST:
      return {
        ...state,
        ...initialState
      }
    default:
      return state;
  }
}