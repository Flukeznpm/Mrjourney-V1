function Room(genRoomID, lineID, displayName, ownerRoom, ownerPicRoom, roomName,
    roomCover, province, startDate, endDate, tripDetails, qrCode, maxMember,
    genderCondition, ageCondition, status) {
        this.roomID = genRoomID,
        this.lineID = lineID,
        this.displayName = displayName,
        this.ownerRoom = ownerRoom,
        this.ownerPicRoom = ownerPicRoom,
        this.roomName = roomName,
        this.roomCover = roomCover,
        this.province = province,
        this.startDate = startDate,
        this.endDate = endDate,
        this.tripDetails = tripDetails,
        this.qrCode = qrCode,
        this.maxMember = maxMember,
        this.genderCondition = genderCondition,
        this.ageCondition = ageCondition,
        this.status = status
}

module.exports = Room;
