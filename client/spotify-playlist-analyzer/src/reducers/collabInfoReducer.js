import {
  FETCH_TRACKS_INFO_SUCCESS,
  FETCH_COLLABORATOR_INFO_SUCCESS,
  FETCH_COLLABORATOR_AF_AWARDS_SUCCESS,
  CHOOSE_NEW_PLAYLIST,
  RESTART_APP } from '../actions/types';

const initialState = {
  loading: false,
  error: null,
  orderedCollaborators: [],
  collaborators: {},
  collabInfoLoaded: false,
  collabAwardsLoaded: false
};

export default function(state=initialState, action) {
  switch(action.type) {
    case FETCH_TRACKS_INFO_SUCCESS:
      return {
        ...state,
        collaborators: {
          ...updateCollaboratorProps(action.payload.collaborators, ['id', 'primaryColor', 'secondaryColor', 'numTracksAdded'], state.collaborators)
        },
        orderedCollaborators: action.payload.order,
      };
    case FETCH_COLLABORATOR_INFO_SUCCESS:
      return {
        ...state,
        collaborators: {
          ...updateCollaboratorProps(action.collaborators, ['img', 'name'], state.collaborators)
        },
        collabInfoLoaded: true
      };
    case FETCH_COLLABORATOR_AF_AWARDS_SUCCESS:
      return {
        ...state,
        collaborators: {
          ...updateCollaboratorProps(action.collaborators, ['awards', 'score'], state.collaborators)
        },
        collabAwardsLoaded: true
      };
    case CHOOSE_NEW_PLAYLIST:
      return {
        ...state,
        ...initialState
      }
    case RESTART_APP:
      return {
        ...state,
        ...initialState
      }
    default:
      return state;
  }
}

const updateCollaboratorProps = (collaborators, properties, prevCollabsState) => {
  let updatedCollaborators = {};
  for (let id in collaborators) {
    updatedCollaborators[id] = {
      ...prevCollabsState[id]
    }
    properties.forEach((property) => {
      updatedCollaborators[id][property] = collaborators[id][property];
    });
  }
  return updatedCollaborators;
}