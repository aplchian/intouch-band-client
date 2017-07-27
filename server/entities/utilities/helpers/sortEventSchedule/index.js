const { sort, assoc } = require("ramda")
/**
 * this function takes in an event and sorts the events on the 
 * schedule node in ascending order and returns the updated schedule
 * 
 * @param {Object} event 
 * @returns {Object} - updated event
 */
function sortEventSchedule(event) {
  const { schedule } = event
  const sortSchedule = (a, b) => {
    return a.time.unix - b.time.unix
  }
  const sortedSchedule = sort(sortSchedule, schedule)
  return assoc("schedule", sortedSchedule, event)
}

module.exports = sortEventSchedule
