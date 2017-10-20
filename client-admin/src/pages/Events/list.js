import Slide from "material-ui/transitions/Slide"
import React, { Component } from "react"
import { withStyles, createStyleSheet } from "material-ui/styles"
import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "material-ui/List"
import Divider from "material-ui/Divider"
import AddEvent from "./add"
import { connect } from "react-redux"
import { map, addIndex, curry, length, inc } from "ramda"
import {
  receiveEvent,
  toggleEventRenderShowPage,
  setEventFilterDates,
  deleteEvent
} from "../../actions/events"
import EventsShow from "./show"
import FAB from "../../components/FAB"
import IconButton from "material-ui/IconButton"
import DeleteIcon from "material-ui-icons/Delete"
import { DateRangePicker } from "react-dates"
import Snackbar from "material-ui/Snackbar"
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
      showOpen: false,
      showSnackBar: false
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
    this.props.dispatch(toggleEventRenderShowPage(false))
  }

  setDates = dates => {
    this.props.dispatch(setEventFilterDates(dates))
  }

  handleEventClick = event => {
    return e => {
      this.setState({ showOpen: true }, () => {
        this.props.dispatch(receiveEvent(event))
        this.props.dispatch(toggleEventRenderShowPage(true))
      })
    }
  }

  handleDeleteEvent = ({ _id, name }) => {
    return e => {
      // eslint-disable-next-line
      if (confirm(`Are you sure you want to delete ${name}?`)) {
        this.props.dispatch(deleteEvent(_id)).then(res => {
          this.setState({
            showSnackBar: true,
            snackBarText: `Event Deleted Succesfully!`
          })
        })
      }
    }
  }

  render() {
    const { events: { filtered: filteredEvents } } = this.props

    const renderEvents = curry((len, event, i) => {
      const { name, city, state, _id } = event
      return (
        <div key={i}>
          <ListItem onClick={this.handleEventClick(event)} button>
            <ListItemText primary={name} secondary={`${city}, ${state}`} />
            <ListItemSecondaryAction>
              <IconButton
                aria-label="delete"
                onClick={this.handleDeleteEvent({ _id, name })}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          {len === inc(i) ? null : <Divider />}
        </div>
      )
    })

    return (
      <div>
        <DateRangePicker
          startDate={this.props.events.startDate} // momentPropTypes.momentObj or null,
          endDate={this.props.events.endDate} // momentPropTypes.momentObj or null,
          onDatesChange={this.setDates} // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          isOutsideRange={(x) => false}
        />
        <List>
          {mapIndex(renderEvents(length(filteredEvents)), filteredEvents)}
        </List>
        <FAB onClick={this.handleOpen} />
        {this.props.events.renderEventShowPage
          ? <EventsShow
              open={this.props.events.renderEventShowPage}
              handleClose={this.handleShowClose}
              event={this.props.events.event}
            />
          : null}
        <AddEvent
          open={this.state.open}
          handleClose={this.handleRequestClose}
          dispatch={this.props.dispatch}
        />
        <Snackbar
          open={this.state.showSnackBar}
          onRequestClose={() => this.setState({ showSnackBar: false })}
          transition={<Slide direction="up" />}
          SnackbarContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">
              {this.state.snackBarText}
            </span>
          }
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
