import { Card, ListItem, List } from 'react-onsenui'
import React from 'react'
import { curry } from 'ramda'
import moment from 'moment'

export default curry((event, x) => {
  const renderSchedule = event => {
    return (
      <ListItem>
        <span className="f6">
          {event.event}
        </span>
        <span className="f6 gray right">
          {moment.unix(event.starttime).format('h:mm a')}
        </span>
      </ListItem>
    )
  }

  const renderContact = contact => {
    return (
      <ListItem>
        <div className="f6 db">
          {contact.name}
        </div>
        <br />
        <div className="f6 gray db">
          {contact.type}
        </div>
        <div className="f6 gray db">
          {contact.phone}
        </div>
        <div className="f6 gray db">
          {contact.email}
        </div>
      </ListItem>
    )
  }

  return (
    <div>
      <Card>
        <h1 className="tc">
          {event.name}
        </h1>
        <h3 className="tc">
          {moment(event.data).format('L')}
        </h3>
      </Card>
      <Card>
        <h4>Schedule</h4>
        <List dataSource={event.schedule} renderRow={renderSchedule} />
      </Card>
      <Card>
        <h4>Deal</h4>
        <p>
          {event.deal}
        </p>
      </Card>
      <Card>
        <h4>Parking</h4>
        <p>
          {event.parking}
        </p>
      </Card>
      <Card>
        <h4>Notes</h4>
        <p>
          {event.notes}
        </p>
      </Card>
      <Card>
        <h4>Contact</h4>
        <List dataSource={event.contact} renderRow={renderContact} />
      </Card>
    </div>
  )
})
