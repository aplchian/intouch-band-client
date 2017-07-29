import React, { Component } from "react"
import "./App.css"
import NavBar from "./components/NavBar"
import EventsList from './pages/Events/list'

class App extends Component {
  render() {
    return (
      <div className="App pb5">
        <NavBar />
        <EventsList />
      </div>
    )
  }
}

export default App
