import { connect } from "react-redux"
import { Card, ListItem, List } from "react-onsenui"
import Loading from "react-loading-animation"
import React from "react"
import { prop, pluck, flatten, sort, length } from "ramda"
import filterEventsByDate from "../../reducers/helpers/filterEventsByDate"
import moment from "moment-timezone"

const Daysheet = props => {
  const today = moment()

  const todaysEvents = !props.events.isFetching
    ? prop("filtered", filterEventsByDate(today, today, props.events.all, {}))
    : []

  const schedule = sort(
    (a, b) => a.time.unix - b.time.unix,
    flatten(pluck("schedule", todaysEvents))
  )

  const renderSchedule = event => {
    return (
      <ListItem>
        <span className="f6">
          {event.name}
        </span>
        <span className="f6 gray right">
          {event.time.string}
        </span>
      </ListItem>
    )
  }

  return (
    <div>
      <h5 className="tc">
        Today is {moment().format('dddd, MMM Do')}!🤘🏻
      </h5>
      {props.events.isFetching
        ? <div className="center">
            <Loading />
          </div>
        : <div>
            {length(schedule) > 0
              ? <Card>
                  <h4>Today's Schedule</h4>
                  <List dataSource={schedule} renderRow={renderSchedule} />
                </Card>
              : <Card>
                  <h1>
                    There is nothing planned for the day!{" "}
                    <span role="img" aria-label="sleepy">
                      😴
                    </span>
                  </h1>
                </Card>}
          </div>}
    </div>
  )
}

const connector = connect(mapStateToProps)

export default connector(Daysheet)

function mapStateToProps(state) {
  return state
}
