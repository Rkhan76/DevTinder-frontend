import { FaRetweet } from 'react-icons/fa'
import { timeAgo } from '../../utils/timeformat'
import { Link } from 'react-router-dom'

const RepostHeader = ({ reposterName, reposterImage, repostedAt }) => {
  return (
    <div className="flex items-center gap-2 px-6 pt-4 pb-2 text-sm text-gray-600">
      <FaRetweet className="text-green-500 w-4 h-4" />
      <Link
        to={`/profile/${reposterImage ? 'some-id' : '#'}`} // You'll need to pass reposter ID
        className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-200"
      >
        {reposterImage && (
          <img
            src={reposterImage}
            alt={reposterName}
            className="w-5 h-5 rounded-full object-cover"
          />
        )}
        <span className="font-medium">{reposterName}</span>
      </Link>
      <span>reposted</span>
      <span className="text-xs text-gray-500">
        • {timeAgo(new Date(repostedAt))}
      </span>
    </div>
  )
}

export default RepostHeader
