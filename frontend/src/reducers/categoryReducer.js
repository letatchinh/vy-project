import {
  ALL_CATEGORIES_FAIL,
  ALL_CATEGORIES_REQUEST,
  ALL_CATEGORIES_SUCCESS,
} from "../constants/categoryConstant";
import { CLEAR_ERRORS } from "../constants/userConstant";

export const allCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case ALL_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        CATEGORIES: action.payload,
      };

    case ALL_CATEGORIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
