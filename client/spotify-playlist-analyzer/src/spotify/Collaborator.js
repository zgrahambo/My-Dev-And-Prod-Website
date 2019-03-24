import Score from './Score'
import { PersonalAwards } from './PersonalAwards'

export class Collaborator {
  constructor(id, trackIds=[]){
    this.id = id;
    this.trackIds = trackIds;
    this.img = null;
    this.name = null;
    this.score = new Score();
    this.awards = new PersonalAwards();
  }

  addTrackId(trackId) {
    this.trackIds.push(trackId);
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
