import {
  FETCH_TRACKS_INFO_SUCCESS,
  FETCH_COLLABORATOR_INFO_SUCCESS,
  FETCH_COLLABORATOR_AF_AWARDS_SUCCESS,
  CHOOSE_NEW_PLAYLIST } from '../actions/types';

const initialState = {
  loading: false,
  error: null,
  orderedCollaborators: [],
  collaborators: {},
  collaboratorsModel: {
    collaborators: {},
    order: []
  },
  collabInfoLoaded: false,
  collabAwardsLoaded: false
};

export default function(state=initialState, action) {
  switch(action.type) {
    case FETCH_TRACKS_INFO_SUCCESS:
      return {
        ...state,
        collaborators: {
          ...action.payload.collaborators
        },
        orderedCollaborators: action.payload.order,
        // collaboratorsModel: {
        //   collaborators: {
        //     ...action.payload.collaborators
        //   },
        //   order: action.payload.order
        // }
      };
    case FETCH_COLLABORATOR_INFO_SUCCESS:
      return {
        ...state,
        collaborators: updateEachCollaborator(action.collaborators),
        collabInfoLoaded: true
      };
    case FETCH_COLLABORATOR_AF_AWARDS_SUCCESS:
      return {
        ...state,
        collaborators: updateEachCollaborator(action.collaborators),
        // collaboratorsModel: {
        //   collaborators: {
        //     ...action.collaborators
        //   },
        //   order: state.collaboratorsModel.order
        // },
        collabAwardsLoaded: true
      };
    case CHOOSE_NEW_PLAYLIST:
      return {
        ...state,
        ...initialState
      }
    default:
      return state;
  }
}

const updateEachCollaborator = (collaborators) => {
  let updatedCollaborators = {};
  for (let id in collaborators) {
    updatedCollaborators[id] = {
      ...collaborators[id]
    };
  }
  return updatedCollaborators;
}