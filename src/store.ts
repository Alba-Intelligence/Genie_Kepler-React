import { createStore, combineReducers, applyMiddleware } from 'redux'
import { taskMiddleware } from 'react-palm/tasks'

import keplerGlReducer from 'kepler.gl/reducers'

const reducers = combineReducers({
    keplerGl: keplerGlReducer,
})

// create store
export default createStore(reducers, {}, applyMiddleware(taskMiddleware))

