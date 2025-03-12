import * as parser from 'rss-parser';
import {feedModel} from "./FeedModel";
import axios from 'axios';

export {parseMyFeed, extractImageUrl}

const parseMyFeed = async (feedURL: string) => {
    const parseFile = new parser();
    try {
        const feed = await parseFile.parseURL(feedURL);
        const feedOwner = feed.channel.title;
        const feedParentLink = feed.channel.link;
        const feedParentLastBuild = feed.channel.lastBuildDate


        const feedItems = feed.items.map(async (item) => {
            const imageURL = extractImageUrl(item.description)
            const feedItem = new feedModel({
                title: item.title,
                description: item.description,
                imageURL: imageURL,
                link: item.link,
                lastBuildDate: feedParentLastBuild,
                publishedDate: item.pubDate
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
