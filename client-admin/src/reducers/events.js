import {
  SET_FILTERED_EVENTS,
  SET_ALL_EVENTS,
  SET_FILTER_DATES_EVENTS,
  START_FETCHING_EVENTS,
  RECEIVE_EVENT,
  TOGGLE_EVENT_SHOW
} from '../constants'
import { merge } from 'ramda'
import moment from 'moment'
import filterEventsByDate from './helpers/filterEventsByDate'

const hasBothDates = action =>
  action.payload.startDate && action.payload.endDate

export default (
  state = {
    all: [],
    filtered: [],
    startDate: moment(),
    endDate: moment().add(3, 'months'),
    event: null,
    renderEventShowPage: false
  },
  action
) => {
  switch (action.type) {
    case SET_ALL_EVENTS:
      const updatedPayloadSET = filterEventsByDate(
        state.startDate,
        state.endDate,
        action.payload.all,
        action.payload
      )
      return merge(state, updatedPayloadSET)
    case SET_FILTERED_EVENTS:
      return merge(state, action.payload)
    case SET_FILTER_DATES_EVENTS:
      const updatedPayload = hasBothDates(action)
        ? filterEventsByDate(
            state.startDate,
            state.endDate,
            state.all,
            action.payload
          )
        : action.payload
      return merge(state, updatedPayload)
    case START_FETCHING_EVENTS:
      return merge(state, action.payload)
    case RECEIVE_EVENT:
      return merge(state, action.payload)
    case TOGGLE_EVENT_SHOW:
      return merge(state, action.payload)
    default:
      return state
  }
}
