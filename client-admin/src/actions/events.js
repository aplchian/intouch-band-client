import {
  SET_ALL_EVENTS,
  SET_FILTERED_EVENTS,
  SET_FILTER_DATES_EVENTS,
  START_FETCHING_EVENTS,
  RECEIVE_EVENT,
  TOGGLE_EVENT_SHOW
} from "../constants"
import {
  createEvent as createEventService,
  getAllEvents,
  updateEvent as updateEventService,
  deleteEvent as deleteEventService
} from "../services/events"

export function setAllEvents(all) {
  return {
    type: SET_ALL_EVENTS,
    payload: { all, filtered: all, isFetching: false }
  }
}

export function setFilteredEvents(filtered) {
  return {
    type: SET_FILTERED_EVENTS,
    payload: { filtered }
  }
}

export function setEventFilterDates(startDateAndEndDate) {
  return {
    type: SET_FILTER_DATES_EVENTS,
    payload: { ...startDateAndEndDate }
  }
}

export function startFetchingEvents() {
  return {
    type: START_FETCHING_EVENTS,
    payload: { isFetching: true }
  }
}

export function receiveEvent(event) {
  return {
    type: RECEIVE_EVENT,
    payload: { event }
  }
}

export function toggleEventRenderShowPage(state) {
  return {
    type: TOGGLE_EVENT_SHOW,
    payload: { renderEventShowPage: state }
  }
}

export function createEvent(event) {
  return dispatch => {
    return createEventService(event).then(res => {
      dispatch(receiveEvent(res.data))
      dispatch(toggleEventRenderShowPage(true))
      dispatch(startFetchingEvents())
      getAllEvents(
        "band_Stop_Light_Observations"
      ).then(({ data: { docs: allEvents } }) => {
        dispatch(setAllEvents(allEvents))
      })
      return res.data
    })
  }
}

export function updateEvent(event) {
  return dispatch => {
    return updateEventService(event).then(res => {
      dispatch(receiveEvent(res.data))
      dispatch(startFetchingEvents())
      getAllEvents(
        "band_Stop_Light_Observations"
      ).then(({ data: { docs: allEvents } }) => {
        dispatch(setAllEvents(allEvents))
      })
      return res.data
    })
  }
}

export function deleteEvent(eventID) {
  return dispatch => {
    return deleteEventService(eventID).then(res => {
      dispatch(startFetchingEvents())
      getAllEvents(
        "band_Stop_Light_Observations"
      ).then(({ data: { docs: allEvents } }) => {
        dispatch(setAllEvents(allEvents))
      })
      return res.data
    })
  }
}
