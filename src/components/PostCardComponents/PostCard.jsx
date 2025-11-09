import { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

import { onLikePost } from '../../api/postApi'
import {
  createSocket,
  joinPostRoom,
  leavePostRoom,
  subscribeToComments,
} from '../../utils/socket'

import RepostHeader from './RepostHeader'
import RepostModal from './RepostModal'
import PostHeader from './PostHeader'
import PostContent from './PostContent'
import PostMedia from './PostMedia'
import PostLikesPreview from './PostLikesPreview'
import PostActions from './PostActions_'
import CommentModal from './CommentModal'
import ShareModal from './ShareModal'

const PostCard = ({ post }) => {
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
    author,
    repost,
  } = post

  const user = useSelector((state) => state.auth.user)
  const isRepost = !!repost

  // State
  const [likeCount, setLikeCount] = useState(likesCount)
  const [liked, setLiked] = useState(() =>
    likedBy.some((userLiked) => userLiked._id === user._id)
  )
  const [commentModal, setCommentModal] = useState(false)
  const [openRepostModal, setOpenRepostModal] = useState(false)
   const [openShareModal, setOpenShareModal] = useState(false)
  const [commentsList, setCommentsList] = useState(comments || [])

  // Socket effects
  useEffect(() => {
    if (!postId || !user?._id) return

    const socket = createSocket(user.token)
    joinPostRoom(postId)

    subscribeToComments((newComment) => {
      if (newComment.postId === postId) {
        setCommentsList((prev) => [newComment, ...prev])
      }
    })

    return () => {
      leavePostRoom(postId)
      socket.off('receive_comment')
    }
  }, [postId, user])

  // Handlers
  const handleLike = async () => {
    try {
      const updated = await onLikePost(postId)
      setLiked(updated.liked)
      setLikeCount(updated.likesCount)
    } catch (err) {
      toast.error('Failed to like')
      console.error('Failed to like:', err)
    }
  }

  const handleShare = () => {
    setOpenShareModal(true)
  }

  // Determine which post data to display
  const displayPost = isRepost ? repost : post
  const displayAuthor = isRepost ? repost.author : author


  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 mb-6 border border-gray-100">
      {/* Repost Header */}
      {isRepost && (
        <RepostHeader
          reposterName={author.fullName}
          reposterImage={author.image}
          repostedAt={createdAt}
        />
      )}

      {/* Reposter's Comment */}
      {isRepost && content && (
        <PostContent content={content} isRepost={false} />
      )}

      {/* Original Post Header */}
      <PostHeader
        post={{ ...displayPost, author: displayAuthor }}
        isRepost={isRepost}
        user={user}
      />

      {/* Original Post Content */}
      <PostContent
        content={displayPost.content}
        tags={displayPost.tags}
        isRepost={isRepost}
      />

      {/* Media */}
      <PostMedia media={displayPost.media} isRepost={isRepost} />

      {/* Footer */}
      <div className="px-6 bg-white rounded-2xl">
        {/* Likes Preview */}
        <PostLikesPreview
          likedBy={displayPost.likedBy}
          likeCount={likeCount}
          currentUserId={user._id}
        />

        {/* Actions */}
        <PostActions
          likeCount={likeCount}
          liked={liked}
          commentsCount={commentsList.length}
          sharesCount={sharesCount}
          onLike={handleLike}
          onCommentToggle={() => setCommentModal(!commentModal)}
          onRepost={() => setOpenRepostModal(true)}
          onShare={handleShare}
        />
      </div>

      {/* Comment Modal */}
      <CommentModal
        isOpen={commentModal}
        comments={commentsList}
        user={user}
        postId={postId}
        onClose={() => setCommentModal(false)}
      />

      {/* Repost Modal */}
      {openRepostModal && (
        <RepostModal
          isOpen={openRepostModal}
          onClose={() => setOpenRepostModal(false)}
          postId={postId}
          post={{
            author: author.fullName,
            avatar: author.image,
            content,
          }}
        />
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={openShareModal}
        onClose={() => setOpenShareModal(false)}
        postId={postId}
        postData={{
          author: author.fullName,
          avatar: author.image,
          content: content,
        }}
      />
    </div>
  )
}

export default PostCard
