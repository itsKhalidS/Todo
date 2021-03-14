import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';

const myMiddleware = (store) => (next) => (action) => {
  console.log('Prev State: ', store.getState());
  console.log('Action: ', action);
  next(action);
  console.log('Next State: ', store.getState());
};

const store = createStore(reducer, applyMiddleware(myMiddleware));
export default store;
