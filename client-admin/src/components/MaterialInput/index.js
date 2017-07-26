import React from 'react'
import Input from "material-ui/Input"
import InputLabel from "material-ui/Input/InputLabel"
import FormControl from "material-ui/Form/FormControl"


export default props => {
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
