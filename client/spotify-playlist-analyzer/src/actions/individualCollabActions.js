import {
  ACTIVATE_COLLABORATORS,
  TOGGLE_COLLABORATOR_CARD } from './types';

export function activateCollaborators() {
  return (dispatch) => {
    dispatch({
      type: ACTIVATE_COLLABORATORS,
      payload: {}
    })
  }
}

export function toggleActiveCollaborator(id) {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_COLLABORATOR_CARD,
      payload: id
    })
  }
}