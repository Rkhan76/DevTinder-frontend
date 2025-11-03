import React, { useState } from "react";
import TextWithHashtags from "./TextWithHashtags";


const ReadMoreText = ({ text, maxLength = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Ensure text is always a string
  const safeText =
    text && typeof text === "string"
      ? text
      : typeof text === "object"
      ? JSON.stringify(text)
      : String(text || "");

  const isLongText = safeText.length > maxLength;
  const displayText = isExpanded ? safeText : safeText.slice(0, maxLength);

  return (
    <span className="text-gray-800 whitespace-pre-wrap break-words">
      <TextWithHashtags text={displayText} />
      {!isExpanded && isLongText && (
        <>
          <span>...</span>
          <button
            onClick={() => setIsExpanded(true)}
            className="text-gray-600 ml-1 hover:underline"
          >
            See more
          </button>
        </>
      )}
    </span>
  );
};

export default ReadMoreText;
