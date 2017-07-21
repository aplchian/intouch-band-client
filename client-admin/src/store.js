import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import events from './reducers/events'
import { getAllEvents } from './services/events'
import { setAllEvents, startFetchingEvents } from './actions/events'
import { reducer as formReducer } from 'redux-form'

const store = createStore(
  combineReducers({
    events,
    form: formReducer
  }),
  applyMiddleware(thunk)
)

function getEvents(dispatch, getState) {
  dispatch(startFetchingEvents())
  getAllEvents(
    'band_Stop_Light_Observations'
  ).then(({ data: { docs: allEvents } }) => {
    dispatch(setAllEvents(allEvents))
  })
}

store.dispatch(getEvents)

export default store
