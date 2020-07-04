function Trip(genTripID, tripName, province, date, status) {
        this.tripID = genTripID,
        this.tripName = tripName,
        this.province = province,
        this.date = date,
        this.status = status
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

module.exports = Trip,TripPerDay;