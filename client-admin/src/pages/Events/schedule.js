import React, { Component } from "react"
import List, { ListItem, ListItemText } from "material-ui/List"
import FAB from "../../components/FAB"
import Button from "material-ui/Button"
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog"
import { withStyles, createStyleSheet } from "material-ui/styles"
import TextField from "material-ui/TextField"
import { Field, reduxForm } from "redux-form"
import Slide from "material-ui/transitions/Slide"

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

class Schedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <List>
          <ListItem button>
            <ListItemText primary="9:00" secondary={"Meeting With Robert"} />
          </ListItem>
        </List>
        <Dialog
          open={this.state.open}
          onRequestClose={() => this.setState({ open: false })}
          transition={<Slide direction="up" />}
        >
          <DialogTitle>Add Event</DialogTitle>
          <form onSubmit={() => console.log("submit!")}>
            <DialogContent>
              <Field
                component={Input}
                type="text"
                name="name"
                placeholder="Name"
                classes={classes}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => this.setState({ open: false })}
                color="primary"
              >
                Cancel
              </Button>
              <Button onClick={() => console.log("submit!")} color="primary">
                Ok
              </Button>
            </DialogActions>
          </form>
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
