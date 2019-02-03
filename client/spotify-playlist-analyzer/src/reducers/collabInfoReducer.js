import {
  FETCH_TRACKS_INFO_SUCCESS,
  FETCH_COLLABORATOR_INFO_SUCCESS,
  FETCH_COLLABORATOR_AF_AWARDS_SUCCESS } from '../actions/types';

const initialState = {
  loading: false,
  error: null,
  collaborators: {},
  collabInfoLoaded: false,
  collabAwardsLoaded: false
};

export default function(state=initialState, action) {
  switch(action.type) {
    case FETCH_TRACKS_INFO_SUCCESS:
      return {
        ...state,
        collaborators: action.payload
      };
    case FETCH_COLLABORATOR_INFO_SUCCESS:
      return {
        ...state,
        collaborators: action.payload,
        collabInfoLoaded: true
      };
    case FETCH_COLLABORATOR_AF_AWARDS_SUCCESS:
      return {
        ...state,
        collaborators: action.payload,
        collabAwardsLoaded: true
      };
    default:
      return state;
  }
}