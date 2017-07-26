import React, { Component } from "react"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Button from "material-ui/Button"
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog"
import Slide from "material-ui/transitions/Slide"
import TextField from "material-ui/TextField"
import { Field, reduxForm } from "redux-form"
import { createEvent } from "../../actions/events"
import { assoc } from "ramda"
import moment from "moment"
import MaterialInput from "../../components/MaterialInput"

const styleSheet = createStyleSheet("TextFields", theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  content: {
    width: "80%"
  }
}))

class AddEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: moment().format("YYYY-MM-DD")
    }
  }
  render() {
    const { classes, handleClose, open } = this.props
    const onAddEvent = formData => {
      const date = moment(this.state.date, "YYYY-MM-DD").format()
      const updatedEvent = assoc("date", date, formData)
      this.props.dispatch(createEvent(updatedEvent)).then(res => {
        handleClose()
      })
    }
    return (
      <Dialog
        open={open}
        onRequestClose={handleClose}
        transition={<Slide direction="up" />}
      >
        <DialogTitle>Add Event</DialogTitle>
        <form onSubmit={this.props.handleSubmit(onAddEvent)}>
          <DialogContent>
            <TextField
              id="date"
              label="date"
              type="date"
              value={this.state.date}
              className={classes.textField}
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              onChange={e => this.setState({ date: e.target.value })}
            />
            <Field
              component={MaterialInput}
              type="text"
              name="name"
              placeholder="Venue / Event Name"
              classes={classes}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.props.handleSubmit(onAddEvent)}
              color="primary"
            >
              Ok
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    )
  }
}

const addForm = Component =>
  reduxForm({
    form: "addEvent"
  })(Component)

export default addForm(withStyles(styleSheet)(AddEvent))
