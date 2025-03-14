import scheduler from "node-cron";
import * as fs from 'fs'
import * as path from 'path'
import {feedModel} from "./FeedModel";
export {dbCleanupScheduler}

const dbCleanupScheduler = () => {
    scheduler.schedule(('*/10 * * * *'), async () => {
        const curr_date = new Date().getTime();
        const time_diff = 60*1000*10
        await feedModel.deleteMany({dbAddTime: {$lte: (new Date(curr_date - time_diff))}});
    })
}