import { createStore, combineReducers } from 'redux'
import { CollapsedReducer } from './CollapsedReducer'

const reducer = combineReducers({
  CollapsedReducer,
})
const store = createStore(reducer)

export default store