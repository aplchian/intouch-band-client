import React, { Component } from "react"
import { withStyles, createStyleSheet } from "material-ui/styles"
import List, { ListItem, ListItemText } from "material-ui/List"
import Divider from "material-ui/Divider"
import AddEvent from "./add"
import { connect } from "react-redux"
import { map, addIndex, curry, length, inc } from "ramda"
import { receiveEvent, toggleEventRenderShowPage, setEventFilterDates } from "../../actions/events"
import EventsShow from "./show"
import FAB from "../../components/FAB"
import FilterIcon from "material-ui-icons/FilterList"
import IconButton from "material-ui/IconButton"
import { DateRangePicker } from "react-dates"
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
    this.props.dispatch(toggleEventRenderShowPage(false))
  }

  setDates = (dates) => {
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

  render() {
    const { events: { filtered: filteredEvents } } = this.props

    const renderEvents = curry((len, event, i) => {
      const { name, city, state } = event
      return (
        <div key={i}>
          <ListItem onClick={this.handleEventClick(event)} button>
            <ListItemText primary={name} secondary={`${city}, ${state}`} />
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
      </div>
    )
  }
}

const connector = connect(mapStateToProps)

export default connector(withStyles(styleSheet)(EventsList))

function mapStateToProps(state) {
  return state
}
