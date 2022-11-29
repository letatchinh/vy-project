import axios from "axios";
import {
  ALL_CATEGORIES_FAIL,
  ALL_CATEGORIES_REQUEST,
  ALL_CATEGORIES_SUCCESS,
} from "../constants/categoryConstant";
import { CLEAR_ERRORS } from "../constants/userConstant";

// Get All CATEGORIES
export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CATEGORIES_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/category`);

    dispatch({ type: ALL_CATEGORIES_SUCCESS, payload: data.categories });
    return data;
  } catch (error) {
    dispatch({
      type: ALL_CATEGORIES_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
