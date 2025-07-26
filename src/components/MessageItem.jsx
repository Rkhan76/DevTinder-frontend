import React from "react";
import { getInitials } from "../utils/userAvtar";
import { formatDateTime } from "../utils/timeformat";

export default function MessageItem({ message, isMe, sender }) {

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      {!isMe &&
        (sender?.image ? (
          <img
            src={sender.image}
            alt={sender.fullName}
            className="w-8 h-8 rounded-full mr-2 self-end"
          />
        ) : (
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-400 text-white text-xs font-semibold mr-2`}
          >
            <p>{getInitials(sender?.fullName)}</p>
          </div>
        ))}

      <div
        className={`max-w-xs px-4 py-2 rounded-lg shadow ${
          isMe ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
        }`}
      >
        <div>{message?.message}</div>
        <div className="text-xs text-right mt-1 opacity-60">
          {formatDateTime(message?.createdAt)}
        </div>
      </div>
      {isMe &&
        (sender?.image ? (
          <img
            src={sender.image}
            alt={sender.fullName}
            className="w-8 h-8 rounded-full mr-2 self-end"
          />
        ) : (
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-400 text-white text-xs font-semibold mr-2`}
          >
            <p>{getInitials(sender?.fullName)}</p>
          </div>
        ))}
    </div>
  )
} 