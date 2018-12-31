import React, { Component } from 'react';
import { connect } from 'react-redux';

//import {  } from 'semantic-ui-react';
import { Radar } from 'react-chartjs-2';

class CollabChart extends Component {
  getDatasets = () => {
    const collaborators = this.props.collaborators;
    let datasets = [];
    for(let collab in collaborators) {
      const collaborator = collaborators[collab];
      const avgs = collaborator.score.getAverages();
      let dataset = {
        "label": collaborator.name,
        "data": [avgs.acousticness,avgs.danceability,avgs.energy,avgs.instrumentalness,
                 avgs.speechiness,avgs.positivity],
        "fill": true,
        "backgroundColor": collaborator.secondaryColor,
        "borderColor": collaborator.primaryColor,
        "pointBackgroundColor": collaborator.primaryColor,
        "pointBorderColor": "#fff",
        "pointHoverBackgroundColor": "#fff",
        "pointHoverBorderColor": collaborator.primaryColor
      };
      datasets.push(dataset)
    }
    return datasets;
  }

  render() {
    console.log("CollabChart.js ", this.props.collaborators);
    const datasets = this.getDatasets();
    const options = {
      scale: {
        ticks: {
            beginAtZero: true,
            max: 1
        }
      }
    }
    console.log(datasets);
    const data = {
      labels: ["Acousticness", "Danceability", "Energy", "Instrumentalness", "Speechiness", "Valence"],
      datasets: datasets
    };
    return (this.props.collabAwardsLoaded && 
      <Radar data={data}
      options={options}
      width={50} 
      height={50} />
    );
  }
}
const mapStateToProps = state => ({
  collaborators: state.playlistInfo.collaborators,
  collabInfoLoaded: state.playlistInfo.collabInfoLoaded,
  collabAwardsLoaded: state.playlistInfo.collabAwardsLoaded
});

export default connect(mapStateToProps, {}) (CollabChart);