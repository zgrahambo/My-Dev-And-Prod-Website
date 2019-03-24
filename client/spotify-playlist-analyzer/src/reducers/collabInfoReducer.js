import {
  FETCH_TRACKS_INFO_SUCCESS,
  FETCH_COLLABORATOR_INFO_SUCCESS,
  FETCH_COLLABORATOR_AF_AWARDS_SUCCESS,
  CHOOSE_NEW_PLAYLIST } from '../actions/types';

const initialState = {
  loading: false,
  error: null,
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
        collaboratorsModel: {
          collaborators: {
            ...action.payload.collaborators
          },
          order: action.payload.order
        }
      };
    case FETCH_COLLABORATOR_INFO_SUCCESS:
      return {
        ...state,
        collaboratorsModel: {
          collaborators: {
            ...action.payload
          },
          order: state.collaboratorsModel.order
        },
        collabInfoLoaded: true
      };
    case FETCH_COLLABORATOR_AF_AWARDS_SUCCESS:
      return {
        ...state,
        collaboratorsModel: {
          collaborators: {
            ...action.payload
          },
          order: state.collaboratorsModel.order
        },
        collabAwardsLoaded: true
      };
    case CHOOSE_NEW_PLAYLIST:
      console.log("suppp?", {...initialState});
      return {
        ...state,
        ...initialState
      }
    default:
      return state;
  }
}