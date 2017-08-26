import React, { Component } from "react"
import "./App.css"
import NavBar from "./components/NavBar"
import EventsList from "./pages/Events/list"
import Auth from "./auth/Auth.js"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Callback from './auth/Callback'
const auth = new Auth()
const { isAuthenticated, logout, login } = auth

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication()
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App pb5">
          {isAuthenticated()
            ? <button onClick={logout}>Logout!</button>
            : <button onClick={login}>Login</button>}
          <NavBar />
          <Route exact path="/" component={EventsList} />
          <Route
            path="/callback"
            render={props => {
              handleAuthentication(props)
              return <Callback {...props} />
            }}
          />
        </div>
      </Router>
    )
  }
}

export default App
