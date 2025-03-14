import scheduler from 'node-cron';
import { parseMyFeed } from './updateService';
import * as fs from 'fs';
import xml2js from 'xml2js';
import * as path from 'path';
import { opml_dir } from './consts';

export { scheduleUpdates };

const scheduleUpdates = () => {
    // Cron job runs every minute
    scheduler.schedule('* * * * *', async () => {
        const processOPMLFiles = (directory: string) => {
            fs.readdir(directory, (err, files) => {
                if (err) {
                    console.error(err);
                    return;
                }

                // Filter OPML files
                const opmlOnly = files.filter((file) => file.endsWith('.opml'));

                opmlOnly.forEach((file) => {
                    const filePath = path.join(directory, file);

                    // Read file
                    fs.readFile(filePath, (err, fileobj) => {
                        if (err) {
                            console.error(err);
                        } else {
                            // Ensure the XML is a well-formed string
                            let xmlString = fileobj.toString();

                            // Remove BOM if present (for UTF-8 files with BOM)
                            `if (xmlString.charCodeAt(0) === 0xFEFF) {
                                xmlString = xmlString.slice(1);
                            }`

                            // Remove any leading whitespace before the first XML tag
                            xmlString = xmlString.trim();

                            // Optionally, replace or escape any problematic characters
                            xmlString = xmlString.replace(/&/g, '&amp;')

                            // Parse XML string
                            xml2js.parseString(xmlString, async (err, fileitem) => {
                                if (err) {
                                    console.error(err);
                                } else {
                                    // Assuming 'fileitem.opml.body' contains the URLs
                                    const urls = fileitem.opml.body[0].outline;
                                    const loader = urls.map(async (url: any) => {
                                        await parseMyFeed(url.$.xmlUrl, file.slice(0, -5));
                                    });
                                    await Promise.all(loader);
                                }
                            });
                        }
                    });
                });
            });
        };

        // Process OPML files in the specified directory
        processOPMLFiles(opml_dir);
    });
};
