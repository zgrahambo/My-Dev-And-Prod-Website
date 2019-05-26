import {
  FETCH_PLAYLISTS_LOADING,
  FETCH_PLAYLISTS_SUCCESS,
  FETCH_PLAYLISTS_FAILURE,
  ACTIVATE_LOGGED_IN,
  ACTIVATE_DEMO,

  PLAYLIST_CHOSEN_TRACK_INFO_LOADING,
  FETCH_TRACKS_INFO_SUCCESS,
  FETCH_TRACKS_INFO_FAILURE,

  FETCH_COLLABORATOR_INFO_SUCCESS,
  FETCH_COLLABORATOR_INFO_FAILURE,
  
  FETCH_COLLABORATOR_AF_AWARDS_SUCCESS,
  FETCH_COLLABORATOR_AF_AWARDS_FAILURE,
  ACTIVATE_COLLABORATORS,
  CHOOSE_NEW_PLAYLIST,
  RESTART_APP } from './types';
  
export const activateLoggedIn = (token) => {
  return {
    type: ACTIVATE_LOGGED_IN,
    token: token
  };
};

export const activateDemo = () => {
  return {
    type: ACTIVATE_DEMO
  };
};

export const startPlaylistPickerLoading = () => {
  return {
    type: FETCH_PLAYLISTS_LOADING
  };
};

export const loadedPlaylistsSuccessfully = (playlists) => {
  return {
    type: FETCH_PLAYLISTS_SUCCESS,
    playlists: playlists
  };
};

export const failedToLoadPlaylists = (errMsg, errLinkMsg) => {
  return {
    type: FETCH_PLAYLISTS_FAILURE,
    payload: {
      msg: errMsg,
      linkText: errLinkMsg
    }
  };
};

export const startedLoadingPlaylistInfo = (playlistName) => {
  return {
    type: PLAYLIST_CHOSEN_TRACK_INFO_LOADING,
    playlistName: playlistName
  };
};

export const successfullyLoadedPlaylistInfo = (playlistInfo) => {
  return {
    type: FETCH_TRACKS_INFO_SUCCESS,
    payload: { collaborators: playlistInfo.collaborators,
               order: playlistInfo.order }
  };
};

export const failedToLoadPlaylistInfo = (error) => {
  return {
    type: FETCH_TRACKS_INFO_FAILURE,
    payload: error
  };
};

export const successfullyLoadedCollaboratorInfo = (collaborators) => {
  return {
    type: FETCH_COLLABORATOR_INFO_SUCCESS,
    collaborators: collaborators
  };
};

export const failedToLoadCollaboratorInfo = (error) => {
  return { 
    type: FETCH_COLLABORATOR_INFO_FAILURE,
    payload: error
  };
};

export const successfullyLoadedAudioFeatureAwards = (collaborators) => {
  return {
    type: FETCH_COLLABORATOR_AF_AWARDS_SUCCESS,
    collaborators: collaborators
  };
};

export const failedToLoadedAudioFeatureAwards = (error) => {
  return {
    type: FETCH_COLLABORATOR_AF_AWARDS_FAILURE,
    payload: error
  };
};

export const activateCollaborator = (collaborators) => {
  return {
    type: ACTIVATE_COLLABORATORS,
    activeCollaborators: Object.keys(collaborators).reduce((obj, currentValue) => {
                obj[currentValue] = true;
                return obj;
              }, {})
  };
}

export const chooseNewPlaylistAction = () => {
  return {
    type: CHOOSE_NEW_PLAYLIST
  };
};

export const restartAppAction = () => {
  return {
    type: RESTART_APP
  };
};
