import * as actionTypes from "./ActionTypes";
import api from "@/config/api";

export const getUserSubscription = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.GET_USER_SUBSCRIPTION_REQUEST });
    try {
      const response = await api.get("/api/subscriptions/user", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: actionTypes.GET_USER_SUBSCRIPTION_SUCCESS,
        payload: response.data,
      });
      console.log("subscripción de usuario obtenida", response.data);
    } catch (error) {
      console.log("error --", error);
      dispatch({
        type: actionTypes.GET_USER_SUBSCRIPTION_FAILURE,
        error: error.message,
      });
    }
  };
};

export const upgradeSubscription = ({planType}) => {
    return async (dispatch) => {
      dispatch({ type: actionTypes.UPGRADE_SUBSCRIPTION_REQUEST });
      try {
        const response = await api.patch("/api/subscriptions/upgrade",null, {
          params: {
            planType: planType,
          },
        });
        dispatch({
          type: actionTypes.UPGRADE_SUBSCRIPTION_SUCCESS,
          payload: response.data,
        });
        console.log("subscripción de usuario ampliada", response.data);
      } catch (error) {
        console.log("error --", error);
        dispatch({
          type: actionTypes.UPGRADE_SUBSCRIPTION_FAILURE,
          error: error.message,
        });
      }
    };
  };
