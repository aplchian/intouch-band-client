import { filter, assoc } from 'ramda'
import moment from 'moment'

/**
 * This function filters events by a date range and attaches the filtered array to the 
 * state object taken as a parameter
 * 
 * @param {Object} startDate  - Moment object for start date of filter
 * @param {Object} endDate  - Moment object for end date of filter
 * @param {Array} events - array of events to filter
 * @param {Object} eventsObj - state object to append the new filtered array array to
 */

export default function filterEventsByDate(
  startDate,
  endDate,
  events,
  eventsObj
) {
  const filterEvents = event => {
    const res = moment(event.date).isBetween(
      moment(startDate).startOf('day').format(),
      moment(endDate).endOf('day').format(),
      null,
      '[]'
    )
    return res
  }

  const filteredEvents = filter(filterEvents, events)
  return assoc('filtered', filteredEvents, eventsObj)
}
