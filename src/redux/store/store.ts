import { createStore, combineReducers, applyMiddleware } from 'redux'
import { taskMiddleware } from 'react-palm/tasks'

import reducers from '../reducers/reducers'

// create store
export default createStore(reducers, {}, applyMiddleware(taskMiddleware))


