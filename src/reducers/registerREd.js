import { REG } from '../actions';



const INITIAL_STATE = {
  userDetails: {},
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REG:
      return Object.assign({}, state, { userDetails: action.payload });
    default:
      return state;
  }
}
