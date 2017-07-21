import React, { Component } from "react"
import Paper from "material-ui/Paper"
import { withStyles, createStyleSheet } from "material-ui/styles"
import AddIcon from "material-ui-icons/Add"
import Button from "material-ui/Button"
import Dialog from "material-ui/Dialog"
import List, { ListItem, ListItemText } from "material-ui/List"
import Divider from "material-ui/Divider"
import AppBar from "material-ui/AppBar"
import Toolbar from "material-ui/Toolbar"
import IconButton from "material-ui/IconButton"
import Typography from "material-ui/Typography"
import CloseIcon from "material-ui-icons/Close"
import Slide from "material-ui/transitions/Slide"
import AddEvent from "./add"
import { connect } from "react-redux"
import { map, addIndex, curry, length, inc } from "ramda"
import EventsShow from "./show"
const mapIndex = addIndex(map)

const styleSheet = createStyleSheet("FullScreenDialog", {
  appBar: {
    position: "relative",
    boxShadow: "none"
  },
  flex: {
    flex: 1
  },
  card: {
    height: 80
  }
})

class EventsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      showOpen: false
    }
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleShowOpen = () => {
    this.setState({ showOpen: true })
  }

  handleShowClose = () => {
    this.setState({ showOpen: false })
  }

  handleEventClick = event => {
    return e => {
      this.setState({ event, showOpen: true })
    }
  }

  render() {
    const {
      classes: { card },
      classes,
      events: { filtered: filteredEvents }
    } = this.props

    const cardClasss = `mt2 mb2 w-90 center ${card}`

    const renderEvents = curry((len, event, i) => {
      const { venue, city, state } = event
      return (
        <div>
          <ListItem onClick={this.handleEventClick(event)} button>
            <ListItemText primary={venue} secondary={`${city}, ${state}`} />
          </ListItem>
          {len === inc(i) ? null : <Divider />}
        </div>
      )
    })

    return (
      <div>
        <List>
          {mapIndex(renderEvents(length(filteredEvents)), filteredEvents)}
        </List>
        <Button
          fab
          color="primary"
          style={{ position: "fixed" }}
          className="bottom-1 right-1"
          onClick={this.handleOpen}
        >
          <AddIcon />
        </Button>
        {this.state.event
          ? <EventsShow
              open={this.state.showOpen}
              handleClose={this.handleShowClose}
              event={this.state.event}
            />
          : null}
        <AddEvent
          open={this.state.open}
          handleClose={this.handleRequestClose}
        />
      </div>
    )
  }
}

const connector = connect(mapStateToProps)

export default connector(withStyles(styleSheet)(EventsList))

function mapStateToProps(state) {
  return state
}
