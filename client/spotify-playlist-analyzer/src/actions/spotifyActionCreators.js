import fetch from "node-fetch";
import { 
  generateCollabGroupObject,
  getCollaboratorData,
  fetchAudioFeatures,
  chooseEachCollabsAwards,
  collectAllUsersAFScores,
  getCollaboratorObjects,
} from '../spotify/utils';
import demo from './demo.json';
import { activateDemo, startPlaylistPickerLoading, loadedPlaylistsSuccessfully,
         failedToLoadPlaylists, startedLoadingPlaylistInfo, failedToLoadPlaylistInfo,
         successfullyLoadedCollaboratorInfo, failedToLoadCollaboratorInfo,
         successfullyLoadedAudioFeatureAwards, failedToLoadedAudioFeatureAwards,
         successfullyLoadedPlaylistInfo, activateCollaborator, chooseNewPlaylistAction } from './actions';


// REAL (SPOTIFY API) PLAYLIST ACTION CREATORS AND HELPER FUNCTIONS

/* fetchPlaylists is a function that takes in */
/* spotify token and returns an async function  */
/*  that is sent as a prop to the component     */
export function fetchPlaylists(token) {
  return (dispatch) => {
    dispatch(startPlaylistPickerLoading());

    fetch('https://api.spotify.com/v1/me/playlists', {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + token}
    })
    .then(res => res.json())
    .then(playlists => {
      dispatch(loadedPlaylistsSuccessfully(playlists.items));
    })
    .catch(error => {
      dispatch(failedToLoadPlaylists("Something went wrong with the connection to the Spotify API", "Try with new token!"))
    });
  }
}

export function fetchPlaylistInfo(token, playlistInfo) {
  return (dispatch) => {
    dispatch(startedLoadingPlaylistInfo());
    
    fetchPlaylistTracksInfo(token, playlistInfo.tracks.href, dispatch)
    .then(tracks => generateCollabGroupObject(tracks))
    .then((collabGroup) => {
      const collaborators = collabGroup.collabIdToCollabObj;
      // should just pass returned data that collabcard users 
      dispatch(successfullyLoadedPlaylistInfo({ collaborators: collaborators, order: collabGroup.collabOrder }));
      dispatch(activateCollaborator(collaborators));
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
    dispatch(chooseNewPlaylistAction());
  };
};

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
    .catch(err => dispatch(failedToLoadPlaylistInfo(err)));
  }
  return tracks;
}

function createCollabCards(token, dispatch, collabGroup) {
  getCollaboratorData(token, collabGroup)
    .then(collaboratorsInfo => {
      dispatch(successfullyLoadedCollaboratorInfo(collaboratorsInfo));
    })
    .catch(err => {
      dispatch(failedToLoadCollaboratorInfo(err));
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
      dispatch(successfullyLoadedAudioFeatureAwards(collabData));
    })
    .catch(err => dispatch(failedToLoadedAudioFeatureAwards(err)));
}

// DEMO ACTION CREATORS AND HELPER FUNCTIONS
export function loadDemoPlaylists() {
  return (dispatch) => {
    dispatch(activateDemo());
    dispatch(startPlaylistPickerLoading());
    const playlists = getDemoPlaylists();
    dispatch(loadedPlaylistsSuccessfully(playlists));
  };
}

const getDemoPlaylists = () => {
  return demo.playlists;
}

export function getDemoPlaylistInfo(playlistInfo) {
  return (dispatch) => {
    dispatch(startedLoadingPlaylistInfo(playlistInfo.name));
    dispatch();
  };
}
