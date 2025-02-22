import api from "@/config/api";
import {
  ACCEPT_INVITATION_REQUEST,
  ACCEPT_INVITATION_SUCCESS,
  CLOSE_EDIT_PROJECT_MODAL,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  FETCH_PROJECTS_BY_ID_REQUEST,
  FETCH_PROJECTS_BY_ID_SUCCESS,
  FETCH_PROJECTS_SUCCESS,
  INVITE_TO_PROJECT_REQUEST,
  INVITE_TO_PROJECT_SUCCESS,
  OPEN_EDIT_PROJECT_MODAL,
  SEARCH_PROJECTS_REQUEST,
  SEARCH_PROJECTS_SUCCESS,
  UPDATE_PROJECT_FAILURE,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
} from "./ActionTypes";

export const fetchProjects =
  ({ category, tag }) =>
  async (dispatch) => {
    dispatch({ type: FETCH_PROJECTS_BY_ID_REQUEST });
    try {
      const { data } = await api.get("/api/projects", {
        params: { category, tag },
      });
      console.log("Todos los proyectos", data);
      dispatch({ type: FETCH_PROJECTS_SUCCESS, projects: data });
    } catch (error) {
      console.log("error", error);
    }
  };

export const searchProjects = (keyword) => async (dispatch) => {
  dispatch({ type: SEARCH_PROJECTS_REQUEST });
  try {
    const { data } = await api.get("/api/projects/search?keyword=" + keyword);
    console.log("Buscando los proyectos", data);
    dispatch({ type: SEARCH_PROJECTS_SUCCESS, projects: data });
  } catch (error) {
    console.log("error", error);
  }
};

export const createProject = (projectData) => async (dispatch) => {
  dispatch({ type: CREATE_PROJECT_REQUEST });
  try {
    const { data } = await api.post("/api/projects", projectData);
    console.log("Creando el proyecto", data);
    dispatch({ type: CREATE_PROJECT_SUCCESS, project: data });
  } catch (error) {
    console.log("error", error);
  }
};

export const fetchProjectById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_PROJECTS_BY_ID_REQUEST });
  try {
    const { data } = await api.get("/api/projects/" + id);
    console.log("Leyendo el proyecto con id", data);
    dispatch({ type: FETCH_PROJECTS_BY_ID_SUCCESS, project: data });
  } catch (error) {
    console.log("error", error);
  }
};

export const deleteProject =
  ({ projectId }) =>
  async (dispatch) => {
    dispatch({ type: DELETE_PROJECT_REQUEST });
    try {
      const { data } = await api.delete("/api/projects/" + projectId);
      console.log("Borrando el proyecto con id", data);
      dispatch({ type: DELETE_PROJECT_SUCCESS, projectId });
    } catch (error) {
      console.log("error", error);
    }
  };

export const inviteToProject =
  ({ email, projectId }) =>
  async (dispatch) => {
    dispatch({ type: INVITE_TO_PROJECT_REQUEST });
    try {
      const { data } = await api.post("/api/projects/invite", {
        email,
        projectId,
      });
      console.log("Invitando al proyecto con id", data);
      dispatch({ type: INVITE_TO_PROJECT_SUCCESS, payload: data });
    } catch (error) {
      console.error("Error invitando al proyecto:", {
        message: error.message,
        response: error.response,
        config: error.config,
      });
    }
  };

export const acceptInvitation =
  ({ token, navigate }) =>
  async (dispatch) => {
    dispatch({ type: ACCEPT_INVITATION_REQUEST });
    try {
      const { data } = await api.get("/api/projects/accept_invitation", {
        params: {
          token,
        },
      });
      navigate("/project/" + data.projectId);
      console.log("Aceptando invitación al proyecto", data);
      dispatch({ type: ACCEPT_INVITATION_SUCCESS, payload: data });
    } catch (error) {
      console.log("error", error);
    }
  };

export const updateProject = (projectId, projectData) => async (dispatch) => {
  dispatch({ type: UPDATE_PROJECT_REQUEST });
  try {
    console.log("Enviando al backend", { projectId, projectData });

    // Verifica que projectId sea una cadena o número
    if (typeof projectId !== "string" && typeof projectId !== "number") {
      throw new Error("projectId no es válido");
    }

    // Asegúrate de pasar solo el projectId y el resto de los datos como projectData
    const { data } = await api.patch(`/api/projects/${projectId}`, projectData);
    console.log("Actualizando el proyecto", data);
    dispatch({ type: UPDATE_PROJECT_SUCCESS, project: data });
  } catch (error) {
    console.log("Error al actualizar el proyecto", error);
    dispatch({ type: UPDATE_PROJECT_FAILURE, error: error.message });
  }
};

export const openEditProjectModal = (project) => ({
  type: OPEN_EDIT_PROJECT_MODAL,
  payload: project,
});

export const closeEditProjectModal = () => ({
  type: CLOSE_EDIT_PROJECT_MODAL,
});
