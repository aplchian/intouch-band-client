import React from "react"
import { withStyles, createStyleSheet } from "material-ui/styles"
import AddIcon from "material-ui-icons/Add"
import Button from "material-ui/Button"
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog"
import List, { ListItem, ListItemText } from "material-ui/List"
import Divider from "material-ui/Divider"
import AppBar from "material-ui/AppBar"
import Toolbar from "material-ui/Toolbar"
import IconButton from "material-ui/IconButton"
import Typography from "material-ui/Typography"
import CloseIcon from "material-ui-icons/Close"
import Slide from "material-ui/transitions/Slide"
import TextField from "material-ui/TextField"
import Grid from "material-ui/Grid"
import { blueGrey } from "material-ui/colors"
import { Field, reduxForm, Form } from "redux-form"
import { createEvent } from "../../actions/events"

const styleSheet = createStyleSheet("TextFields", theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
}))

const Input = props => {
  return (
    <div className="mb2">
      <TextField
        id={props.name}
        className={props.classes.textField}
        InputProps={{ placeholder: props.placeholder }}
        value={props.input.value}
        {...props.input}
      />
    </div>
  )
}

const AddEvent = props => {
  const { classes, handleClose, open } = props
  const onAddEvent = formData => {
    props.dispatch(createEvent(formData)).then(res => {
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
      <form onSubmit={props.handleSubmit(onAddEvent)}>
        <DialogContent>
          <Field
            component={Input}
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
          <Button onClick={props.handleSubmit(onAddEvent)} color="primary">
            Ok
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

const addForm = Component =>
  reduxForm({
    form: "addEvent"
  })(Component)

export default addForm(withStyles(styleSheet)(AddEvent))
