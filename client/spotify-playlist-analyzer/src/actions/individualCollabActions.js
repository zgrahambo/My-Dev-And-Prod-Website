import {
  ACTIVATE_COLLABORATORS } from './types';

export function activateCollaborators() {
  return (dispatch) => {
    dispatch({
      type: ACTIVATE_COLLABORATORS,
      payload: {}
    })
  }
}