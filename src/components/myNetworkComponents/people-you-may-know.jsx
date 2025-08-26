import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getPeopleYouMayKnow } from '../../api/friendsApi'
import { getAvatarColor, getInitials } from '../../utils/userAvtar'
import { sendFriendRequest } from '../../api/userApi'
import toast from 'react-hot-toast'

export function PeopleYouMayKnow() {
  const [suggestions, setSuggestions] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [seeMoreClicked, setSeeMoreClicked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentFriendRequestHit, setCurrentFriendRequestHit] = useState(null)
  const limit = 6

  const handleConnect = async (userId) => {
    try {
      setLoading(true)
      setCurrentFriendRequestHit(userId)

      const res = await sendFriendRequest(userId)

      if (res.success) {
        // update status for that user
        setSuggestions((prev) =>
          prev.map((person) =>
            person.id === userId ? { ...person, status: 'Pending' } : person
          )
        )
      }
    } catch (error) {
      toast.error('Failed to send request')
    } finally {
      setLoading(false)
      setCurrentFriendRequestHit(null)
    }
  }

  const fetchData = async (pageNo = 1) => {
    try {
      const res = await getPeopleYouMayKnow(pageNo, limit)
      console.log(res, 'response of the user people you may know list')

      const formatted = res?.data?.map((user) => ({
        id: user._id,
        name: user.fullName,
        title: user.currentRole || 'Role not specified',
        avatar:
          user.image && user.image !== 'null' && user.image !== ''
            ? user.image
            : null,
        mutualConnections: user.mutualConnections || 0,
        status: 'Connect', // default until user clicks "Connect"
      }))

      if (!formatted || formatted.length === 0) {
        setHasMore(false)
        return
      }

      setSuggestions((prev) => {
        // Deduplicate by id
        const combined = [...prev, ...formatted]
        const unique = combined.filter(
          (obj, index, self) => index === self.findIndex((t) => t.id === obj.id)
        )
        return unique
      })
    } catch (error) {
      console.error('Error fetching people you may know:', error)
    }
  }

  useEffect(() => {
    fetchData(page)
  }, [])

  const handleSeeMore = () => {
    setSeeMoreClicked(true)
    const nextPage = page + 1
    setPage(nextPage)
    fetchData(nextPage)
  }

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchData(nextPage)
  }

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300">
      <div className="card-body">
        <div className="flex flex-row items-center justify-between mb-4">
          <h2 className="card-title text-lg flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-success to-info rounded-full"></div>
            People you may know
          </h2>
          {!seeMoreClicked && (
            <button
              onClick={handleSeeMore}
              className="btn btn-ghost btn-sm text-primary hover:text-primary-focus font-medium"
            >
              See More
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {suggestions.map((person) => (
            <div
              key={person.id}
              className="card bg-gradient-to-br from-base-100 to-base-200/50 border border-base-300 hover:shadow-lg hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="card-body p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="avatar">
                    {person.avatar ? (
                      <div className="w-16 h-16 rounded-full ring ring-primary/20 ring-offset-2 group-hover:ring-primary/40 transition-all duration-300">
                        <img
                          src={person.avatar}
                          alt={person.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-lg font-semibold ring-2 ring-blue-200 group-hover:ring-blue-300 transition-all ${getAvatarColor(
                          person?.name
                        )}`}
                      >
                        {getInitials(person?.name)}
                      </div>
                    )}
                  </div>
                  <button className="btn btn-ghost btn-sm text-base-content/40 hover:text-error hover:bg-error/10 transition-all duration-300">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold text-sm mb-2 text-base-content">
                    {person.name}
                  </h3>
                  <p className="text-sm text-base-content/70 mb-3 leading-relaxed">
                    {person.title}
                  </p>
                  <p className="text-xs text-base-content/50 flex items-center gap-1">
                    <span className="w-1 h-1 bg-base-content/40 rounded-full"></span>
                    {person.mutualConnections} mutual connections
                  </p>
                </div>

                <button
                  onClick={() => handleConnect(person.id)}
                  disabled={
                    person.status === 'Pending' ||
                    currentFriendRequestHit === person.id
                  }
                  className={`btn btn-sm w-full font-medium transition-all duration-300 ${
                    person.status === 'Pending'
                      ? 'btn-disabled bg-gray-200 text-gray-500'
                      : 'btn-outline btn-primary hover:btn-primary'
                  }`}
                >
                  {person.status === 'Pending' ? 'Pending' : 'Connect'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {seeMoreClicked && (
          <div className="mt-6 flex justify-center">
            {hasMore ? (
              <button
                onClick={handleLoadMore}
                className="btn btn-outline btn-primary btn-sm"
              >
                Load More
              </button>
            ) : (
              <p className="text-sm text-base-content/50">
                No more users to show
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
