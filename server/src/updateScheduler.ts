import scheduler from 'node-cron'
import {parseMyFeed} from "./updateService";
import * as fs from 'fs'
import xml2js from 'xml2js'
import * as path from 'path'
import {opml_dir} from "./consts";
export {scheduleUpdates}

const scheduleUpdates = () => {
    scheduler.schedule("* /30 * * * *", async () => {
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
                    fs.readFile(filePath, (err, fileobj) => {
                        if (err) {
                            console.error(err);
                        }
                        else {
                            xml2js.parseString(fileobj, async (err, fileitem) => {
                                if (err) {
                                    console.error(err)
                                } else {
                                    const urls: string[] = fileitem.opml.body
                                    const loader = urls.map(async (url: string) => {
                                        await parseMyFeed(url, file.slice(0, -5))
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
}