import scheduler from 'node-cron'
import {parseMyFeed} from "./updateService";
import * as fs from 'fs'
import xml2js from 'xml2js'
import * as path from 'path'
import {opml_dir} from "./consts";
export {scheduleUpdates}

const scheduleUpdates = scheduler.schedule("* /30 * * * *", () => {
    const processOPMLFiles = (directory: string) => {
        fs.readdir(directory, (err, files) => {
            if (err) {
                console.error(err);
                return
            }
            const opmlOnly = files.filter(file => file.endsWith(".opml"));

            opmlOnly.forEach(file => {
                const filePath = path.join(directory, file);

                // Read file
                fs.readFile(filePath, (err, file) => {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        xml2js.parse(file, async (err, file) => {
                            if (err) {
                                console.error(err)
                            } else {
                                const urls = file.opml.body
                                const loader = urls.map(async (url) => {
                                    parseMyFeed(url)
                                })
                                await Promise.all(loader)
                            }
                        })
                    }
                })
            })
        })
    }
    processOPMLFiles(opml_dir)
})