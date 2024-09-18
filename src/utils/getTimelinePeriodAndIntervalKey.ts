import { TimelineKeys, TIMELINES_INTERVALS_SECONDS } from "@/constants";

export const getTimelinePeriodAndIntervalKey = (auth_date: number, timeline: keyof typeof TIMELINES_INTERVALS_SECONDS): keyof typeof TIMELINES_INTERVALS_SECONDS => {
    // Convert the current time and auth_date to milliseconds and calculate the difference

    let periodAndIntervalKey: keyof typeof TIMELINES_INTERVALS_SECONDS = timeline;
    if(timeline === TimelineKeys.MAX) {

        const now = new Date().getTime(); // Current time in milliseconds
        const authDateInMilliseconds = auth_date * 1000; // Convert auth_date to milliseconds
        const differenceInMilliseconds = now - authDateInMilliseconds;
    
        // Convert milliseconds to days
        const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    
        if (differenceInDays > 365) {
            periodAndIntervalKey = TimelineKeys.Year;
        } else if (differenceInDays > 30) {
            periodAndIntervalKey = TimelineKeys.Month;
        } else if (differenceInDays > 7) {
            periodAndIntervalKey = TimelineKeys.Week;
        } else if (differenceInDays > 1) {
            periodAndIntervalKey = TimelineKeys.Day;
        } else {
            periodAndIntervalKey = TimelineKeys.Hour;
        }
    }


    return periodAndIntervalKey;
}
