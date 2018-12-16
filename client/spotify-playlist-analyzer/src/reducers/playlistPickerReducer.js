import { FETCH_PLAYLISTS_LOADING,
         FETCH_PLAYLISTS_SUCCESS,
         FETCH_PLAYLISTS_FAILURE } from "../actions/types";

const initialState = {
  playlists: [],
  loading: false,
  error: null
};

export default function(state=initialState, action) {
  switch(action.type) {
    case FETCH_PLAYLISTS_LOADING:
      return {
        ...state,
        loading: true,
        error: null
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
    default:
      return state;
  }
}