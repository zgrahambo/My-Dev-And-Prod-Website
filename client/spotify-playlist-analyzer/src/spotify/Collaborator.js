import fetch from "node-fetch";
import Score from './Score'
import { awards, PersonalAwards } from './PersonalAwards'

// static vars:
let trackIdToCollabId = {}; 
let collabIdToCollabObj = {}; // main collaborators object
let orderOfCollaborators = []; // set order in which collaborators are displayed

// static constants:
const primaryColors = ["red", "blue", "yellow", "green", "orange", "purple", "hotpink", "aqua"];
const secondaryColors = ["rgb(255, 0, 0, 0.2)", "rgb(0, 0, 255, 0.2)", "rgb(255, 255, 0, 0.2)",
                       "rgb(0, 128, 0, 0.2)", "rgb(255, 165, 0, 0.2)", "rgb(128, 0, 128, 0.2)",
                       "rgb(255, 105, 180, 0.2)", "rgb(0, 255, 255, 0.2)"];

export class Collaborator {
  constructor(id, trackIds=[]){
    this.id = id;
    orderOfCollaborators.push(id);
    collabIdToCollabObj[id] = this;
    this.trackIds = trackIds;
    this.img = null;
    this.name = null;
    this.primaryColor = primaryColors.shift();
    this.secondaryColor = secondaryColors.shift();
    this.score = new Score();
    this.awards = new PersonalAwards();
  }

  addTrackId(trackId) {
    this.trackIds.push(trackId);
    trackIdToCollabId[trackId] = this.id;
    this.score.increaseNumTracks();
  }
  setImage(img) {
    this.img = img;
  }
  setName(name) {
    this.name = name;
  }
  getNumTracks() {
    return this.trackIds.length;
  }
}

function collectCollabNameAndImg(collabData) {
  collabIdToCollabObj[collabData.id].setImage(collabData.images[0].url);
  collabIdToCollabObj[collabData.id].setName(collabData.display_name);
}

export function collectAllUsersAFScores(audioFeaturesArray) {
  let currentCollaborator;
  audioFeaturesArray.forEach((audioFeature) => {
    currentCollaborator = collabIdToCollabObj[trackIdToCollabId[audioFeature.id]];
    currentCollaborator.score.increaseAcousticness(audioFeature.acousticness);
    currentCollaborator.score.increaseDanceability(audioFeature.danceability);
    currentCollaborator.score.increaseEnergy(audioFeature.energy);
    currentCollaborator.score.increaseInstrumentalness(audioFeature.instrumentalness);
    currentCollaborator.score.increaseLoudness(audioFeature.loudness);
    currentCollaborator.score.increaseTempo(audioFeature.tempo);
    currentCollaborator.score.increasePositivity(audioFeature.valence);
    currentCollaborator.score.increaseSpeechiness(audioFeature.speechiness);
  });
}

export function chooseEachCollabsAwards() {
  let collaborator, n, averages;
  for (let collaboratorID in collabIdToCollabObj) {
    collaborator = collabIdToCollabObj[collaboratorID];
    n = collaborator.getNumTracks();
    averages = collaborator.score.getAverages(n);

    let averageAF, currentAward;
    for (let average in averages) {
      averageAF = averages[average];
      currentAward = awards[average];
      if (averageAF > currentAward.val) {
        currentAward.id = collaboratorID;
        currentAward.val = averageAF;
      }
    }
  }
  for (let award in awards) {
    if (collabIdToCollabObj[awards[award].id])
      collabIdToCollabObj[awards[award].id].awards.addAward(awards[award]);
  }

  return collabIdToCollabObj;
}

export function generateCollaboratorObjects(tracks) {
  let collaborators = {}, currentCollaboratorId;
  tracks.forEach((track) => {
    currentCollaboratorId = track.added_by.id;

    if (!collaborators[currentCollaboratorId]) {
      collaborators[currentCollaboratorId] = new Collaborator(currentCollaboratorId);
    }
    collaborators[currentCollaboratorId].addTrackId(track.track.id);
    collaborators[currentCollaboratorId].score.increasePopularity(track.track.popularity);
    collaborators[currentCollaboratorId].score.increaseDuration(track.track.duration_ms);
  });
  return {collaborators: collaborators, order: orderOfCollaborators};
}

export function getCollaboratorData(token) {
  let promises = [];
  for (let collaboratorID in collabIdToCollabObj) {
    promises.push(fetch('https://api.spotify.com/v1/users/' + collaboratorID, {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + token}
    }));
  }

  return Promise.all(promises)
    .then(res => {
      let promises = [];
      res.forEach(data => {
        promises.push(data.json());
      });
      return Promise.all(promises)
        .then(res => {
          res.forEach(collabData => {
            collectCollabNameAndImg(collabData);
          })
        });
    })
    .then(() => {
      return collabIdToCollabObj;
    });
}

export function fetchAudioFeatures(token) {
  //TODO:  to support having collaborators having more than 100 songs I need
  // to loop through collaborator.trackIds one hundred at a time (since thats the max)
  // per request..
  const maxTracksPerCall = 100; // this is Spotify API's constant
  let promises = [], stringTrackIds, numCallsForThisCollaborator, trackIds;

  for (let collaboratorID in collabIdToCollabObj) {
    trackIds = collabIdToCollabObj[collaboratorID].trackIds;
    numCallsForThisCollaborator = Math.ceil(trackIds.length / maxTracksPerCall);
    for (let i = 0; i < numCallsForThisCollaborator; i++) {
      stringTrackIds = trackIds.slice(0, maxTracksPerCall).join();
      promises.push(fetch('https://api.spotify.com/v1/audio-features/?ids=' + stringTrackIds, {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + token}
      }));
    }
  }

  return Promise.all(promises);
}

export function getCollaboratorObjects() {
  return collabIdToCollabObj;
}
