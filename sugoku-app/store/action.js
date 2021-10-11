import {
  SET_INITIAL_BOARD,
  SET_BOARD,
  SET_LOADING,
  SET_INPUT_BOARD,
  SET_STATUS,
  SET_LEADERBOARD,
} from "./actionType";
import axios from "axios";
import encodeParams from "../helpers/encode";

export function setInitialBoard(payload) {
  return { type: SET_INITIAL_BOARD, payload };
}

export function setBoard(payload) {
  return { type: SET_BOARD, payload };
}

export function setInputBoard(payload) {
  return { type: SET_INPUT_BOARD, payload };
}

export function setLoading(payload) {
  return { type: SET_LOADING, payload };
}

export function setStatus(payload) {
  return { type: SET_STATUS, payload };
}

export function setLeaderboard(payload) {
  return { type: SET_LEADERBOARD, payload };
}

export function validate(payload) {
  return function (dispatch) {
    let status;
    return axios({
      method: `POST`,
      url: `https://sugoku.herokuapp.com/validate`,
      data: encodeParams(payload),
    })
      .then((response) => {
        dispatch(setStatus(response.data.status));
        status = response.data.status;
        return status;
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function solve(payload) {
  return function (dispatch) {
    axios({
      method: `POST`,
      url: `https://sugoku.herokuapp.com/solve`,
      data: encodeParams(payload),
    })
      .then((response) => {
        dispatch(setBoard(response.data.solution));
        dispatch(setStatus(response.data.status));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function fetchDataBoard(payload) {
  return function (dispatch) {
    dispatch(setLoading(true));
    axios
      .get(`https://sugoku.herokuapp.com/board?difficulty=${payload}`)
      .then((response) => {
        dispatch(setInitialBoard(response.data.board));
        dispatch(setBoard(response.data.board));
        dispatch(setStatus("unsolved"));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}
