import React from "react";

const BoldText = ({ text, query, wordLimit }) => {
    if (!text) return null;

    // Split the text into words and limit the number of words
    const words = text.split(" ");
    const truncatedText =
        words.length > wordLimit
            ? words.slice(0, wordLimit).join(" ") + "..."
            : text;

    if (!query) {
        return <span>{truncatedText}</span>;
    }

    const queryWords = query
        .split(" ")
        .map((word) => word.trim())
        .filter(Boolean);
    // Create a case-insensitive regular expression to find the query in the text
    const regex = new RegExp(`\\b(${queryWords.join("|")})\\b`, "gi");
    const parts = truncatedText.split(regex);

    return (
        <span>
            {parts.map((part, index) => {
                // Check if the part matches any of the query words (case insensitive)
                const isMatch = queryWords.some(
                    (queryWord) =>
                        part.toLowerCase() === queryWord.toLowerCase()
                );
                return isMatch ? (
                    <span key={index} className="font-bold">
                        {part}
                    </span>
                ) : (
                    part
                );
            })}
        </span>
    );
};

export default BoldText;
