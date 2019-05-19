import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleActiveCollaborator } from '../../../actions/individualCollabActions';

import { Grid } from 'semantic-ui-react';
import { Radar } from 'react-chartjs-2';

class CollabChart extends Component {
  constructor(props) {
    super(props);
    this.labels = ["Acousticness", "Danceability", "Energy", "Instrumentalness", "Speechiness", "Valence"];
    this.options = {
      scale: {
        ticks: {
            beginAtZero: true,
            max: 1
        }
      },
      legend: {
        onClick: this.legendClickHandler
      }
    };
  }
  legendClickHandler = (clickEvent, legendClicked) => {
    this.props.toggleActiveCollaborator(this.props.orderedCollaborators[legendClicked.datasetIndex])
  }
  getDatasets = () => {
    const collaborators = this.props.collaborators;
    let datasets = [];
    this.props.orderedCollaborators.forEach((collabID) => {
      const collaborator = collaborators[collabID];
      const avgs = {};
      const numTracks = collaborator.score.numTracks;
      avgs.acousticness = collaborator.score.acousticness/numTracks;
      avgs.danceability = collaborator.score.danceability/numTracks;
      avgs.energy = collaborator.score.energy/numTracks;
      avgs.instrumentalness = collaborator.score.instrumentalness/numTracks;
      avgs.speechiness = collaborator.score.speechiness/numTracks;
      avgs.positivity = collaborator.score.positivity/numTracks;
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
        "pointHoverBorderColor": collaborator.primaryColor,
        "hidden": !this.props.active[collabID]
      };
      datasets.push(dataset);
    });
    
    return datasets;
  }

  render() {
    if (!this.props.collabAwardsLoaded) {
      return null;
    }
    
    const data = {
      labels: this.labels,
      datasets: this.getDatasets()
    };
    return (this.props.collabAwardsLoaded && 
      <Grid centered>
        <Grid.Column width={10}>
          <Radar data={data}
                  options={this.options}
                  width={50} 
                  height={50} />
        </Grid.Column>
      </Grid>
    );
  }
}
const mapStateToProps = state => ({
  collaborators: state.collabInfo.collaborators,
  orderedCollaborators: state.collabInfo.orderedCollaborators,
  collabInfoLoaded: state.collabInfo.collabInfoLoaded,
  collabAwardsLoaded: state.collabInfo.collabAwardsLoaded,
  active: state.activeCollab.activeCollaborators
});

export default connect(mapStateToProps, { toggleActiveCollaborator }) (CollabChart);