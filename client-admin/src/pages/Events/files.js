import React, { Component } from "react"
import { withStyles, createStyleSheet } from "material-ui/styles"
import "rc-time-picker/assets/index.css"
import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "material-ui/List"

import {
  length,
  assoc,
  map,
  lensProp,
  over,
  reject,
  append,
  replace
} from "ramda"
import shortId from "shortid"
import IconButton from "material-ui/IconButton"
import DeleteIcon from "material-ui-icons/Delete"
import Dropzone from "react-dropzone"

var { config, S3, CognitoIdentityCredentials } = require("aws-sdk")

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

  handleOnAddFile = imgData => {
    const { event: { files = [] }, event } = this.props
    const newFile = {
      name: imgData.Key,
      bucket: imgData.Bucket,
      url: imgData.Location,
      id: shortId()
    }
    const updatedFiles = append(newFile, files)
    const updatedEvent = assoc("files", updatedFiles, event)
    this.props.updateEvent(updatedEvent)
  }

  handleRemoveFile = id => {
    const { event } = this.props
    return e => {
      // eslint-disable-next-line
      if (confirm("Are you sure you want to remove this file?")) {
        const removeEvent = file => {
          return reject(event => event.id === id, file)
        }
        const filesLens = lensProp("files")
        const updatedEvent = over(filesLens, removeEvent, event)
        this.props.updateEvent(updatedEvent)
      }
    }
  }

  onDrop = ([file]) => {
    config.update({
      region: "us-east-1",
      credentials: new CognitoIdentityCredentials({
        IdentityPoolId: "us-east-1:b905a98c-63ac-498a-9572-65e6a8c89a39"
      })
    })

    var s3 = new S3({
      apiVersion: "2006-03-01",
      params: { Bucket: "intouch-aplchian" }
    })
    s3.upload(
      {
        Key: replace(/ /, "", file.name),
        Body: file,
        ACL: "public-read"
      },
      (err, data) => {
        if (err) {
          console.log("err", err)
          return alert("There was an error uploading your file! ", err.message)
        }
        this.handleOnAddFile(data)
        // alert("Successfully uploaded file!")
      }
    )
  }

  render() {
    const renderSchedule = item => {
      // const { event: { timeZone = "US/Eastern" } } = this.props
      return (
        <ListItem button>
          <a href={item.url} target="_blank">
            <ListItemText primary={item.name} />
          </a>
          <ListItemSecondaryAction>
            <IconButton
              aria-label="delete"
              onClick={this.handleRemoveFile(item.id)}
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
          {length(this.props.event.files) > 0
            ? map(renderSchedule, this.props.event.files)
            : <h1>No files yet!</h1>}
        </List>
        <Dropzone onDrop={this.onDrop}>
          <div>
            Try dropping some files here, or click to select files to upload.
          </div>
        </Dropzone>
      </div>
    )
  }
}

export default withStyles(styleSheet)(Schedule)
