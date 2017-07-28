import React, { Component } from "react"
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
import Card, { CardContent } from "material-ui/Card"
import Typography from "material-ui/Typography"
import {
  merge,
  length,
  assoc,
  map,
  lensProp,
  over,
  reject,
  prop,
  append
} from "ramda"
import shortId from "shortid"
import IconButton from "material-ui/IconButton"
import DeleteIcon from "material-ui-icons/Delete"

const styleSheet = createStyleSheet("TextFields", theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 3,
    fontSize: 14,
    color: theme.palette.text.secondary
  },
  cardContainer: {
    marginBottom: 4
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary
  }
}))

class Schedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  resetForm = () => {
    this.props.reset()
    this.setState({
      open: false
    })
  }

  handleOnAdd = formData => {
    const { event } = this.props
    const eventData = { id: shortId() }
    const updatedContact = merge(formData, eventData)
    const updatedContacts = append(updatedContact, prop("contacts", event))
    const updatedEvent = assoc("contacts", updatedContacts, event)
    this.props.updateEvent(updatedEvent)
    this.resetForm()
  }

  handleRemoveContact = id => {
    const { event } = this.props
    return e => {
      // eslint-disable-next-line
      if (confirm("Are you sure you want to remove this contact?")) {
        const removeEvent = contact => {
          return reject(event => event.id === id, contact)
        }
        const contactLens = lensProp("contacts")
        const updatedEvent = over(contactLens, removeEvent, event)
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

    const renderSchedule = item => {
      return (
        <Card className={classes.card}>
          <CardContent>
            <Typography type="headline" component="h4">
              {item.type}
            </Typography>
            <div className={classes.cardContainer}>
              <Typography type="body1" className={classes.title}>
                name
              </Typography>
              <Typography component="p">
                {item.name || "N/A"}
              </Typography>
            </div>
            <div className={classes.cardContainer}>
              <Typography type="body1" className={classes.title}>
                phone
              </Typography>
              <Typography component="p">
                {item.phone || "N/A"}
              </Typography>
            </div>
            <div className={classes.cardContainer}>
              <Typography type="body1" className={classes.title}>
                email
              </Typography>
              <Typography component="p">
                {item.email || "N/A"}
              </Typography>
            </div>
          </CardContent>
          <div className="fr">
            <IconButton
              className="fr"
              aria-label="delete"
              onClick={this.handleRemoveContact(item.id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </Card>
      )
    }

    return (
      <div>
        {length(this.props.event.contacts) > 0
          ? map(renderSchedule, this.props.event.contacts)
          : <h1>No contacts! Click the + to add one.</h1>}

        <Dialog
          open={this.state.open}
          onRequestClose={() => this.setState({ open: false })}
          transition={<Slide direction="up" />}
          maxWidth="md"
        >
          <DialogTitle>Add Contact</DialogTitle>
          <DialogContent>
            <form className="mt2" style={{ width: 300 }}>
              <Field
                component={MaterialInput}
                type="text"
                name="type"
                placeholder="Type ex. Production"
                classes={classes}
              />
              <Field
                component={MaterialInput}
                type="text"
                name="name"
                placeholder="Name"
                classes={classes}
              />
              <Field
                component={MaterialInput}
                type="text"
                name="email"
                placeholder="Email"
                classes={classes}
              />
              <Field
                component={MaterialInput}
                type="text"
                name="phone"
                placeholder="phone"
                classes={classes}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.resetForm} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.props.handleSubmit(this.handleOnAdd)}
              color="primary"
            >
              Save
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
    form: "addContactItem"
  })(Schedule)

export default addForm(withStyles(styleSheet)(Schedule))
