import React, { Component } from "react"
import "./App.css"
import NavBar from "./components/NavBar"
import EventsList from './pages/Events/list'
import "pdfjs-dist"


class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <EventsList />
      </div>
    )
  }
}

export default App
