import * as actionTypes from "./ActionTypes"
import api from "@/config/api"

export const fetchIssues = (projectId) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_ISSUES_REQUEST });
    try {
      const response = await api.get(`/api/issues/project/${projectId}`);
      console.log("obteniendo tareas", response.data);
      dispatch({
        type: actionTypes.FETCH_ISSUES_SUCCESS,
        issues: response.data,
      });
    } catch (error) {
      console.log("error --", error);
      dispatch({
        type: actionTypes.FETCH_ISSUES_FAILURE,
        error: error.message,
      });
    }
  };
};

export const fetchIssuesById = (issueId) => {
    return async (dispatch) => {
      dispatch({ type: actionTypes.FETCH_ISSUES_BY_ID_REQUEST });
      try {
        const response = await api.get(`/api/issues/${issueId}`);
        console.log("obteniendo tarea por id", response.data);
        dispatch({
          type: actionTypes.FETCH_ISSUES_BY_ID_SUCCESS,
          issues: response.data,
        });
      } catch (error) {
        console.log("error --", error);
        dispatch({
          type: actionTypes.FETCH_ISSUES_BY_ID_FAILURE,
          error: error.message,
        });
      }
    };
};

export const updateIssueStatus = ({issueId, status}) => {
    return async (dispatch) => {
      dispatch({ type: actionTypes.UPDATE_ISSUE_STATUS_REQUEST });
      try {
        const response = await api.put(`/api/issues/${issueId}/status/${status}`);
        console.log("actualizando estado de la tarea", response.data);
        dispatch({
          type: actionTypes.UPDATE_ISSUE_STATUS_SUCCESS,
          issues: response.data,
        });
      } catch (error) {
        console.log("error --", error);
        dispatch({
          type: actionTypes.UPDATE_ISSUE_STATUS_FAILURE,
          error: error.message,
        });
      }
    };
};

export const assignedUserToIssue = ({issueId, userId}) => {
    return async (dispatch) => {
      dispatch({ type: actionTypes.ASSIGNED_ISSUE_TO_USER_REQUEST });
      try {
        const response = await api.put(`/api/issues/${issueId}/assignee/${userId}`);
        console.log("tarea asignada a usuario", response.data);
        dispatch({
          type: actionTypes.ASSIGNED_ISSUE_TO_USER_SUCCESS,
          issues: response.data,
        });
      } catch (error) {
        console.log("error --", error);
        dispatch({
          type: actionTypes.ASSIGNED_ISSUE_TO_USER_FAILURE,
          error: error.message,
        });
      }
    };
};

export const deleteIssue = (issueId) =>{
    return async (dispatch) => {
        dispatch({type: actionTypes.DELETE_ISSUE_REQUEST})
        try {
            await api.delete(`/api/issues/${issueId}`)
            dispatch({type: actionTypes.DELETE_ISSUE_SUCCESS, issueId})
            console.log("tarea eliminada")
        } catch (error) {
            console.log("error -- ", error)
            dispatch({
                type: actionTypes.DELETE_ISSUE_FAILURE,
                error: error.message
            })
        }
    }
}