import { TimelineKeys, TIMELINES_INTERVALS_SECONDS, TIMELINES_PERIOD_SECONDS } from "@/constants";

interface TimelineValues {
    period: number;
    interval: number;
}

export const getTimelinePeriodAndIntervalKey = (auth_date: number, timeline: keyof typeof TIMELINES_INTERVALS_SECONDS): TimelineValues | null => {
    // Convert the current time and auth_date to milliseconds and calculate the difference
    if(!auth_date) {
        return null;
    }

    const now = new Date().getTime(); // Current time in milliseconds
    const authDateInMilliseconds = auth_date * 1000; // Convert auth_date to milliseconds
    const differenceInMilliseconds = now - authDateInMilliseconds;
    const differenceInSeconds = differenceInMilliseconds / 1000;

    // Convert milliseconds to days
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

    let periodAndIntervalKey: keyof typeof TIMELINES_INTERVALS_SECONDS = timeline;
    if(timeline === TimelineKeys.MAX) {

        if (differenceInDays > 365) {
            periodAndIntervalKey = TimelineKeys.TwoYear;
        } else if (differenceInDays > 90) {
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

    return {
        period: timeline === TimelineKeys.MAX ? Math.round(differenceInSeconds) : TIMELINES_PERIOD_SECONDS[periodAndIntervalKey],
        interval: TIMELINES_INTERVALS_SECONDS[periodAndIntervalKey],
    };
}
