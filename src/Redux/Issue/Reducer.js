import * as actionTypes from "./ActionTypes";

const initialState = {
  issues: [],
  loading: false,
  error: null,
  issueDetails: null,
};

export const issueReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ISSUES_REQUEST:
    case actionTypes.FETCH_ISSUES_BY_ID_REQUEST:
    case actionTypes.CREATE_ISSUE_REQUEST:
    case actionTypes.ASSIGNED_ISSUE_TO_USER_REQUEST:
    case actionTypes.DELETE_ISSUE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.CREATE_ISSUE_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: [...state.issues, action.issue]
      }
    case actionTypes.FETCH_ISSUES_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: action.issues,
      };
    case actionTypes.FETCH_ISSUES_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        issueDetails:action.issue
      }
    case actionTypes.UPDATE_ISSUE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        issueDetails:{
          ...state.issueDetails,
          status: action.issues.status
        },
      };
    case actionTypes.ASSIGNED_ISSUE_TO_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: state.issues.map((issue) =>
          issue.id === action.payload.id ? action.payload : issue
        ),
        issueDetails: state.issueDetails?.id === action.payload.id
      ? action.payload
      : state.issueDetails,
      };
    case actionTypes.DELETE_ISSUE_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: state.issues.filter((issue) => issue.id !== action.issueId),
      };
    case actionTypes.FETCH_ISSUES_FAILURE:
    case actionTypes.CREATE_ISSUE_FAILURE:
    case actionTypes.DELETE_ISSUE_FAILURE:
    case actionTypes.ASSIGNED_ISSUE_TO_USER_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
