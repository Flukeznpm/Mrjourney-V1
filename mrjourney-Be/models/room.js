function Room(genRoomID, lineID, ownerRoomID, ownerRoomName, ownerPicRoom, roomName,
    province, startDate, endDate, tripDetails, maxMember, roomCover,
    genderCondition, ageCondition, qrCode, roomStatus) {
        this.roomID = genRoomID,
        this.lineID = lineID,
        this.ownerRoomID = ownerRoomID,
        this.ownerRoomName = ownerRoomName,
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
        this.roomStatus = roomStatus
}

module.exports = Room;
