export const getDateAndTime = (timestamp?: string): string => {
    const date = timestamp ? new Date(timestamp) : new Date();  // Use your specific date if necessary

    const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
    });

    const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
    });

    const finalFormatted = `${formattedDate}, ${formattedTime}`;

    return finalFormatted;
}