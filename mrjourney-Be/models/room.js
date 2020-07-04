function Room(genRoomID, lineID, ownerRoom, ownerPicRoom, roomName,
    province, startDate, endDate, tripDetails, maxMember,
    genderCondition, ageCondition, status) {
        this.roomID = genRoomID,
        this.lineID = lineID,
        this.ownerRoom = ownerRoom,
        this.ownerPicRoom = ownerPicRoom,
        this.roomName = roomName,
        this.picRoom = picRoom,
        this.province = province,
        this.startDate = startDate,
        this.endDate = endDate,
        this.tripDetails = tripDetails,
        this.QRcode = QRcode,
        this.maxMember = maxMember,
        this.genderCondition = genderCondition,
        this.ageCondition = ageCondition,
        this.status = status
}

module.exports = Room;
