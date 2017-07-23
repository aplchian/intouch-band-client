import { reduxForm, Field } from "redux-form"
import React, { Component } from "react"
import Paper from "material-ui/Paper"
import { connect } from "react-redux"
import { withStyles, createStyleSheet } from "material-ui/styles"
import AddIcon from "material-ui-icons/Add"
import Button from "material-ui/Button"
import Dialog from "material-ui/Dialog"
import List, { ListItem, ListItemText } from "material-ui/List"
import Divider from "material-ui/Divider"
import AppBar from "material-ui/AppBar"
import Toolbar from "material-ui/Toolbar"
import Fade from "material-ui/transitions/Fade"
import IconButton from "material-ui/IconButton"
import Typography from "material-ui/Typography"
import CloseIcon from "material-ui-icons/Close"
import Slide from "material-ui/transitions/Slide"
import TextField from "material-ui/TextField"
import Tabs, { Tab } from "material-ui/Tabs"
import Input from "material-ui/Input"
import InputLabel from "material-ui/Input/InputLabel"
import FormControl from "material-ui/Form/FormControl"
import FormHelperText from "material-ui/Form/FormHelperText"
import Grid from "material-ui/Grid"
import Menu, { MenuItem } from "material-ui/Menu"
import { FormControlLabel } from "material-ui/Form"
import Switch from "material-ui/Switch"
import SaveIcon from "material-ui-icons/Save"
import { merge } from "ramda"
import { updateEvent } from "../../actions/events"
import Snackbar from "material-ui/Snackbar"

const styleSheet = createStyleSheet("CenteredTabs", theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3
  },
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  paper: {
    // flex: 1,
    // padding: 20
    padding: 20
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  container: {
    flexGrow: 1,
    margin: "30px 10px 0 10px"
  },
  formControl: {
    margin: theme.spacing.unit
  }
}))

const InputMat = props => {
  const multiline = props.type === "textarea"
  return (
    <div className="mb2">
      <FormControl fullWidth className={props.classes.formControl}>
        <div className="w-90">
          <InputLabel htmlFor="name">
            {props.placeholder}
          </InputLabel>
          <Input
            fullWidth
            multiline={multiline}
            id="name"
            value={props.input.value}
            {...props.input}
            rows={5}
          />
        </div>
      </FormControl>
    </div>
  )
}

class EventShow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      formData: { confirmed: false },
      showSnackBar: false
    }
  }

  componentDidMount() {
    const { event } = this.props
    const formData = { confirmed: event.confirmed }
    this.setState({
      formData
    })
  }

  handleChange = (event, index) => {
    this.setState({ index })
  }
  handleConfirmedChange = (event, confirmed) => {
    const dirty = confirmed !== !!this.props.event.confirmed
    this.setState({ formData: { confirmed }, dirty })
  }

  handleEditSubmit = formData => {
    const { formData: stateData } = this.state
    const updatedEvent = merge(formData, stateData)
    this.props
      .dispatch(updateEvent(updatedEvent))
      .then(res => {
        this.setState({
          showSnackBar: true,
          dirty: false,
          snackBarText: "Event Saved!"
        })
      })
      .catch(err => {
        console.log("err", err)
        this.setState({
          showSnackBar: true,
          snackBarText: `Event Save failed!`
        })
      })
  }

  handleCloseSnackBar = () => {
    this.setState({
      showSnackBar: false
    })
  }

  render() {
    const { classes, event } = this.props

    return (
      <Dialog
        fullScreen
        open={this.props.open}
        onRequestClose={this.props.handleClose}
        transition={<Slide direction="left" />}
      >
        <form>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                color="contrast"
                onClick={this.props.handleClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography type="title" color="inherit" className={classes.flex}>
                {event.name}
              </Typography>
            </Toolbar>
            <Tabs
              index={this.state.index}
              onChange={this.handleChange}
              scrollable
              scrollButtons="auto"
            >
              <Tab label="Info" />
              <Tab label="Schedule" />
              <Tab label="Contacts" />
              <Tab label="Files" />
            </Tabs>
          </AppBar>

          <div className={classes.container}>
            {this.state.index === 0 &&
              <div>
                <Button
                  color="accent"
                  className="fr"
                  onClick={this.props.handleSubmit(this.handleEditSubmit)}
                >
                  <SaveIcon />
                  Save
                </Button>
                <Grid container gutter={24}>
                  <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                      <Field
                        component={InputMat}
                        type="text"
                        name="name"
                        placeholder="Event Name"
                        classes={classes}
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={this.state.formData.confirmed}
                            onChange={this.handleConfirmedChange}
                          />
                        }
                        label={
                          this.state.formData.confirmed
                            ? "Confirmed"
                            : "Not Confirmed"
                        }
                      />
                      <Field
                        component={InputMat}
                        type="text"
                        name="capacity"
                        placeholder="Capacity"
                        classes={classes}
                      />
                      <Field
                        component={InputMat}
                        type="textarea"
                        name="deal"
                        placeholder="Deal"
                        classes={classes}
                      />
                      <Field
                        component={InputMat}
                        type="textarea"
                        name="notes"
                        placeholder="Notes"
                        classes={classes}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                      <Field
                        component={InputMat}
                        type="text"
                        name="venue"
                        placeholder="Venue Name"
                        classes={classes}
                      />
                      <Field
                        component={InputMat}
                        type="text"
                        name="addressone"
                        placeholder="Address One"
                        classes={classes}
                      />
                      <Field
                        component={InputMat}
                        type="text"
                        name="addresstwo"
                        placeholder="Address Two"
                        classes={classes}
                      />
                      <Field
                        component={InputMat}
                        type="text"
                        name="city"
                        placeholder="City"
                        classes={classes}
                      />
                      <Field
                        component={InputMat}
                        type="text"
                        name="state"
                        placeholder="State"
                        classes={classes}
                      />
                      <Field
                        component={InputMat}
                        type="text"
                        name="zip"
                        placeholder="Zip"
                        classes={classes}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </div>}
            {this.state.index === 1 && <h1>Schedule</h1>}
            {this.state.index === 2 && <h1>Contacts</h1>}
            {this.state.index === 3 && <h1>File</h1>}
          </div>
        </form>
        <Snackbar
          open={this.state.showSnackBar}
          onRequestClose={this.handleCloseSnackBar}
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
      </Dialog>
    )
  }
}

EventShow = reduxForm({ form: "editEvent" })(EventShow)
EventShow = connect(state => ({ initialValues: state.events.event }))(EventShow)

export default withStyles(styleSheet)(EventShow)
