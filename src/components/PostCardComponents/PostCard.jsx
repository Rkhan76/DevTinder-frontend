import { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { addCommentToPost, onLikePost, repostPost } from "../../api/postApi";
import { getAvatarColor, getInitials } from "../../utils/userAvtar";
import {
  FaRegCommentDots,
  FaRetweet,
  FaHeart,
  FaRegHeart,
  FaExpandAlt,
} from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { useSelector } from "react-redux";
import { timeAgo } from "../../utils/timeformat";
import { Link } from "react-router-dom";
import {
  createSocket,
  joinPostRoom,
  leavePostRoom,
  subscribeToComments,
} from "../../utils/socket";
import PostActionMenu from "./PostActionMenu";
import ReadMoreText from "../Reusable-Ui/ReadMoreText";
import RepostModal from "./RepostModal";

const PostCard = ({ post }) => {
  const buttonClasses =
    "flex-1 flex items-center justify-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 group border-0 bg-transparent";

  const {
    _id: postId,
    content,
    createdAt,
    tags,
    likesCount = 0,
    commentsCount = 0,
    sharesCount = 0,
    media,
    likedBy = [],
    comments = [],
    author: { fullName, image, headline },
  } = post;

  const user = useSelector((state) => state.auth.user);

  const isLikedbyCurrentUser = () => {
    return likedBy.some((userLiked) => userLiked._id === user._id);
  };

  const [likeCount, setLikeCount] = useState(likesCount);
  const [liked, setLiked] = useState(isLikedbyCurrentUser());
  const [postActionMenuDropdown, setPostActionMenuDropdown] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [openRepostModal, setOpenRepostModal] = useState(false);
  const [commentInputValue, setCommentInputValue] = useState("");
  const [commentsList, setCommentsList] = useState(comments || []);
  const textareaRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If menu is open and the clicked element is outside the menu
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setPostActionMenuDropdown(false);
      }
    };

    // Listen for all clicks
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the listener when component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLike = async () => {
    try {
      const updated = await onLikePost(postId);
      setLiked(updated.liked);
      setLikeCount(updated.likesCount);
    } catch (err) {
      toast.error("Failed to like");
      console.error("Failed to like:", err);
    }
  };

  const handleShare = () => {
    // Share functionality placeholder
  };




  // Handle comments
  const handleFetchMoreComments = () => {
    console.log("Fetching more comments...");
  };

  const handleCommentInput = (e) => {
    setCommentInputValue(e.target.value);
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  };

  useEffect(() => {
    if (!postId || !user?._id) return;

    const socket = createSocket(user.token);
    joinPostRoom(postId);

    subscribeToComments((newComment) => {
      if (newComment.postId === postId) {
        setCommentsList((prev) => [newComment, ...prev]);
      }
    });

    return () => {
      leavePostRoom(postId);
      socket.off("receive_comment");
    };
  }, [postId, user]);

  const handleAddComment = async () => {
    try {
      const res = await addCommentToPost(postId, commentInputValue);
      if (res.success) {
        setCommentsList((prev) => [res.comment, ...prev]);
        setCommentInputValue("");
        textareaRef.current.style.height = "auto";
      }
    } catch (err) {
      toast.error("Failed to add comment");
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 mb-6 border border-gray-100 ">
      {/* Header */}
      <div className="flex justify-between items-center p-6 pb-4">
        <Link
          to={`/profile/${post.author._id}`}
          className="flex items-center gap-4"
        >
          {image ? (
            <div className="relative group">
              <img
                src={image}
                alt={fullName}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-100 group-hover:ring-blue-200 transition-all duration-300 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent to-white/10 group-hover:to-white/20 transition-all duration-300"></div>
            </div>
          ) : (
            <div
              className={`${getAvatarColor(
                fullName
              )} flex items-center justify-center w-14 h-14 rounded-full ring-2 ring-blue-100 font-semibold text-white`}
            >
              {getInitials(fullName)}
            </div>
          )}
          <div className="flex flex-col">
            <h3 className="text-lg font-normal text-gray-900 leading-tight m-0 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
              {fullName}
            </h3>
            <p className="text-[13px] text-gray-700 leading-tight m-0 font-light">
              {headline || ""}
            </p>
            <p className="text-[10px] text-gray-700 leading-tight m-0">
              {timeAgo(new Date(createdAt))}
            </p>
          </div>
        </Link>
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setPostActionMenuDropdown((prev) => !prev)}
            className="relative p-2 rounded-full hover:bg-gray-100 transition-all duration-200 group border-0 bg-transparent"
          >
            <span className="text-xl text-gray-400 group-hover:text-gray-600 font-bold transform group-hover:rotate-90 transition-all duration-300">
              ⋮
            </span>
          </button>

          {postActionMenuDropdown && (
            <PostActionMenu isOwner={user._id === post.author._id} />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-2">
        <div className="text-base leading-relaxed text-gray-800 m-0 break-words font-normal">
          <ReadMoreText text={content} />
        </div>
        {/* {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-sm text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full font-medium hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )} */}
      </div>

      {/* Media */}
      {media[0]?.url && (
        <div className="relative overflow-hidden mt-4 border-t border-gray-100">
          <img
            src={media[0].url || "/placeholder.svg"}
            alt="Post content"
            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      {/* Footer */}
      <div className="px-6 bg-white">
        <div className="flex items-center gap-3 py-3">
          <div className="flex -space-x-2">
            {likedBy
              .filter((liker) => liker?._id !== user._id)
              .slice(0, 3)
              .map((liker, index) => (
                <img
                  key={index}
                  src={liker.image || "/placeholder.svg"}
                  alt={liker.fullName}
                  className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-sm hover:scale-110 transition-transform duration-200"
                />
              ))}
          </div>
          {likeCount > 0 && (
            <span className="text-sm text-gray-600 font-medium">
              {likeCount} {likeCount === 1 ? "like" : "likes"}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="border-t border-gray-100 flex items-center py-2 w-full">
          <button onClick={handleLike} className={buttonClasses}>
            {liked ? (
              <FaHeart className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform duration-200" />
            ) : (
              <FaRegHeart className="w-5 h-5 text-gray-500 group-hover:text-red-500 group-hover:scale-110 transition-all duration-200" />
            )}
            <span
              className={`text-sm font-medium ${
                liked
                  ? "text-red-500"
                  : "text-gray-600 group-hover:text-red-500"
              } transition-colors duration-200`}
            >
              {likeCount}
            </span>
          </button>
          <button
            onClick={() => setCommentModal(!commentModal)}
            className={buttonClasses}
          >
            <FaRegCommentDots className="w-5 h-5 text-gray-500 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-200" />
            <span className="text-sm font-medium text-gray-600 group-hover:text-blue-500 transition-colors duration-200">
              {commentsList.length}
            </span>
          </button>
          <button
            className={buttonClasses}
            onClick={() => setOpenRepostModal(true)}
          >
            <FaRetweet className="w-5 h-5 text-gray-500 group-hover:text-green-500 group-hover:scale-110 transition-all duration-200" />
            <span className="text-sm font-medium text-gray-600 group-hover:text-green-500 transition-colors duration-200">
              {sharesCount}
            </span>
          </button>
          <button onClick={handleShare} className={buttonClasses}>
            <IoIosShareAlt className="w-5 h-5 text-gray-500 group-hover:text-purple-500 group-hover:scale-110 transition-all duration-200" />
          </button>
        </div>
      </div>

      {/* Comment Modal */}
      {commentModal && (
        <div className="border-t border-gray-100 bg-gray-50">
          <div className="p-6 w-full flex items-start gap-4">
            <div className="flex-shrink-0">
              {user?.image ? (
                <img
                  alt="User avatar"
                  src={user.image || "/placeholder.svg"}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100"
                />
              ) : (
                <div
                  className={`${getAvatarColor(
                    user?.fullName
                  )} flex items-center justify-center w-10 h-10 rounded-full font-semibold text-white ring-2 ring-blue-100`}
                >
                  {getInitials(user?.fullName)}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3 flex-1">
              <textarea
                ref={textareaRef}
                value={commentInputValue}
                onChange={handleCommentInput}
                placeholder="Add a comment..."
                rows={1}
                className="w-full resize-none bg-white rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none border border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 text-sm overflow-hidden transition-all duration-200"
              />
              {commentInputValue && (
                <button
                  onClick={handleAddComment}
                  className="self-end px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  Comment
                </button>
              )}
            </div>
          </div>

          {/* Comments */}
          {commentsList.length > 0 &&
            commentsList.map((comment) => (
              <div
                key={comment._id}
                className="border-t border-gray-200 last:border-b"
              >
                <div className="p-6 flex items-start gap-4 bg-white hover:bg-gray-50 transition-colors duration-200">
                  <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                    {comment.user?.image ? (
                      <img
                        alt="User avatar"
                        src={comment.user.image || "/placeholder.svg"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className={`${getAvatarColor(
                          comment.user?.fullName
                        )} flex items-center justify-center w-full h-full rounded-full font-semibold text-white text-sm`}
                      >
                        {getInitials(comment.user?.fullName)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {comment.user?.fullName}
                        </h3>
                        <p className="text-xs text-gray-500 font-medium">
                          {timeAgo(comment.createdAt)}
                        </p>
                      </div>
                      <button className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200">
                        <span className="text-gray-400 hover:text-gray-600">
                          ⋮
                        </span>
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 font-medium">
                      {comment.user?.headline}
                    </p>
                    <div className="text-sm text-gray-800 break-words whitespace-pre-wrap leading-relaxed">
                      {comment.text}
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {/* Load more */}
          <div className="flex justify-start p-6 bg-white border-t border-gray-200">
            <button
              onClick={handleFetchMoreComments}
              className="flex items-center gap-3 text-gray-600 text-sm font-medium hover:text-blue-600 transition-colors duration-200 group"
            >
              <div className="p-2 rounded-full bg-gray-100 border border-gray-200 group-hover:bg-blue-50 group-hover:border-blue-200 transition-all duration-200">
                <FaExpandAlt className="text-gray-500 group-hover:text-blue-600 w-3 h-3 transition-colors duration-200" />
              </div>
              <span>Load more comments</span>
            </button>
          </div>
        </div>
      )}

      {/* Repost Modal */}
      {openRepostModal && (
        <RepostModal
          isOpen={openRepostModal}
          onClose={() => setOpenRepostModal(false)}
          postId={postId}
          post={{
            author: fullName,
            avatar: image,
            content,
          }}
        />
      )}
    </div>
  );
};

export default PostCard;
