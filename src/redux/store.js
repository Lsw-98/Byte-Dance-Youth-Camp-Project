import { createStore, combineReducers } from 'redux'
import { CollapsedReducer } from './CollapsedReducer'
import { LoadingReducer } from './LoadingReducer'

const reducer = combineReducers({
  CollapsedReducer,
  LoadingReducer,
})
const store = createStore(reducer)

export default store