import { useState, useEffect } from "react";

export const useQueryParams = () => {
    const [queryParams, setQueryParams] = useState<URLSearchParams | null>(null);

    useEffect(() => {
        // Get query parameters from the URL
        const params = new URLSearchParams(window.location.search);
        setQueryParams(params);
    }, []);

    return queryParams;
};
