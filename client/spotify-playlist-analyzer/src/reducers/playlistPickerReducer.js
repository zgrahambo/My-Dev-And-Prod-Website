import { FETCH_PLAYLISTS_LOADING,
         FETCH_PLAYLISTS_SUCCESS,
         FETCH_PLAYLISTS_FAILURE,
         ACTIVATE_DEMO,
         CHOOSE_NEW_PLAYLIST, 
         ACTIVATE_LOGGED_IN,
         RESTART_APP} from "../actions/types";

const initialState = {
  playlists: [],
  loading: false,
  error: null,
  token: null,
  loggedIn: false,
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
        playlists: action.playlists
      };
    case FETCH_PLAYLISTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        playlists: []
      };
    case ACTIVATE_LOGGED_IN:
      return {
        ...state,
        loggedIn: true,
        token: action.token
      }
    case ACTIVATE_DEMO:
      return {
        ...state,
        ...initialState,
        demo: true
      }
    case CHOOSE_NEW_PLAYLIST:
      return {
        ...state,
        ...initialState,
        token: state.token,
        demo: state.demo,
        loggedIn: state.loggedIn
      }
    case RESTART_APP:
      return {
        ...state,
        ...initialState
      }
    default:
      return state;
  }
}