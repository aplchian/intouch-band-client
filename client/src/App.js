import React, { Component } from "react";
import logo from "./logo.svg";
import { path, curry, filter } from "ramda";
import shortId from "shortid";
import "react-dates/lib/css/_datepicker.css";
import "./App.css";
import "./styles.css";
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController
} from "react-dates";
import moment from "moment";

// const renderEventsHeader = require('./components/renderEventsHeader')

var index = 0;

// import './styles.css'
require("onsenui"); // This needs to be imported to bootstrap the components.
const ons = require("onsenui");
const {
  Page,
  Toolbar,
  ToolbarButton,
  Icon,
  Button,
  Tabbar,
  Tab,
  List,
  ListItem,
  LazyList,
  ListHeader,
  Navigator,
  BackButton,
  Card
} = require("react-onsenui");
const { getAllEvents } = require("./services/events");

const MyTab = props => {
  return (
    <Page>
      {props.content}
    </Page>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.renderTabs = this.renderTabs.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.renderToolbar = this.renderToolbar.bind(this);
    this.pushPage = this.pushPage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.filterEventsByDate = this.filterEventsByDate.bind(this)
    this.state = {
      events: [{ name: "" }],
      startDate: moment(),
      endDate: moment().add(3, "months")
    };
  }

  async componentDidMount() {
    const getDocs = path(["data", "docs"]);
    const events = await getAllEvents(
      "band_Stop_Light_Observations"
    ).catch(err => console.log("err!", err));
    const allEvents = getDocs(events);
    const filteredEvents = this.filterEventsByDate(this.state.startDate, this.state.endDate, allEvents)
    this.setState({
      events: filteredEvents,
      allEvents
    });
  }

  pushPage(navigator, obj) {
    console.log("obj", obj);
    navigator.pushPage({
      title: `${obj.name}`,
      hasBackButton: true,
      Component: obj.Component,
      props: obj.props
    });

    index++;
  }

  handleClick(navigator) {
    navigator.popPage();
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
    ];
  }

  renderToolbar(route, navigator) {
    const backButton = route.hasBackButton
      ? <BackButton onClick={this.handleClick.bind(this, navigator)}>
          Back
        </BackButton>
      : null;

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
    );
  }

  renderPage(route, navigator) {
    const { Component } = route;
    return (
      <Page
        key={route.title}
        renderToolbar={this.renderToolbar.bind(this, route, navigator)}
      >
        <Component navigator={navigator} {...route.props} />
      </Page>
    );
  }

  filterEventsByDate(startDate,endDate,events){
    const filterEvents = event => {
      return moment(event.date)
        .isBetween(
          moment(startDate).format("L"),
          moment(endDate).format("L"),
          null,
          "[]"
        )
    };
    const filteredEvents = filter(filterEvents, events);
    return filteredEvents
  }

  handleDateChange({ startDate, endDate }) {
    const filteredEvents = this.filterEventsByDate(startDate, endDate, this.state.allEvents)
    this.setState({
      startDate,
      endDate,
      events: filteredEvents
    });
  }

  render() {
    const EventsListPage = ({ navigator }) => {
      const ViewPage = curry((event, x) => {
        console.log("event", event);
        const renderSchedule = event => {
          return (
            <ListItem>
              <span className="f6">
                {event.event}
              </span>
              <span className="f6 gray right">
                {moment.unix(event.starttime).format("h:mm a")}
              </span>
            </ListItem>
          );
        };

        const renderContact = contact => {
          return (
            <ListItem>
              <div className="f6 db">
                {contact.name}
              </div>
              <br />
              <div className="f6 gray db">
                {contact.type}
              </div>
              <div className="f6 gray db">
                {contact.phone}
              </div>
              <div className="f6 gray db">
                {contact.email}
              </div>
            </ListItem>
          );
        };

        return (
          <div>
            <Card>
              <h1 className="tc">
                {event.name}
              </h1>
              <h3 className="tc">
                {moment(event.data).format("L")}
              </h3>
            </Card>
            <Card>
              <h4>Schedule</h4>
              <List dataSource={event.schedule} renderRow={renderSchedule} />
            </Card>
            <Card>
              <h4>Deal</h4>
              <p>
                {event.deal}
              </p>
            </Card>
            <Card>
              <h4>Parking</h4>
              <p>
                {event.parking}
              </p>
            </Card>
            <Card>
              <h4>Notes</h4>
              <p>
                {event.notes}
              </p>
            </Card>
            <Card>
              <h4>Contact</h4>
              <List dataSource={event.contact} renderRow={renderContact} />
            </Card>
          </div>
        );
      });

      const renderRow = item => {
        const obj = {
          name: item.name,
          id: item._id,
          Component: ViewPage(item)
        };

        return (
          <ListItem onClick={this.pushPage.bind(this, navigator, obj)}>
            <div className="w-100 db relative">
              <span className="left db">
                {item.name}
              </span>
              <span className="left db f6 gray">
                {item.city ? `${item.city}, ${item.state}` : null}
              </span>
            </div>
          </ListItem>
        );
      };

      const renderEventsHeader = () => {
        return (
          <ListHeader>
            <span className="fl ml2">Events</span>
          </ListHeader>
        );
      };

      return (
        <div style={{backgroundColor: 'white'}}>
          <DateRangePicker
            style={{ width: "100%" }}
            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
            onDatesChange={this.handleDateChange} // PropTypes.func.isRequired,
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
            orientation='vertical'
          />
          <List
            dataSource={this.state.events}
            renderRow={renderRow}
            renderHeader={renderEventsHeader}
          />
        </div>
      );
    };

    return (
      <Navigator
        renderPage={this.renderPage}
        initialRoute={{
          title: "Events",
          hasBackButton: false,
          Component: EventsListPage
        }}
      />
    );
  }
}

export default App;
