import scheduler from "node-cron";
import * as fs from 'fs'
import * as path from 'path'
import {feedModel} from "./FeedModel";
export {dbCleanupScheduler}

const dbCleanupScheduler = () => {
    scheduler.schedule(('* * * * *'), async () => {
        const curr_date = new Date().getTime();
        const time_diff = 60*60*2000
        await feedModel.deleteMany({dbAddTime: {$gte: (new Date(curr_date + time_diff))}});
    })
}