import React, { Component } from "react"
import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "material-ui/List"
import FAB from "../../components/FAB"
import Button from "material-ui/Button"
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog"
import { withStyles, createStyleSheet } from "material-ui/styles"
import { Field, reduxForm } from "redux-form"
import Slide from "material-ui/transitions/Slide"
import MaterialInput from "../../components/MaterialInput"
import "rc-time-picker/assets/index.css"
// import TimePicker from "rc-time-picker"
import moment from "moment-timezone"
import {
  inc,
  times,
  merge,
  toString,
  length,
  curry,
  assoc,
  map,
  lensProp,
  over,
  reject
} from "ramda"
import shortId from "shortid"
import IconButton from "material-ui/IconButton"
import DeleteIcon from "material-ui-icons/Delete"

const styleSheet = createStyleSheet("TextFields", theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
}))

class Schedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      hour: "12",
      minute: "00",
      timeOfDay: "pm"
    }
  }

  resetTime = () => {
    this.setState({
      open: false,
      hour: "12",
      minute: "00",
      timeOfDay: "pm"
    })
  }

  handleOnAdd = formData => {
    const { hour, minute, timeOfDay } = this.state
    const timeString = `${hour}:${minute} ${timeOfDay}`
    const time = {
      string: timeString,
      unix: moment(timeString, "h:mm a").unix()
    }
    const eventData = { time, id: shortId() }
    const updatedEvent = merge(formData, eventData)
    this.resetTime()
    this.props.reset()
    this.props.onAddEvent(updatedEvent)
  }

  handleRemoveEvent = id => {
    const { event } = this.props
    return e => {
      // eslint-disable-next-line
      if (confirm("Are you sure you want to remove this event?")) {
        const removeEvent = schedule => {
          return reject(event => event.id === id, schedule)
        }
        const scheduleLens = lensProp("schedule")
        const updatedEvent = over(scheduleLens, removeEvent, event)
        this.props.updateEvent(updatedEvent)
      }
    }
  }

  handleTimeChange = path => {
    return e => {
      const currentState = assoc(path, e.target.value, this.state)
      this.setState(currentState)
    }
  }

  render() {
    const { classes } = this.props

    const renderTime = curry((type, i) => {
      const val = type === "hour" ? toString(inc(i)) : toString(i)
      const stringifiedVal =
        length(val) === 1 && type === "minute" ? `0${val}` : val
      return (
        <option value={stringifiedVal}>
          {stringifiedVal}
        </option>
      )
    })

    const renderSchedule = item => {
      // const { event: { timeZone = "US/Eastern" } } = this.props
      return (
        <ListItem button>
          <ListItemText primary={item.time.string} secondary={item.name} />
          <ListItemSecondaryAction>
            <IconButton
              aria-label="delete"
              onClick={this.handleRemoveEvent(item.id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )
    }

    return (
      <div>
        <List>
          {length(this.props.event.schedule) > 0
            ? map(renderSchedule, this.props.event.schedule)
            : <h1>No schedule items! Click the + to add a schedule item.</h1>}
        </List>
        <Dialog
          open={this.state.open}
          onRequestClose={() => this.setState({ open: false })}
          transition={<Slide direction="up" />}
        >
          <DialogTitle>Add Event</DialogTitle>
          <DialogContent>
            <form className="mt2">
              <Field
                component={MaterialInput}
                type="text"
                name="name"
                placeholder="Event"
                classes={classes}
              />
              <div>
                <select
                  value={this.state.hour}
                  onChange={this.handleTimeChange("hour")}
                >
                  {times(renderTime("hour"), 12)}
                </select>
                <span> : </span>
                <select
                  value={this.state.minute}
                  onChange={this.handleTimeChange("minute")}
                >
                  {times(renderTime("minute"), 60)}
                </select>
                <select
                  value={this.state.timeOfDay}
                  onChange={this.handleTimeChange("timeOfDay")}
                  className="ml1"
                >
                  <option value="pm">pm</option>
                  <option value="am">am</option>
                </select>
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.resetTime} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.props.handleSubmit(this.handleOnAdd)}
              color="primary"
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        <FAB onClick={() => this.setState({ open: true })} />
      </div>
    )
  }
}

const addForm = Schedule =>
  reduxForm({
    form: "addScheduleItem"
  })(Schedule)

export default addForm(withStyles(styleSheet)(Schedule))
