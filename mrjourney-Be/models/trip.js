function Trip(genTripID, tripName, province, startDate, endDate, tripStatus) {
        this.tripID = genTripID,
        this.tripName = tripName,
        this.province = province,
        this.startDate = startDate,
        this.endDate = endDate,
        this.tripStatus = tripStatus,
        this.tripPerday = tripPerdays
}

function TripPerDay(day, eventName, startEventTime, endEventTime, eventType) {
    // let days = [];
    // days[day] = [
        this.eventName = eventName,
        this.startEventTime = startEventTime,
        this.endEventTime = endEventTime,
        this.eventType = eventType
    // ]
}

module.exports = Trip, TripPerDay;