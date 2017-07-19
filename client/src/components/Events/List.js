import React from 'react'
import {
  List,
  ListItem,
  ListHeader,
} from 'react-onsenui'

import { DateRangePicker } from 'react-dates'
import ViewPage from './View'
import shortId from 'shortid'

export default props => {

  const renderRow = item => {
    const obj = {
      name: item.name,
      id: item._id,
      Component: ViewPage(item)
    }

    return (
      <ListItem key={shortId()} onClick={props.pushPage.bind(this, props.navigator, obj)}>
        <div className="w-100 db relative">
          <span className="left db">
            {item.name}
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

  return (
    <div style={{ backgroundColor: 'white' }}>
      <DateRangePicker
        startDate={props.state.startDate} // momentPropTypes.momentObj or null,
        endDate={props.state.endDate} // momentPropTypes.momentObj or null,
        onDatesChange={props.handleDateChange} // PropTypes.func.isRequired,
        focusedInput={props.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={props.handleFocusChange} // PropTypes.func.isRequired,
        orientation="vertical"
      />
      <List
        dataSource={props.state.events}
        renderRow={renderRow}
        renderHeader={renderEventsHeader}
      />
    </div>
  )
}
