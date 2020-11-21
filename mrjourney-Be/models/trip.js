function Trip(genTripID, tripName, province, startDate, endDate, tripStatus) {
    this.tripID = genTripID,
        this.tripName = tripName,
        this.province = province,
        this.startDate = startDate,
        this.endDate = endDate,
        this.tripStatus = tripStatus,
        this.tripPerday = tripPerdays
}

function TripPerDay(eventDate, events, eventName, startEvent, endEvent, eventType) {
    this.eventDate = eventDate,
        this.events =
        [
            this.eventName = eventName,
            this.endEvent = endEvent,
            this.startEvent = startEvent,
            this.eventType = eventType
        ]
}

module.exports = Trip, TripPerDay;