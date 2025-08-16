import { X } from "lucide-react"

const suggestions = [
  {
    id: 1,
    name: "Emily Rodriguez",
    title: "UX Designer at Adobe",
    mutualConnections: 15,
    avatar: "/professional-woman-designer.png",
  },
  {
    id: 2,
    name: "David Kim",
    title: "Data Scientist at Netflix",
    mutualConnections: 23,
    avatar: "/professional-data-scientist.png",
  },
  {
    id: 3,
    name: "Lisa Thompson",
    title: "Marketing Director at Spotify",
    mutualConnections: 7,
    avatar: "/professional-woman-marketing.png",
  },
  {
    id: 4,
    name: "James Wilson",
    title: "DevOps Engineer at Amazon",
    mutualConnections: 19,
    avatar: "/professional-engineer.png",
  },
  {
    id: 5,
    name: "Anna Martinez",
    title: "Product Designer at Figma",
    mutualConnections: 11,
    avatar: "/professional-woman-product-designer.png",
  },
  {
    id: 6,
    name: "Robert Taylor",
    title: "Full Stack Developer at Stripe",
    mutualConnections: 6,
    avatar: "/professional-man-developer.png",
  },
]

export function PeopleYouMayKnow() {
  return (
    <div className="card bg-base-100 shadow-md">
      {/* Header */}
      <div className="card-title flex flex-row items-center justify-between p-4">
        <h2 className="text-lg">People you may know</h2>
        <button className="btn btn-ghost btn-sm text-blue-600">See all</button>
      </div>

      {/* Content */}
      <div className="card-body pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((person) => (
            <div
              key={person.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              {/* Avatar + Dismiss */}
              <div className="flex justify-between items-start mb-3">
                <div className="avatar">
                  <div className="w-16 h-16 rounded-full">
                    <img
                      src={person.avatar || "/placeholder.svg"}
                      alt={person.name}
                    />
                  </div>
                </div>
                <button className="btn btn-ghost btn-sm text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Info */}
              <div className="mb-3">
                <h3 className="font-semibold text-sm mb-1">{person.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{person.title}</p>
                <p className="text-xs text-gray-500">
                  {person.mutualConnections} mutual connections
                </p>
              </div>

              {/* Connect Button */}
              <button className="btn btn-outline btn-sm w-full border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
