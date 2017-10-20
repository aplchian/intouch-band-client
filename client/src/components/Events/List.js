import React from 'react'
import { List, ListItem, ListHeader } from 'react-onsenui'
import { DateRangePicker } from 'react-dates'
import ViewPage from './View'
import shortId from 'shortid'
import { connect } from 'react-redux'
import { curry } from 'ramda'
import { setEventFilterDates } from '../../actions/events'
import moment from 'moment'

const EventList = props => {
  const handleDateChange = curry((allEvents, { startDate, endDate }) => {
    props.dispatch(setEventFilterDates({ startDate, endDate }))
  })

  const handleFocusChange = focusedInput => {
    props.dispatch(setEventFilterDates({ focusedInput }))
  }

  const renderRow = item => {
    const obj = {
      name: item.name,
      id: item._id,
      Component: ViewPage(item)
    }

    return (
      <ListItem
        key={shortId()}
        onClick={props.pushPage.bind(this, props.navigator, obj)}
      >
        <div className="w-100 db relative">
          <span className="left db">
            {item.name}
          </span>
          <span className="left f6 gray db">
            {moment(item.date).format('dddd MMM Do')}
          </span>
          <span className="left db f6 gray">
            {item.city ? `${item.city}, ${item.state}` : null}
          </span>
        </div>
      </ListItem>
    )
  }

  const renderEventsHeader = () => {
    return (
      <ListHeader>
        <span className="fl ml2">Events</span>
      </ListHeader>
    )
  }

  const {
    events: {
      startDate = moment(),
      endDate = moment().add(3, 'months'),
      all,
      focusedInput,
      filtered
    }
  } = props

  return (
    <div style={{ backgroundColor: 'white' }}>
      <DateRangePicker
        startDate={startDate} // momentPropTypes.momentObj or null,
        endDate={endDate} // momentPropTypes.momentObj or null,
        onDatesChange={handleDateChange(all)} // PropTypes.func.isRequired,
        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={handleFocusChange}
        orientation="vertical"
        isOutsideRange={(x) => false}
      />
      <List
        dataSource={filtered}
        renderRow={renderRow}
        renderHeader={renderEventsHeader}
      />
    </div>
  )
}

const connector = connect(mapStateToProps)

export default connector(EventList)

function mapStateToProps(state) {
  return state
}
