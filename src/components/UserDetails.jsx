import React from "react";

export default function UserDetails({ user }) {
  return (
    <div className="w-80 bg-white border-l flex flex-col items-center py-8 px-4">
      <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full mb-4" />
      <h2 className="text-xl font-bold">{user.name}</h2>
      <div className="text-gray-500 mb-4">{user.role}</div>
      <div className="flex space-x-2 mb-4">
        {/* Example badges */}
        <span className="w-6 h-6 bg-red-400 rounded-full"></span>
        <span className="w-6 h-6 bg-green-400 rounded-full"></span>
        <span className="w-6 h-6 bg-blue-400 rounded-full"></span>
        <span className="w-6 h-6 bg-indigo-400 rounded-full"></span>
      </div>
      <div className="w-full">
        <h4 className="text-xs font-semibold text-gray-400 mb-2">ABOUT ME</h4>
        <div className="mb-2">
          <div className="text-xs text-gray-500">Works at</div>
          <div className="text-sm">WebSmash Inc.</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Studied at</div>
          <div className="text-sm">Riverdale University</div>
        </div>
      </div>
    </div>
  );
} 