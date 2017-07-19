import {
  SET_ALL_EVENTS,
  SET_FILTERED_EVENTS,
  SET_FILTER_DATES_EVENTS
} from '../constants'

export function setAllEvents(all) {
  return {
    type: SET_ALL_EVENTS,
    payload: { all, filtered: all }
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
