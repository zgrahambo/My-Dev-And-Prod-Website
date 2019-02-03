import {
  PLAYLIST_CHOSEN_TRACK_INFO_LOADING,
  FETCH_TRACKS_INFO_SUCCESS,
  FETCH_TRACKS_INFO_FAILURE } from '../actions/types';

const initialState = {
  playlistChosen: false,
  playlistName: "",
  loading: false,
  error: null
};

export default function(state=initialState, action) {
  switch(action.type) {
    case PLAYLIST_CHOSEN_TRACK_INFO_LOADING:
      return {
        ...state,
        playlistChosen: true,
        playlistName: action.payload,
        loading: true
      };
    case FETCH_TRACKS_INFO_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case FETCH_TRACKS_INFO_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}