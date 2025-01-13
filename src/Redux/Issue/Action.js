import * as actionTypes from "./ActionTypes";
import api from "@/config/api";

export const fetchIssues = (id) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_ISSUES_REQUEST });
    try {
      const response = await api.get(`/api/issues/project/${id}`);
      console.log("obteniendo todas las tareas", response.data);
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

export const fetchIssuesById = (id) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_ISSUES_BY_ID_REQUEST });
    try {
      const response = await api.get(`/api/issues/${id}`);
      console.log("obteniendo tarea por id", response.data);
      dispatch({
        type: actionTypes.FETCH_ISSUES_BY_ID_SUCCESS,
        issue: response.data,
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

export const updateIssueStatus = ({ id, status }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_ISSUE_STATUS_REQUEST });
    try {
      const response = await api.put(`/api/issues/${id}/status/${status}`);
      console.log("actualizando estado de la tarea", response.data);
      dispatch({
        type: actionTypes.UPDATE_ISSUE_STATUS_SUCCESS,
        payload: response.data,
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

export const assignedUserToIssue = ({ issueId, userId }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.ASSIGNED_ISSUE_TO_USER_REQUEST });
    try {
      const response = await api.put(
        `/api/issues/${issueId}/assignee/${userId}`
      );
      console.log("tarea asignada a usuario", response.data);
      dispatch({
        type: actionTypes.ASSIGNED_ISSUE_TO_USER_SUCCESS,
        payload: response.data,
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

export const createIssue = (issueData) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_ISSUE_REQUEST });
    try {
      const response = await api.post("/api/issues", issueData);
      dispatch({
        type: actionTypes.CREATE_ISSUE_SUCCESS,
        issue: response.data,
      });
      console.log("tarea añadida correctamente", response.data);
    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_ISSUE_FAILURE,
        error: error.message,
      });
    }
  };
};

export const deleteIssue = (issueId) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_ISSUE_REQUEST });
    try {
      await api.delete(`/api/issues/${issueId}`);
      dispatch({ type: actionTypes.DELETE_ISSUE_SUCCESS, issueId });
      console.log("tarea eliminada");
    } catch (error) {
      console.log("error -- ", error);
      dispatch({
        type: actionTypes.DELETE_ISSUE_FAILURE,
        error: error.message,
      });
    }
  };
};

export const updateIssue = (id, issueData) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_ISSUE_REQUEST });
    try {
      const { data } = await api.put(`/api/issues/${id}`, issueData);
      console.log("tarea actualizada", data);
      dispatch({
        type: actionTypes.UPDATE_ISSUE_SUCCESS,
        issue: data,
      });
    } catch (error) {
      console.log("error --", error);
      dispatch({
        type: actionTypes.UPDATE_ISSUE_FAILURE,
        error: error.message,
      });
    }
  };
};

export const openEditIssueModal = (issue) => ({
  type: actionTypes.OPEN_EDIT_ISSUE_MODAL,
  payload: issue,
});

export const closeEditIssueModal = () => ({
  type: actionTypes.CLOSE_EDIT_ISSUE_MODAL,
});
