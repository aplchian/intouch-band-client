import React from "react"
import Button from "material-ui/Button"
import AddIcon from "material-ui-icons/Add"



export default ({ onClick }) => {
  return (
    <Button
      fab
      color="primary"
      style={{ position: "fixed" }}
      className="bottom-1 right-1"
      onClick={onClick}
    >
      <AddIcon />
    </Button>
  )
}
