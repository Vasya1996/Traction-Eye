export const FIVE_MINUTES = 5 * 60 * 1000;

export const CACHE_OPTIONS = {
    staleTime: FIVE_MINUTES,  // Data is fresh for 5 minutes
    cacheTime: FIVE_MINUTES,  // Data remains cached for 5 minutes after it's considered stale
}