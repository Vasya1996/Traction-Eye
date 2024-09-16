export const TIMELINES: Array<keyof typeof TIMELINES_PERIOD_SECONDS> = ["1H", "1D", "1W", "1M", "1Y", "MAX"];
export enum TimelineKeys {
    Hour = "1H",
    Day = "1D",
    Week = "1W",
    Month = "1M",
    Year = "1Y",
    MAX = "MAX"
}

export enum TIMELINES_PERIOD_SECONDS {
    "1H" = 3600,
    "1D" = 123,
    "1W" = 604800,
    "1M" = 2592000,
    "1Y" = 31536000,
    "MAX" = 0
}

export  const TIMELINES_INTERVALS_SECONDS = {
    "1H": 300,
    "1D": 300,
    "1W": 1800,
    "1M": 7200,
    "1Y": 86400,
    "MAX": 0
}