import mongoose from 'mongoose';

export {feedModel}

const feedSchema = new mongoose.Schema({
   title: {type: String, required: true},
    imageURL: {type: String, required: false, default: ""},
    fullLink: {type: String, required: true},
    description: {type: String, required: true},
    publishedDate: {type: Date, default: Date.now},
    lastUpdateTime: {type: Date, default: Date.now},
    dbAddTime : {type: Date, default: Date.now},
    category: {type: String, required: true},
});

const feedModel = mongoose.model("Feed", feedSchema);
