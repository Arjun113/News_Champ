import express from 'express'
import mongoose from 'mongoose'
import {feedModel} from "./FeedModel";
import {scheduleUpdates} from "./updateScheduler";
import {express_port, mongoURL} from "./consts";

const serverApp = express();

mongoose.connect(mongoURL)
                .then(() => {console.log("Connected!")})
                .catch((err) => {console.error("MongoDB connection failure")})


scheduleUpdates();

// Endpoint to fetch feed items, optionally by category
serverApp.get('/api/feed-items', async (req, res) => {
    try {
        const { category } = req.query; // Get category from query string
        let feedItems;

        if (category) {
            // Fetch feed items filtered by category
            feedItems = await feedModel.find({ category }).sort({ pubDate: -1 });
        } else {
            // Fetch all feed items if no category is provided
            feedItems = await feedModel.find().sort({ pubDate: -1 });
        }

        res.json(feedItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching feed items' });
    }
});

serverApp.listen(express_port, () => {
    console.log(`Server running on port ${express_port}`);
});