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

const styleSheet = createStyleSheet("FullScreenDialog", {
  appBar: {
    position: "relative"
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
      open: false
    }
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  render() {
    const { classes: { card }, classes } = this.props

    const cardClasss = `mt2 mb2 w-90 center ${card}`

    return (
      <div>
        <List>
          <ListItem button>
            <ListItemText primary="Music Farm" secondary="Charleston, SC" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="The Tabernacle" secondary="Atlanta, GA" />
          </ListItem>
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
        <Dialog
          fullScreen
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          transition={<Slide direction="up" />}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="contrast"
                onClick={this.handleRequestClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography type="title" color="inherit" className={classes.flex}>
                Add Event
              </Typography>
              <Button color="contrast" onClick={this.handleRequestClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styleSheet)(EventsList)
