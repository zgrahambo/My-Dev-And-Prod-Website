import { combineReducers } from 'redux';
import playlistPickerReducer from './playlistPickerReducer';
import playlistInfoReducer from './playlistInfoReducer';
import collabInfoReducer from './collabInfoReducer';

export default combineReducers({
  playlists: playlistPickerReducer,
  playlistInfo: playlistInfoReducer,
  collabInfo: collabInfoReducer
});