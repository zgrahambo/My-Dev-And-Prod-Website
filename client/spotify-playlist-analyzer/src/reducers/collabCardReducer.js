import {
  PLAYLIST_CHOSEN_TRACK_INFO_LOADING,
  FETCH_TRACKS_INFO_SUCCESS,
  FETCH_TRACKS_INFO_FAILURE,
  FETCH_COLLABORATOR_INFO_SUCCESS,
  FETCH_COLLABORATOR_AF_AWARDS_SUCCESS } from '../actions/types';

const initialState = {
  collaborators: {},
  playlistInfo: null,
  loading: false,
  error: null,
  playlistChosen: false,
  collabInfoLoaded: false,
  collabAwardsLoaded: false
};

export default function(state=initialState, action) {
  switch(action.type) {
    case PLAYLIST_CHOSEN_TRACK_INFO_LOADING:
      return {
        ...state,
        playlistChosen: true,
        loading: true,
        playlistInfo: action.payload,
        error: null
      };
    case FETCH_TRACKS_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        collaborators: action.payload
      };
    case FETCH_TRACKS_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        collaborators: {}
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