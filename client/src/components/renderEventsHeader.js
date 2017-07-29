import React from 'react'

const { ListHeader } = require("react-onsenui")

const renderEventsHeader = () => {
  return (
    <ListHeader>
      <span className="fl ml2">Events</span>
      <span className="fr mr3">This Month</span>
    </ListHeader>
  );
};


export default renderEventsHeader