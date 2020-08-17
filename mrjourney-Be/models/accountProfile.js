function accountProfile(lineID, displayName, bio, birthday, gender, phone, fName, lName) {
    let ratings = [Rating()];
    this.lineID = lineID,
        this.displayName = displayName,
        this.fName = fName,
        this.lName = lName,
        this.bio = bio,
        this.birthday = birthday,
        this.gender = gender,
        this.phone = phone,
        this.rating = ratings
}

function Rating(entertainRating, worthRating, preparaionRating) {
    this.entertainRating = entertainRating,
        this.worthRating = worthRating,
        this.preparaionRating = preparaionRating
}

module.exports = accountProfile, Rating;