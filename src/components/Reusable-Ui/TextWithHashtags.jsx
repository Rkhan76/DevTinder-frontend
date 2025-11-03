import React from "react";
import { Link } from "react-router-dom";

const TextWithHashtags = ({ text }) => {
  if (!text) return null;

  // Regex to match hashtags - # followed by word characters (letters, numbers, underscore)
  const regex = /(#[\w]+)/g;

  // Split the text into parts
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        // Check if this part matches a hashtag pattern
        if (regex.test(part)) {
          const tagName = part.slice(1); // Remove the #
          return (
            <Link
              key={index}
              to={`/tags/${tagName}`}
              className="text-blue-600 hover:underline font-semibold"
            >
              {part}
            </Link>
          );
        }

        // Reset regex state for next test
        regex.lastIndex = 0;
        
        // Return normal text
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
};

export default TextWithHashtags;