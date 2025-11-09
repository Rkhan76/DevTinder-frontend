import { useState } from "react";
import { X } from "lucide-react";
import { repostPost } from "../../api/postApi";
import toast from "react-hot-toast";
import ReadMoreText from "../Reusable-Ui/ReadMoreText";

const RepostModal = ({ isOpen, onClose, postId, post }) => {
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleRepost = async() => {
    
    try {
        await repostPost(postId, message);
        toast.success("Reposted!");
      } catch (err) {
        toast.error("Failed to repost");
      }
    setMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl border border-gray-200 overflow-hidden animate-scaleIn">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-900">Share Post</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-4 space-y-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add your thoughts..."
            className="w-full min-h-28 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900 resize-none"
          />

          {/* Post Preview */}
          {post && (
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition">
              <div className="flex items-center gap-3 mb-2">
                {post.avatar && (
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                )}
                <p className="text-sm font-medium text-gray-900">{post.author}</p>
              </div>
             <ReadMoreText text={post.content} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-5 py-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-full border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleRepost}
            disabled={!message.trim()}
            className="flex-1 py-2 rounded-full font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-700 disabled:cursor-not-allowed transition"
          >
            Repost
          </button>
        </div>

      </div>
    </div>
  );
};

export default RepostModal;
