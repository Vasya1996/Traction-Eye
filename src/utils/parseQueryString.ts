export const parseQueryString = (queryString?: string): Record<string, unknown> => {
    if(!queryString) {
        return {};
    }

    // Split the query string into key-value pairs
    const pairs = queryString.split('&');
    
    // Initialize an empty object to store the parsed values
    const result: Record<string, unknown> = {};

    pairs.forEach(pair => {
        // Split each pair into key and value
        const [key, value] = pair.split('=');
        
        // Decode the key and value
        const decodedKey = decodeURIComponent(key);
        let decodedValue = decodeURIComponent(value);

        // If the value is a JSON string (like the `user` object), parse it into an object
        if (decodedKey === 'user') {
            decodedValue = JSON.parse(decodedValue);
        }
        
        // Store the key-value pair in the result object
        result[decodedKey] = decodedValue;
    });

    return result;
}