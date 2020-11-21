function bill(totalCost, ownerBillID, ownerName, receivingAccount, payMentNumber, bankName, billName) {
    this.totalCost = totalCost,
        this.ownerBillID = ownerBillID,
        this.ownerName = ownerName,
        this.receivingAccount = receivingAccount,
        this.payMentNumber = payMentNumber,
        this.bankName = bankName,
        this.billName = billName
}

function user(userID, fName, payStatus, waitAcceptStatus) {
    this.userID = userID,
        this.fName = fName,
        this.payStatus = false,
        this.waitAcceptStatus = false
}

module.exports = bill, user;