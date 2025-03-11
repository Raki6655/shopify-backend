const mongoose = require("mongoose")
const { stringify } = require("nodemon/lib/utils")

const {Schema} = mongoose

const subscriptions = new Schema({
    emails: {
        type:String

    }
})