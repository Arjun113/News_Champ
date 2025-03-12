import parser from 'rss-parser';
import {feedModel} from "./FeedModel";
import axios from 'axios';

export {parseMyFeed, extractImageUrl}

const parseMyFeed = async (feedURL) => {
    const parseFile = new parser();
    try {
        const feed = await parseFile.parseURL(feedURL);

        const feedItems = feed.items.map(async (item) => {
            const imageURL = extractImageUrl(item)
            const feedItem = new feedModel({
                title: item.title,
                description: item.description,
                imageURL: imageURL,
                link: item.link,
            });
            await feedItem.save();
        })
        await Promise.all(feedItems);
    }
    catch (error) {
        console.error(error);
    }
}

// Helper function to extract the image URL from the content/description
const extractImageUrl = (content) => {
    const regex = /<img[^>]+src="([^">]+)"/;
    const match = content.match(regex);
    return match ? match[1] : null;
};
