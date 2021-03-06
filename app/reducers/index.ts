import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import counter from './counter';
// import imageExport from './imageExport';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    counter // ,
    // imageExport
  });
}
