/**
 * The `formatDate` function takes a date string as input and returns a formatted date in the "MMM
 * DD, YYYY" format.
 * @returns The `formatDate` function is returning a formatted date string in the format "MMM DD,
 * YYYY" (e.g., "Jan 01, 2022") based on the input `dateString`.
 */
export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
};
