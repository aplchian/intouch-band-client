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
import Tabs, { Tab } from "material-ui/Tabs"

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
  }
}))

class EventShow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
  }
  handleChange = (event, index) => {
    this.setState({ index })
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
        <AppBar className={classes.appBar}>
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
        </AppBar>
        <Tabs
          index={this.state.index}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          scrollable
          scrollButtons="auto"
        >
          <Tab label="Info" />
          <Tab label="Schedule" />
          <Tab label="Contacts" />
          <Tab label="Files" />
        </Tabs>
      </Dialog>
    )
  }
}

export default withStyles(styleSheet)(EventShow)
