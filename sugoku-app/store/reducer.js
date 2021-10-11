import {
  SET_INITIAL_BOARD,
  SET_BOARD,
  SET_LOADING,
  SET_INPUT_BOARD,
  SET_STATUS,
  SET_LEADERBOARD,
} from "./actionType";

const initialState = {
  initialBoard: [],
  board: [],
  loading: true,
  status: "unsolved",
  leaderboard: [],
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_INITIAL_BOARD:
      return { ...state, initialBoard: payload };
    case SET_BOARD:
      return { ...state, board: payload };
    case SET_INPUT_BOARD:
      const newBoard = JSON.parse(JSON.stringify(state.board));
      newBoard[payload.row][payload.col] = payload.value;
      return { ...state, board: newBoard };
    case SET_LOADING:
      return { ...state, loading: payload };
    case SET_STATUS:
      return { ...state, status: payload };
    case SET_LEADERBOARD:
      return { ...state, leaderboard: [...state.leaderboard, payload] };
    default:
      return state;
  }
};

export default reducer;
