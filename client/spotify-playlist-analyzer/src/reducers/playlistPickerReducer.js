import { FETCH_PLAYLISTS_LOADING,
         FETCH_PLAYLISTS_SUCCESS,
         FETCH_PLAYLISTS_FAILURE,
         ACTIVATE_DEMO } from "../actions/types";

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
      return {
        ...state,
        loading: false,
        playlists: action.payload
      };
    case FETCH_PLAYLISTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        playlists: []
      };
    case ACTIVATE_DEMO:
      return {
        ...state,
        ...initialState,
        demo: true
      }
    default:
      return state;
  }
}