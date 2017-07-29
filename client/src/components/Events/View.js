import { Card, ListItem, List } from "react-onsenui"
import React from "react"
import { curry, length, map } from "ramda"
import moment from "moment-timezone"
import shortId from "shortid"

export default curry((event, x) => {
  const renderSchedule = event => {
    const { name = "", time: { string } } = event
    return (
      <ListItem key={shortId()}>
        <span className="f6">
          {name}
        </span>
        <span className="f6 gray right">
          {string}
        </span>
      </ListItem>
    )
  }

  const renderContacts = contact => {
    return (
      <div key={shortId()} className="mb3">
        <div className="f5 db mb1 bold">
          {contact.type}
        </div>
        <div className="f6 db mb1">
          {contact.name}
        </div>
        <a href={`tel:${contact.phone}`}>
          <div className="f6 db mb1">
            {contact.phone}
          </div>
        </a>
        <a href={`mailto:${contact.email}`}>
          <div className="f6 db mb1">
            {contact.email}
          </div>
        </a>
      </div>
    )
  }

  const renderFiles = file => {
    return (
      <ListItem key={shortId()}>
        <a href={file.url} target="_blank">
          <span className="f6">
            {file.name}
          </span>
        </a>
      </ListItem>
    )
  }

  return (
    <div style={{ whiteSpace: "pre-wrap" }}>
      <Card>
        <h1 className="tc">
          {event.name}
        </h1>
        <h3 className="tc">
          {moment(event.data).format("L")}
        </h3>
      </Card>
      {length(event.schedule) > 0
        ? <Card>
            <h4>Schedule</h4>
            <List dataSource={event.schedule} renderRow={renderSchedule} />
          </Card>
        : null}
      {event.addressone || event.city
        ? <Card>
            <h4>Address</h4>
            <span className="mb2 db f4">
              {event.venue}
            </span>
            <span className="mb2 db">
              {event.addressone}
            </span>
            <span className="mb2 db">
              {event.addresstwo}
            </span>
            <span className="mb2 db">
              {event.city}, {event.state}
            </span>
            <span className="mb2 db">
              {event.zip}
            </span>
          </Card>
        : null}
      {event.deal
        ? <Card>
            <h4>Deal</h4>
            <p>
              {event.deal}
            </p>
          </Card>
        : null}
      {event.parking
        ? <Card>
            <h4>Parking</h4>
            <p>
              {event.parking}
            </p>
          </Card>
        : null}
      {event.notes
        ? <Card>
            <h4>Notes</h4>
            <p>
              {event.notes}
            </p>
          </Card>
        : null}
      {length(event.contacts) > 0
        ? <Card>
            <h4>Contacts</h4>
            {map(renderContacts, event.contacts)}
          </Card>
        : null}
      {length(event.files) > 0
        ? <Card>
            <h4>Files</h4>
            <List dataSource={event.files} renderRow={renderFiles} />
          </Card>
        : null}
    </div>
  )
})
