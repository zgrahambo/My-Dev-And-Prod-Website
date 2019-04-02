import fetch from "node-fetch";
import {
  FETCH_PLAYLISTS_LOADING,
  FETCH_PLAYLISTS_SUCCESS,
  FETCH_PLAYLISTS_FAILURE,
  ACTIVATE_DEMO,
  PLAYLIST_CHOSEN_TRACK_INFO_LOADING,
  FETCH_TRACKS_INFO_FAILURE,
  FETCH_TRACKS_INFO_SUCCESS,
  FETCH_COLLABORATOR_INFO_SUCCESS,
  FETCH_COLLABORATOR_INFO_FAILURE,
  FETCH_COLLABORATOR_AF_AWARDS_SUCCESS,
  FETCH_COLLABORATOR_AF_AWARDS_FAILURE,
  ACTIVATE_COLLABORATORS,
  CHOOSE_NEW_PLAYLIST } from './types';

import { 
  generateCollabGroupObject,
  getCollaboratorData,
  fetchAudioFeatures,
  chooseEachCollabsAwards,
  collectAllUsersAFScores,
  getCollaboratorObjects
} from '../spotify/utils';


/* fetchPlaylists is a function that takes in */
/* spotify token and returns an async function  */
/*  that is sent as a prop to the component     */
export function fetchPlaylists(token) {
  return (dispatch) => {
    dispatch({
      type: FETCH_PLAYLISTS_LOADING
    });

    fetch('https://api.spotify.com/v1/me/playlists', {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + token}
    })
    .then(res => res.json())
    .then(playlists => {
      dispatch({
        type: FETCH_PLAYLISTS_SUCCESS,
        payload: playlists
      });
    })
    .catch(error => dispatch({
      type: FETCH_PLAYLISTS_FAILURE,
      payload: {
        msg: "Something went wrong with the connection to the Spotify API",
        linkText: "Try with new token!"
      }
    }));
  }
}

export function fetchPlaylistInfo(token, playlistInfo) {
  return (dispatch) => {
    dispatch({
      type: PLAYLIST_CHOSEN_TRACK_INFO_LOADING,
      payload: playlistInfo.name
    });
    
    fetchPlaylistTracksInfo(token, playlistInfo.tracks.href, dispatch)
    .then(tracks => generateCollabGroupObject(tracks))
    .then((collabGroup) => {
      const collaborators = collabGroup.collabIdToCollabObj;
      dispatch({
        type: FETCH_TRACKS_INFO_SUCCESS,
        payload: { collaborators: collaborators,
                    order: collabGroup.collabOrder }
      });
      
      dispatch({
        type: ACTIVATE_COLLABORATORS,
        payload: Object.keys(collaborators).reduce((obj, currentValue) => {
                    obj[currentValue] = true;
                    return obj;
                  }, {})
      });
      return collabGroup;
    })
    .then(collabGroup => {
      createCollabCards(token, dispatch, collabGroup);
    })
    // .catch(err => dispatch({
    //   type: FETCH_TRACKS_INFO_FAILURE,
    //   payload: err
    // }));
  }
}

export function chooseNewPlaylist() {
  return (dispatch) => {
    dispatch({
      type: CHOOSE_NEW_PLAYLIST
    });
  }
}

export function activateDemo() {
  return (dispatch) => {
    dispatch({
      type: ACTIVATE_DEMO
    });
  }
}

async function fetchPlaylistTracksInfo(token, tracksLink, dispatch) {
  let tracks=[];

  while (tracksLink) {
    tracksLink = await fetch(tracksLink, {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + token}
    })
    .then(res => res.json())
    .then(data => {
      tracks.push(...data.items);
      return data.next;
    })
    .catch(err => dispatch({
      type: FETCH_TRACKS_INFO_FAILURE,
      payload: err
    }));
  }
  return tracks;
}

function createCollabCards(token, dispatch, collabGroup) {
  getCollaboratorData(token, collabGroup)
    .then(collabData => {
      dispatch({
        type: FETCH_COLLABORATOR_INFO_SUCCESS,
        payload: collabData
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_COLLABORATOR_INFO_FAILURE,
        payload: err
      })
    });
  fetchAudioFeatures(token, collabGroup)
    .then(res => {  // format to json
      let promises = [];
      res.forEach((audioFeature) => {
        promises.push(audioFeature.json());
      });
      return Promise.all(promises);
    })
    .then(res => { // distribute audio_feature scores to corresponding collaborators
      res.forEach((audioFeatures) => {
        collectAllUsersAFScores(audioFeatures.audio_features, collabGroup);
      });
    })
    .then(()=>{
      // Assign the awards and get the newly updated collaborator objects
      chooseEachCollabsAwards(collabGroup);
      return getCollaboratorObjects(collabGroup);
    })
    .then(collabData => {
      dispatch({
        type: FETCH_COLLABORATOR_AF_AWARDS_SUCCESS,
        payload: collabData
      });
    })
    .catch(err => dispatch({
      type: FETCH_COLLABORATOR_AF_AWARDS_FAILURE,
      payload: err
    }));
}