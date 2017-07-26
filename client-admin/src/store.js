import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import events from "./reducers/events"
import { getAllEvents } from "./services/events"
import { setAllEvents, startFetchingEvents } from "./actions/events"
import { reducer as formReducer } from "redux-form"

const composeWithDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers({
    events,
    form: formReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
)

function getEvents(dispatch, getState) {
  dispatch(startFetchingEvents())
  getAllEvents(
    "band_Stop_Light_Observations"
  ).then(({ data: { docs: allEvents } }) => {
    dispatch(setAllEvents(allEvents))
  })
}

store.dispatch(getEvents)

export default store
