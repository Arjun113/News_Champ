import parser from 'rss-parser';
import {feedModel} from "./FeedModel";
import axios from 'axios';

export {parseMyFeed, extractImageUrl}

const parseMyFeed = async (feedURL: string, category: string) => {
    const parseFile: parser = new parser();
    try {
        const feed = await parseFile.parseURL(feedURL);
        const feedOwner: string = feed.channel.title;
        const feedParentLink: string = feed.channel.link;
        const feedParentLastBuild: string = feed.channel.lastBuildDate


        const feedItems = feed.items.map(async (item) => {
            const imageURL: string | null = extractImageUrl(item.description)
            const feedItem = new feedModel({
                title: item.title,
                description: item.description,
                imageURL: imageURL,
                link: item.link,
                lastBuildDate: feedParentLastBuild,
                publishedDate: item.pubDate,
                category: category,
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
