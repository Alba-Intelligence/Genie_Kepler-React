import { combineReducers, } from 'redux'
import keplerGlReducer from 'kepler.gl/reducers'

// Import the list of possible actions to be implemented

import { ADD_NOTE, REMOVE_NOTE } from '../actions/actions'

// The default initialState will be returned as a copy of the notes in store.
// Starts as an empty list in case nothing yet in store.

// rootReducer is the conventional name of the top reducer that will contain all the reducers.
function rootReducer(state = { notes: [], }, action: any) {
    switch (action.type) {
        case ADD_NOTE:
            return {
                notes: [
                    ...state.notes,
                    {
                        title: action.title,
                        content: action.content,
                    },
                ],
            }
        case REMOVE_NOTE:
            return {
                notes: state.notes.filter((note, index) => index != action.id),
            }

        default:
            return state
    }
}


const reducers = combineReducers({
    keplerGl: keplerGlReducer,
})

// export default rootReducer
export default reducers

