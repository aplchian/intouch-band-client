import React, { Component } from 'react'
import 'react-dates/lib/css/_datepicker.css'
import './App.css'
import './styles.css'
import moment from 'moment'
import EventsListPage from './components/Events/List'
import DaySheetView from './components/DaySheet/View'

require('onsenui')

const {
  Page,
  Toolbar,
  Tab,
  Navigator,
  BackButton,
  Tabbar
} = require('react-onsenui')

class App extends Component {
  constructor(props) {
    super(props)
    this.renderTabs = this.renderTabs.bind(this)
    this.renderPage = this.renderPage.bind(this)
    this.renderToolbar = this.renderToolbar.bind(this)
    this.pushPage = this.pushPage.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleFocusChange = this.handleFocusChange.bind(this)
    this.state = {
      events: [{ name: '' }],
      startDate: moment(),
      endDate: moment().add(3, 'months'),
      index: 0
    }
  }

  pushPage(navigator, obj) {
    navigator.pushPage({
      title: `${obj.name}`,
      hasBackButton: true,
      ...obj
    })
  }

  handleClick(navigator) {
    navigator.popPage()
  }

  renderTabs() {
    return [
      {
        content: (
          <Page>
            <Navigator
              renderPage={this.renderPage}
              initialRoute={{
                title: 'inTouch',
                hasBackButton: false,
                Component: DaySheetView
              }}
            />
          </Page>
        ),
        tab: (
          <Tab>
            <div>
              <i className="material-icons">schedule</i>
              <span
                className="db f6"
                style={{ position: 'relative', bottom: 38, fontSize: 11 }}
              >
                today
              </span>
            </div>
          </Tab>
        )
      },
      {
        content: (
          <Page>
            <Navigator
              renderPage={this.renderPage}
              initialRoute={{
                title: 'inTouch',
                hasBackButton: false,
                Component: EventsListPage
              }}
            />
          </Page>
        ),
        tab: (
          <Tab>
            <div>
              <i className="material-icons">event_note</i>
              <span
                className="db f6"
                style={{ position: 'relative', bottom: 38, fontSize: 11 }}
              >
                events
              </span>
            </div>
          </Tab>
        )
      }
    ]
  }

  renderToolbar(route, navigator) {
    const backButton = route.hasBackButton
      ? <BackButton onClick={this.handleClick.bind(this, navigator)}>
          Back
        </BackButton>
      : null

    return (
      <Toolbar>
        <div className="left">
          {backButton}
        </div>
        <div className="center">
          {route.title}
        </div>
        {/*<div>
          <Icon
            icon="ion-navicon, material:md-menu"
            onClick={() => ons.notification.alert("Hello world!")}
          />
        </div>*/}
      </Toolbar>
    )
  }

  renderPage(route, navigator) {
    const { Component } = route
    return (
      <Page
        key={route.title}
        renderToolbar={this.renderToolbar.bind(this, route, navigator)}
      >
        <Component
          navigator={navigator}
          {...route.props}
          state={this.state}
          pushPage={this.pushPage}
          handleDateChange={this.handleDateChange}
          setState={this.setState}
          handleFocusChange={this.handleFocusChange}
        />
      </Page>
    )
  }

  handleFocusChange(focusedInput) {
    this.setState({ focusedInput })
  }

  render() {
    return (
      <div>
        <Page>
          <Tabbar
            position="auto"
            index={this.state.index}
            renderTabs={this.renderTabs}
            onPreChange={() => this.forceUpdate()}
            animation="slide"
          />
        </Page>
      </div>
    )
  }
}

export default App
