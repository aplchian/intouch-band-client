import { SET_USER } from "../constants"
import { merge } from 'ramda'

export default (
  state = {
    user: { exists: false },
    users: []
  },
  action
) => {
  switch (action.type) {
    case SET_USER:
      return merge(state, action.payload)
    default:
      return state
  }
}
