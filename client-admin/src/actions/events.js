import {
  SET_ALL_EVENTS,
  SET_FILTERED_EVENTS,
  SET_FILTER_DATES_EVENTS,
  START_FETCHING_EVENTS
} from '../constants'

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
