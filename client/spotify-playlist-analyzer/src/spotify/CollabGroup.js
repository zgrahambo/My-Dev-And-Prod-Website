// static constants:
const primaryColors = ["red", "blue", "yellow", "green", "orange", "purple", "hotpink", "aqua"];
const secondaryColors = ["rgb(255, 0, 0, 0.2)", "rgb(0, 0, 255, 0.2)", "rgb(255, 255, 0, 0.2)",
                       "rgb(0, 128, 0, 0.2)", "rgb(255, 165, 0, 0.2)", "rgb(128, 0, 128, 0.2)",
                       "rgb(255, 105, 180, 0.2)", "rgb(0, 255, 255, 0.2)"];
const awards = {
  duration: {
    icon: 'clock outline',
    text: 'Longest avg song length',
    id: '',
    val: 0
  },
  popularity: {
    icon: 'group',
    text: 'Most popular songs',
    id: '',
    val: 0
  },
  acousticness: {
    icon: 'battery zero',
    text: 'Loves acoustic songs',
    id: '',
    val: 0
  },
  danceability: {
    icon: 'child',
    text: 'Enjoys dancing music',
    id: '',
    val: 0
  },
  energy: {
    icon: 'bolt',
    text: 'High energy songs',
    id: '',
    val: 0
  },
  tempo: {
    icon: 'fire',
    text: 'Fastest tempo songs',
    id: '',
    val: 0
  },
  positivity: {
    icon: 'plus square',
    text: 'Most positive vibes',
    id: '',
    val: 0
  },
  speechiness: {
    icon: 'talk',
    text: 'Enjoys spoken words',
    id: '',
    val: 0
  },
  loudness: {
    icon: 'volume up',
    text: 'Turns it up to 11',
    id: '',
    val: 0
  },
  instrumentalness: {
    icon: 'wrench',
    text: 'Enjoys real instruments',
    id: '',
    val: 0
  }
};

export class CollabGroup {
  constructor(collaborators={}) {
    this.collabIdToCollabObj = collaborators; // main collaborators object
    this.collabOrder = []; // order in which collaborators are displayed
    this.trackIdToCollabId = {}; // mapping of each track id to the id of the collaborator that added them
    this.awards = JSON.parse(JSON.stringify(awards));
    let i = 0;
    for(let id in collaborators) {
      this.collabOrder.push(id);
      this.collabIdToCollabObj[id].primaryColor = primaryColors[i%primaryColors.length];
      this.collabIdToCollabObj[id].secondaryColor = secondaryColors[i%secondaryColors.length];
      i++;
      for(let trackIndex in collaborators[id].trackIds) {
        this.trackIdToCollabId[collaborators[id].trackIds[trackIndex]] = id;
      }
    }
  }
}