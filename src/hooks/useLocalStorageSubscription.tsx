import { useState, useEffect } from "react";

export  const setLocalStorageWithEvent = (key: string, value: string) => {
    localStorage.setItem(key, value);
    window.dispatchEvent(new Event("localStorageChange"));
}

export const useLocalStorageSubscription = (key: string) => {
    const [value, setValue] = useState<string | null>(localStorage.getItem(key));

    useEffect(() => {
        const handleLocalStorageChange = () => {
            setValue(localStorage.getItem(key));
        };

        const intervalId = setInterval(() => {
            const newValue = localStorage.getItem(key);
            if (newValue !== value) {
                setValue(newValue); // Update the value if it has changed
            }
        }, 1000);

        // Listen for custom events for same-tab updates
        window.addEventListener("localStorageChange", handleLocalStorageChange);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener("localStorageChange", handleLocalStorageChange);
        };
	},[]);

	return value;
};