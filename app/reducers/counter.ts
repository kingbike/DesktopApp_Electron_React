import { Action } from 'redux';
import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  GETVDCLIST_COUNTER
} from '../actions/counter';

export default function counter(
  state = { count: 1, vdcList: [] },
  action: Action<string>
) {
  const { data } = action;
  switch (action.type) {
    case INCREMENT_COUNTER:
      return { ...state, count: state.count + 1 };
    case DECREMENT_COUNTER:
      return { ...state, count: state.count - 1 };
    case GETVDCLIST_COUNTER:
      return {
        ...state,
        vdcList: data
      };
    default:
      return state;
  }
}
