import { combineReducers } from 'redux';
import playlistPickerReducer from './playlistPickerReducer';
import playlistInfoReducer from './playlistInfoReducer';
import collabInfoReducer from './collabInfoReducer';
import activeCollabReducer from './activeCollabReducer';

export default combineReducers({
  playlists: playlistPickerReducer,
  playlistInfo: playlistInfoReducer,
  collabInfo: collabInfoReducer,
  activeCollab: activeCollabReducer
});