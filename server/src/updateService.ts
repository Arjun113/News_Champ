import parser from 'rss-parser';
import {feedModel} from "./FeedModel";
import axios from 'axios';

export {parseMyFeed, extractImageUrl}

const parseMyFeed = async (feedURL: string, category: string) => {
    const parseFile: parser = new parser();
    try {
        const feed = await parseFile.parseURL(feedURL);
        const feedOwner: string | undefined = feed.title;
        const feedParentLink: string | undefined = feed.link;

        const feedItems = feed.items.map(async (item) => {
            const imageURL: string | null = extractImageUrl(item.content ? item.content : "")
            const feedItem = new feedModel({
                title: item.title,
                description: item.contentSnippet ? item.contentSnippet : item.title,
                imageURL: imageURL,
                fullLink: item.link,
                lastUpdateTime: item.isoDate,
                publishedDate: item.pubDate ? item.pubDate : item.isoDate,
                category: category,
                dbAddTime: Date.now()
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
const extractImageUrl = (content: string) => {
    const regex = /<img[^>]+src="([^">]+)"/;
    const match = content.match(regex);
    return match ? match[1] : null;
};
