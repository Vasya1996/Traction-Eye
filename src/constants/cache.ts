export const FIVE_MINUTES = 5 * 60 * 1000;
export const ONE_MINUTE = 1 * 60 * 1000;

export const CACHE_OPTIONS = {
    staleTime: FIVE_MINUTES,  // Data is fresh for 5 minutes
    getStackedDataOfItem: FIVE_MINUTES,  // Data remains cached for 5 minutes after it's considered stale
}

export const CACHE_OPTIONS_FAST = {
    staleTime: ONE_MINUTE,
    getStackedDataOfItem: ONE_MINUTE,
}