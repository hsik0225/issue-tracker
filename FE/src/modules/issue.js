import { handleActions } from "redux-actions";
import createRequestThunk from "@Lib/createRequestThunk";
import * as api from "@Lib/api";

const GET_ISSUE = "issue/GET_ISSUE";
const GET_ISSUE_SUCCESS = "issue/GET_ISSUE_SUCCESS";

const GET_DETAIL_ISSUE = "issue/GET_DETAIL_ISSUE";
const GET_DETAIL_ISSUE_SUCCESS = "issue/GET_DETAIL_ISSUE_SUCCESS";

const POST_COMMENT = "issue/POST_COMMENT";
export const getIssue = createRequestThunk(GET_ISSUE, api.getIssue);
export const getDetailIssue = createRequestThunk(GET_DETAIL_ISSUE, api.getDetailIssue);
export const postComment = createRequestThunk(POST_COMMENT, api.postComment);

const initialState = {
  issues: null,
  detailIssue: null,
};

const issue = handleActions(
  {
    [GET_ISSUE_SUCCESS]: (state, action) => ({
      ...state,
      issues: action.payload.data.issues,
    }),
    [GET_DETAIL_ISSUE_SUCCESS]: (state, action) => ({
      ...state,
      detailIssue: action.payload.data,
    }),
  },
  initialState
);

export default issue;
