// static constants:
const primaryColors = ["red", "blue", "yellow", "green", "orange", "purple", "hotpink", "aqua"];
const secondaryColors = ["rgb(255, 0, 0, 0.2)", "rgb(0, 0, 255, 0.2)", "rgb(255, 255, 0, 0.2)",
                       "rgb(0, 128, 0, 0.2)", "rgb(255, 165, 0, 0.2)", "rgb(128, 0, 128, 0.2)",
                       "rgb(255, 105, 180, 0.2)", "rgb(0, 255, 255, 0.2)"];

export class CollabGroup {
  constructor(collaborators={}) {
    this.collabIdToCollabObj = collaborators; // main collaborators object
    this.collabOrder = []; // set order in which collaborators are displayed
    this.trackIdToCollabId = {};
    let i = 0;
    for(let id in collaborators) {
      this.collabOrder.push(id);
      this.collabIdToCollabObj[id].primaryColor = primaryColors[i%primaryColors.length];
      this.collabIdToCollabObj[id].secondaryColor = secondaryColors[i%secondaryColors.length];
      i++;
      for(let trackIndex in collaborators[id].trackIds) {
        console.log("trackid", collaborators[id].trackIds[trackIndex]);
        console.log("collaborators[id]", collaborators[id])
        this.trackIdToCollabId[collaborators[id].trackIds[trackIndex]] = id;
      }
    }
  }
}