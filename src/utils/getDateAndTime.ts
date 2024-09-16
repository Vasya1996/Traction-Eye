export const getDateAndTime = (timestamp?: string | number | null): string => {
    const date = timestamp ? new Date(Number(timestamp) * 1000) : new Date();

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