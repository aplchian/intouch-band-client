import React, { Component } from 'react'
import { path, filter } from 'ramda'
import 'react-dates/lib/css/_datepicker.css'
import './App.css'
import './styles.css'
import moment from 'moment'
import EventsListPage from './components/Events/List'

require('onsenui')

const {
  Page,
  Toolbar,
  Tab,
  Navigator,
  BackButton
} = require('react-onsenui')
const { getAllEvents } = require('./services/events')

const MyTab = props => {
  return (
    <Page>
      {props.content}
    </Page>
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    this.renderTabs = this.renderTabs.bind(this)
    this.renderPage = this.renderPage.bind(this)
    this.renderToolbar = this.renderToolbar.bind(this)
    this.pushPage = this.pushPage.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.filterEventsByDate = this.filterEventsByDate.bind(this)
    this.handleFocusChange = this.handleFocusChange.bind(this)
    this.state = {
      events: [{ name: '' }],
      startDate: moment(),
      endDate: moment().add(3, 'months')
    }
  }

  async componentDidMount() {
    const getDocs = path(['data', 'docs'])

    const events = await getAllEvents(
      'band_Stop_Light_Observations'
    ).catch(err => console.log('err!', err))

    const allEvents = getDocs(events)
    const filteredEvents = this.filterEventsByDate(
      this.state.startDate,
      this.state.endDate,
      allEvents
    )
    this.setState({
      events: filteredEvents,
      allEvents
    })
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
        content: <MyTab content="Welcome home" />,
        tab: <Tab label="Home" icon="md-home" />
      },
      {
        content: <MyTab content="Change the settings" />,
        tab: <Tab label="Settings" icon="md-settings" />
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

  filterEventsByDate(startDate, endDate, events) {
    const filterEvents = event => {
      return moment(event.date).isBetween(
        moment(startDate).format('L'),
        moment(endDate).format('L'),
        null,
        '[]'
      )
    }
    const filteredEvents = filter(filterEvents, events)
    return filteredEvents
  }

  handleDateChange({ startDate, endDate }) {
    const filteredEvents = this.filterEventsByDate(
      startDate,
      endDate,
      this.state.allEvents
    )
    this.setState({
      startDate,
      endDate,
      events: filteredEvents
    })
  }

  handleFocusChange(focusedInput){
    this.setState({ focusedInput })
  }

  render() {
    return (
      <Navigator
        renderPage={this.renderPage}
        initialRoute={{
          title: 'Events',
          hasBackButton: false,
          Component: EventsListPage
        }}
      />
    )
  }
}

export default App
