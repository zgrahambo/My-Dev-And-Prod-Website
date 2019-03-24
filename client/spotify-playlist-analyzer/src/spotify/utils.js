import { Collaborator } from './Collaborator';
import { CollabGroup } from './CollabGroup';
import { awards } from './PersonalAwards';

export function generateCollabGroupObject(tracks) {
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
  return new CollabGroup(collaborators);
}

export function getCollaboratorData(token, collabGroup) {
  let promises = [];
  for (let collaboratorID in collabGroup.collabIdToCollabObj) {
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
            collabGroup.collabIdToCollabObj[collabData.id].setImage(collabData.images[0].url);
            collabGroup.collabIdToCollabObj[collabData.id].setName(collabData.display_name);
          });
        });
    })
    .then(() => {
      return collabGroup.collabIdToCollabObj;
    });
}

export function fetchAudioFeatures(token, collabGroup) {
  //TODO:  to support having collaborators having more than 100 songs I need
  // to loop through collaborator.trackIds one hundred at a time (since thats the max)
  // per request..
  const maxTracksPerCall = 100; // this is Spotify API's constant
  let promises = [], stringTrackIds, numCallsForThisCollaborator, trackIds;

  for (let collaboratorID in collabGroup.collabIdToCollabObj) {
    trackIds = collabGroup.collabIdToCollabObj[collaboratorID].trackIds;
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

export function collectAllUsersAFScores(audioFeaturesArray, collabGroup) {
  let currentCollaborator;
  console.log(audioFeaturesArray);
  audioFeaturesArray.forEach((audioFeature) => {
    console.log(audioFeature);
    console.log(collabGroup)
    currentCollaborator = collabGroup.collabIdToCollabObj[collabGroup.trackIdToCollabId[audioFeature.id]];
    console.log(currentCollaborator)
    currentCollaborator.score.increaseAcousticness(audioFeature.acousticness);
    currentCollaborator.score.increaseDanceability(audioFeature.danceability);
    currentCollaborator.score.increaseEnergy(audioFeature.energy);
    currentCollaborator.score.increaseInstrumentalness(audioFeature.instrumentalness);
    currentCollaborator.score.increaseLoudness(audioFeature.loudness);
    currentCollaborator.score.increaseTempo(audioFeature.tempo);
    currentCollaborator.score.increasePositivity(audioFeature.valence);
    currentCollaborator.score.increaseSpeechiness(audioFeature.speechiness);
    console.log("hello2")
  });
  
}

export function chooseEachCollabsAwards(collabGroup) {
  let collaborator, n, averages;
  for (let collaboratorID in collabGroup.collabIdToCollabObj) {
    collaborator = collabGroup.collabIdToCollabObj[collaboratorID];
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
    if (collabGroup.collabIdToCollabObj[awards[award].id])
      collabGroup.collabIdToCollabObj[awards[award].id].awards.addAward(awards[award]);
  }

  return collabGroup.collabIdToCollabObj;
}

export function getCollaboratorObjects(collabGroup) {
  return collabGroup.collabIdToCollabObj;
}