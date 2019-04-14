import { FETCH_PLAYLISTS_LOADING,
         FETCH_PLAYLISTS_SUCCESS,
         FETCH_PLAYLISTS_FAILURE,
         ACTIVATE_DEMO,
         CHOOSE_NEW_PLAYLIST } from "../actions/types";

const initialState = {
  playlists: [],
  loading: false,
  error: null,
  demo: false
};

export default function(state=initialState, action) {
  switch(action.type) {
    case FETCH_PLAYLISTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case FETCH_PLAYLISTS_SUCCESS:
      console.log(action.playlists)
      return {
        ...state,
        loading: false,
        playlists: action.playlists
      };
    case FETCH_PLAYLISTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        playlists: []
      };
    case ACTIVATE_DEMO:
      console.log(state);
      return {
        ...state,
        ...initialState,
        demo: true
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