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

function Score(preparationScore, entertainmentScore, worthinessScore, countOfSubmit) {
    this.preparationScore = preparationScore,
        this.entertainmentScore = entertainmentScore,
        this.worthinessScore = worthinessScore,
        this.countOfSubmit = countOfSubmit
}

module.exports = accountProfile, Score;