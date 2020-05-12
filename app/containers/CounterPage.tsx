import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import {
  getVdcList,
  increment,
  decrement,
  incrementIfOdd,
  incrementAsync
} from '../actions/counter';
// import { counterStateType } from '../reducers/types';

function mapStateToProps(state: { counter: object } /*  counterStateType */) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      getVdcList,
      increment,
      decrement,
      incrementIfOdd,
      incrementAsync
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
