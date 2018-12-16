import { combineReducers } from 'redux';
import playlistPickerReducer from './playlistPickerReducer';
import collabCardReducer from './collabCardReducer';

export default combineReducers({
  playlists: playlistPickerReducer,
  playlistInfo: collabCardReducer
});